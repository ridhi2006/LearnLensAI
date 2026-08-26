import re
from urllib.parse import urlparse, parse_qs, quote
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from youtube_transcript_api import YouTubeTranscriptApi

app = FastAPI(title="LearnLensAI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

class TranscriptSegmentModel(BaseModel):
    text: str
    start: float
    duration: float

class TranscriptResponse(BaseModel):
    videoId: str
    language: str
    segments: list[TranscriptSegmentModel]
    fullText: str

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
        response = requests.get(oembed_url, timeout=5)
        if response.status_code == 404:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Video metadata is unavailable."
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
    except requests.RequestException:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process this video right now."
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process this video right now."
        )

def fetch_youtube_transcript(video_id: str) -> dict:
    try:
        api = YouTubeTranscriptApi()
        transcript_list = api.list(video_id)
        
        try:
            transcript_obj = transcript_list.find_transcript(['en', 'en-US', 'en-GB'])
        except Exception:
            available = list(transcript_list)
            if not available:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Transcript is unavailable for this video."
                )
            transcript_obj = available[0]
            
        fetched_snippets = transcript_obj.fetch()
        
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
        
        return {
            "videoId": video_id,
            "language": getattr(transcript_obj, 'language', 'en'),
            "segments": segments,
            "fullText": full_text
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transcript is unavailable for this video."
        )

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

@app.post("/api/v1/transcript", response_model=TranscriptResponse)
def get_transcript(req: TranscriptRequest):
    video_id = extract_video_id(req.url)
    if not video_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter a valid YouTube URL."
        )
    return fetch_youtube_transcript(video_id)
