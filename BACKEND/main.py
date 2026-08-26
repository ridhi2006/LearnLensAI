import re
import time
import threading
from urllib.parse import urlparse, parse_qs, quote
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import requests
from youtube_transcript_api import (
    YouTubeTranscriptApi,
    TranscriptsDisabled,
    NoTranscriptFound,
    VideoUnavailable,
    VideoUnplayable,
    YouTubeRequestFailed,
    IpBlocked,
    RequestBlocked,
)

app = FastAPI(title="LearnLensAI Backend", version="1.0.0")

class RateLimitException(Exception):
    def __init__(
        self,
        message: str = "YouTube is temporarily rate-limiting transcript requests. Please wait a little before trying again.",
        code: str = "YOUTUBE_RATE_LIMITED",
        retry_after: int = 30
    ):
        self.message = message
        self.code = code
        self.retry_after = retry_after

@app.exception_handler(RateLimitException)
def rate_limit_handler(request, exc: RateLimitException):
    return JSONResponse(
        status_code=429,
        content={
            "detail": {
                "code": exc.code,
                "message": exc.message,
                "retryAfter": exc.retry_after
            }
        },
        headers={"Retry-After": str(exc.retry_after)}
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPPORTED_LANGUAGES = {
    "en": "English",
    "hi": "Hindi",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "pt": "Portuguese",
    "ja": "Japanese",
    "ko": "Korean",
    "zh": "Chinese"
}

# --- Server-Side In-Memory Cache (Req 6) ---
class SimpleCache:
    def __init__(self, ttl_seconds: int = 1800):
        self.ttl = ttl_seconds
        self.store = {}
        self.lock = threading.Lock()

    def get(self, key: str):
        with self.lock:
            if key in self.store:
                item, expire_at = self.store[key]
                if time.time() < expire_at:
                    return item
                else:
                    del self.store[key]
            return None

    def set(self, key: str, value):
        with self.lock:
            self.store[key] = (value, time.time() + self.ttl)

    def clear(self):
        with self.lock:
            self.store.clear()

transcript_cache = SimpleCache(ttl_seconds=1800)
languages_cache = SimpleCache(ttl_seconds=1800)

# --- Server-Side Cooldown Manager (Req 9) ---
class CooldownManager:
    def __init__(self, default_cooldown: int = 30):
        self.default_cooldown = default_cooldown
        self.cooldown_until = 0
        self.lock = threading.Lock()

    def is_cooling_down(self) -> bool:
        with self.lock:
            return time.time() < self.cooldown_until

    def remaining(self) -> int:
        with self.lock:
            rem = int(self.cooldown_until - time.time())
            return max(rem, 1)

    def trigger(self, seconds: int = None):
        with self.lock:
            sec = seconds or self.default_cooldown
            self.cooldown_until = max(self.cooldown_until, time.time() + sec)

cooldown_mgr = CooldownManager(default_cooldown=30)

# --- Server-Side Request Deduplicator (Req 7) ---
class RequestDeduplicator:
    def __init__(self):
        self.in_flight = {}
        self.lock = threading.Lock()

    def execute(self, key: str, func, *args, **kwargs):
        with self.lock:
            if key in self.in_flight:
                event, result_box = self.in_flight[key]
                is_leader = False
            else:
                event = threading.Event()
                result_box = {}
                self.in_flight[key] = (event, result_box)
                is_leader = True

        if is_leader:
            try:
                res = func(*args, **kwargs)
                result_box["result"] = res
            except Exception as exc:
                result_box["error"] = exc
            finally:
                event.set()
                with self.lock:
                    self.in_flight.pop(key, None)
            if "error" in result_box:
                raise result_box["error"]
            return result_box["result"]
        else:
            event.wait()
            if "error" in result_box:
                raise result_box["error"]
            return result_box["result"]

deduplicator = RequestDeduplicator()

class VideoInfoRequest(BaseModel):
    url: str

class VideoInfoResponse(BaseModel):
    videoId: str
    title: str
    channel: str
    thumbnail: str
    duration: int | None = None

class TranscriptRequest(BaseModel):
    url: str
    language: str | None = "en"

class TranscriptSegmentModel(BaseModel):
    text: str
    start: float
    duration: float

class AvailableLangModel(BaseModel):
    name: str
    code: str

class TranscriptResponse(BaseModel):
    videoId: str
    language: str
    languageCode: str
    segments: list[TranscriptSegmentModel]
    fullText: str
    availableLanguages: list[AvailableLangModel]

class LanguageOption(BaseModel):
    code: str
    name: str
    available: bool

class LanguagesResponse(BaseModel):
    languages: list[LanguageOption]

class LanguageItem(BaseModel):
    code: str
    name: str
    isGenerated: bool = False

class LanguageDiscoveryResponse(BaseModel):
    videoId: str
    languages: list[LanguageItem]

def extract_video_id(url: str) -> str | None:
    if not url or not isinstance(url, str):
        return None
    
    url = url.strip()
    if not url:
        return None
    
    if not re.match(r'^https?://', url, re.IGNORECASE):
        url = 'https://' + url
        
    try:
        parsed = urlparse(url)
        hostname = (parsed.hostname or '').lower()
        
        valid_domains = [
            'youtube.com', 'www.youtube.com', 'm.youtube.com', 
            'music.youtube.com', 'youtu.be', 'www.youtu.be'
        ]
        
        if hostname not in valid_domains:
            return None
            
        candidate_id = None
        if hostname in ['youtu.be', 'www.youtu.be']:
            path_parts = [p for p in parsed.path.split('/') if p]
            candidate_id = path_parts[0] if path_parts else None
        else:
            qs = parse_qs(parsed.query)
            if 'v' in qs and qs['v']:
                candidate_id = qs['v'][0]
            else:
                path_parts = [p for p in parsed.path.split('/') if p]
                if len(path_parts) >= 2 and path_parts[0].lower() in ['shorts', 'embed', 'v']:
                    candidate_id = path_parts[1]
                    
        if candidate_id and re.match(r'^[a-zA-Z0-9_-]{11}$', candidate_id):
            return candidate_id
        return None
    except Exception:
        return None

def fetch_youtube_oembed(video_id: str) -> dict:
    watch_url = f"https://www.youtube.com/watch?v={video_id}"
    oembed_url = f"https://www.youtube.com/oembed?url={quote(watch_url)}&format=json"
    
    try:
        response = requests.get(oembed_url, timeout=15)
        if response.status_code == 404:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="This video is unavailable, private, or does not exist."
            )
        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Unable to process this video right now."
            )
        data = response.json()
        return {
            "videoId": video_id,
            "title": data.get("title", ""),
            "channel": data.get("author_name", ""),
            "thumbnail": data.get("thumbnail_url", f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"),
            "duration": None
        }
    except HTTPException:
        raise
    except requests.exceptions.Timeout:
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="YouTube request timed out while fetching video details."
        )
    except requests.RequestException:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to reach YouTube server for metadata."
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process this video right now."
        )

def fetch_youtube_transcript(video_id: str, target_lang: str = "en") -> dict:
    target_lang = (target_lang or "en").lower().strip()
    cache_key = f"{video_id}:{target_lang}"

    cached = transcript_cache.get(cache_key)
    if cached:
        return cached

    if cooldown_mgr.is_cooling_down():
        raise RateLimitException(retry_after=cooldown_mgr.remaining())

    def _do_work():
        try:
            api = YouTubeTranscriptApi()
            transcript_list = api.list(video_id)

            avail_langs = []
            seen_codes = set()
            for t in transcript_list:
                c = t.language_code.split('-')[0].lower()
                n = SUPPORTED_LANGUAGES.get(c, getattr(t, 'language', c.capitalize()))
                if c not in seen_codes:
                    seen_codes.add(c)
                    avail_langs.append({"name": n, "code": c})
                if getattr(t, 'is_translatable', False):
                    for trans in getattr(t, 'translation_languages', []):
                        tc = getattr(trans, 'language_code', '').split('-')[0].lower()
                        tn = SUPPORTED_LANGUAGES.get(tc, getattr(trans, 'language', tc.capitalize()))
                        if tc not in seen_codes and tc in SUPPORTED_LANGUAGES:
                            seen_codes.add(tc)
                            avail_langs.append({"name": tn, "code": tc})

            selected_obj = None
            used_code = target_lang
            used_name = SUPPORTED_LANGUAGES.get(target_lang, target_lang.capitalize())

            if target_lang == "auto":
                try:
                    selected_obj = transcript_list.find_transcript(['en', 'en-US', 'en-GB'])
                except Exception:
                    available = list(transcript_list)
                    if not available:
                        raise HTTPException(
                            status_code=status.HTTP_404_NOT_FOUND,
                            detail="No transcript is available for this video."
                        )
                    selected_obj = available[0]
                used_code = getattr(selected_obj, 'language_code', 'en').split('-')[0].lower()
                used_name = SUPPORTED_LANGUAGES.get(used_code, getattr(selected_obj, 'language', 'English'))
            else:
                # 1. Direct match
                for t in transcript_list:
                    if t.language_code.split('-')[0].lower() == target_lang:
                        selected_obj = t
                        used_code = target_lang
                        used_name = SUPPORTED_LANGUAGES.get(target_lang, getattr(t, 'language', 'English'))
                        break

                # 2. Translation fallback
                if not selected_obj:
                    for t in transcript_list:
                        if getattr(t, 'is_translatable', False):
                            for trans in getattr(t, 'translation_languages', []):
                                tc = getattr(trans, 'language_code', '').split('-')[0].lower()
                                if tc == target_lang:
                                    actual_code = getattr(trans, 'language_code', target_lang)
                                    selected_obj = t.translate(actual_code)
                                    used_code = target_lang
                                    used_name = SUPPORTED_LANGUAGES.get(target_lang, getattr(trans, 'language', target_lang.capitalize()))
                                    break
                        if selected_obj:
                            break

                if not selected_obj:
                    lang_display = SUPPORTED_LANGUAGES.get(target_lang, target_lang.upper())
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"{lang_display} transcript is not available for this video. Please choose another available language."
                    )

            fetched_snippets = selected_obj.fetch()

            segments = []
            full_text_parts = []
            for item in fetched_snippets:
                cleaned_text = item.text.strip()
                if cleaned_text:
                    segments.append({
                        "text": cleaned_text,
                        "start": round(item.start, 2),
                        "duration": round(item.duration, 2)
                    })
                    full_text_parts.append(cleaned_text)

            full_text = " ".join(full_text_parts)

            result = {
                "videoId": video_id,
                "language": used_name,
                "languageCode": used_code,
                "segments": segments,
                "fullText": full_text,
                "availableLanguages": avail_langs
            }

            transcript_cache.set(cache_key, result)
            if used_code != target_lang:
                transcript_cache.set(f"{video_id}:{used_code}", result)

            return result

        except (IpBlocked, RequestBlocked):
            cooldown_mgr.trigger(30)
            raise RateLimitException(retry_after=30)
        except HTTPException:
            raise
        except (TranscriptsDisabled, NoTranscriptFound):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No transcript is available for this video."
            )
        except (VideoUnavailable, VideoUnplayable):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="This video is unavailable, private, or restricted."
            )
        except (YouTubeRequestFailed, requests.exceptions.Timeout):
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="Transcript retrieval timed out. Please try again."
            )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No transcript is available for this video."
            )

    return deduplicator.execute(f"transcript_{cache_key}", _do_work)

@app.post("/api/v1/video-info", response_model=VideoInfoResponse)
def get_video_info(req: VideoInfoRequest):
    video_id = extract_video_id(req.url)
    if not video_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter a valid YouTube URL."
        )
    
    metadata = fetch_youtube_oembed(video_id)
    return metadata

@app.get("/api/v1/transcript-languages/{video_id}", response_model=LanguageDiscoveryResponse)
def get_transcript_languages_discovery(video_id: str):
    vid = extract_video_id(video_id) if ('/' in video_id or 'http' in video_id.lower()) else video_id
    if not vid or not re.match(r'^[a-zA-Z0-9_-]{11}$', vid):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter a valid YouTube URL or 11-character video ID."
        )

    cached = languages_cache.get(f"{vid}:discovery")
    if cached:
        return cached

    if cooldown_mgr.is_cooling_down():
        raise RateLimitException(retry_after=cooldown_mgr.remaining())

    def _fetch():
        try:
            api = YouTubeTranscriptApi()
            transcript_list = api.list(vid)
            langs = []
            seen = set()
            for t in transcript_list:
                c = t.language_code.split('-')[0].lower()
                name = SUPPORTED_LANGUAGES.get(c, getattr(t, 'language', c.capitalize()))
                if c not in seen:
                    seen.add(c)
                    langs.append({
                        "code": c,
                        "name": name,
                        "isGenerated": getattr(t, 'is_generated', False)
                    })
            res = {"videoId": vid, "languages": langs}
            languages_cache.set(f"{vid}:discovery", res)
            return res
        except (IpBlocked, RequestBlocked):
            cooldown_mgr.trigger(30)
            raise RateLimitException(retry_after=30)
        except (TranscriptsDisabled, NoTranscriptFound):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No transcript is available for this video."
            )
        except (VideoUnavailable, VideoUnplayable):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="This video is unavailable, private, or restricted."
            )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No transcript is available for this video."
            )

    return deduplicator.execute(f"langs_disc_{vid}", _fetch)

@app.get("/api/v1/transcript/languages", response_model=LanguagesResponse)
def get_transcript_languages(video_id: str):
    vid = extract_video_id(video_id) if ('/' in video_id or 'http' in video_id.lower()) else video_id
    if not vid or not re.match(r'^[a-zA-Z0-9_-]{11}$', vid):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter a valid YouTube URL or 11-character video ID."
        )

    cached = languages_cache.get(f"{vid}:full")
    if cached:
        return cached

    if cooldown_mgr.is_cooling_down():
        raise RateLimitException(retry_after=cooldown_mgr.remaining())

    def _fetch_all():
        try:
            api = YouTubeTranscriptApi()
            transcript_list = api.list(vid)
            
            available_codes = set()
            for t in transcript_list:
                code = t.language_code.split('-')[0].lower()
                if code in SUPPORTED_LANGUAGES:
                    available_codes.add(code)
                if getattr(t, 'is_translatable', False):
                    for trans in getattr(t, 'translation_languages', []):
                        t_code = getattr(trans, 'language_code', '').split('-')[0].lower()
                        if t_code in SUPPORTED_LANGUAGES:
                            available_codes.add(t_code)
                            
            lang_list = []
            for code, name in SUPPORTED_LANGUAGES.items():
                lang_list.append(LanguageOption(
                    code=code,
                    name=name,
                    available=(code in available_codes)
                ))
                
            res = LanguagesResponse(languages=lang_list)
            languages_cache.set(f"{vid}:full", res)
            return res
        except (IpBlocked, RequestBlocked):
            cooldown_mgr.trigger(30)
            raise RateLimitException(retry_after=30)
        except (TranscriptsDisabled, NoTranscriptFound):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No transcript is available for this video."
            )
        except (VideoUnavailable, VideoUnplayable):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="This video is unavailable, private, or restricted."
            )
        except (YouTubeRequestFailed, requests.exceptions.Timeout):
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="Transcript retrieval timed out. Please try again."
            )
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No transcript is available for this video."
            )

    return deduplicator.execute(f"langs_full_{vid}", _fetch_all)

@app.post("/api/v1/transcript", response_model=TranscriptResponse)
def get_transcript(req: TranscriptRequest):
    video_id = extract_video_id(req.url)
    if not video_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter a valid YouTube URL."
        )
    return fetch_youtube_transcript(video_id, target_lang=req.language or "en")

