import api from './api';
import { MOCK_VIDEOS, DEFAULT_VIDEO_ID } from '../data/mockVideos';
import { MOCK_TRANSCRIPTS, MOCK_TIMESTAMP_QA } from '../data/mockTranscript';
import { extractVideoId } from '../utils/youtube';

// Frontend Caches (Requirement 2 & 3)
const transcriptCache = new Map();
const languagesCache = new Map();
const inFlightRequests = new Map();

const logDev = (message, meta = {}) => {
  const metaStr = Object.entries(meta)
    .map(([k, v]) => `${k}=${v}`)
    .join(' ');
  console.log(`[Transcript] ${message}${metaStr ? ' ' + metaStr : ''}`);
};

export const videoService = {
  // Fetch real YouTube video metadata from backend
  async getVideoInfo(url) {
    return await api.post('/video-info', { url }, { timeout: 30000 });
  },

  // Get all library videos
  async getAllVideos() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Object.values(MOCK_VIDEOS);
  },

  // Get video details by ID
  async getVideoById(videoId = DEFAULT_VIDEO_ID) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_VIDEOS[videoId] || MOCK_VIDEOS[DEFAULT_VIDEO_ID];
  },

  // Fetch available transcript languages from backend (Cached)
  async getAvailableLanguages(videoId) {
    if (!videoId) return { languages: [] };
    const cleanId = extractVideoId(videoId) || videoId;

    if (languagesCache.has(cleanId)) {
      logDev('Languages Cache hit', { videoId: cleanId });
      return languagesCache.get(cleanId);
    }

    const flightKey = `langs_${cleanId}`;
    if (inFlightRequests.has(flightKey)) {
      logDev('Languages In-flight request reused', { videoId: cleanId });
      return await inFlightRequests.get(flightKey);
    }

    logDev('Languages Request started', { videoId: cleanId });
    const reqPromise = (async () => {
      try {
        const res = await api.get('/transcript/languages', {
          params: { video_id: cleanId },
          timeout: 20000
        });
        languagesCache.set(cleanId, res);
        logDev('Languages Request completed', { videoId: cleanId });
        return res;
      } finally {
        inFlightRequests.delete(flightKey);
      }
    })();

    inFlightRequests.set(flightKey, reqPromise);
    return await reqPromise;
  },

  // Fetch real YouTube transcript from backend (Cached per videoId + language)
  async getTranscript(urlOrId = DEFAULT_VIDEO_ID, language = 'en') {
    if (!urlOrId) return { videoId: '', language: 'en', languageName: 'English', segments: [], fullText: '' };
    
    const videoId = extractVideoId(urlOrId) || (typeof urlOrId === 'string' && urlOrId.length === 11 ? urlOrId : '');
    const cacheKey = `${videoId}_${language}`;

    if (videoId && transcriptCache.has(cacheKey)) {
      logDev('Cache hit', { videoId, language });
      return transcriptCache.get(cacheKey);
    }

    const flightKey = `trans_${cacheKey}`;
    if (inFlightRequests.has(flightKey)) {
      logDev('In-flight request reused', { videoId, language });
      return await inFlightRequests.get(flightKey);
    }

    const url = typeof urlOrId === 'string' && urlOrId.includes('/')
      ? urlOrId
      : `https://www.youtube.com/watch?v=${videoId || urlOrId}`;

    logDev('Request started', { videoId, language });

    const reqPromise = (async () => {
      try {
        const res = await api.post('/transcript', { url, language }, { timeout: 90000 });
        if (videoId && res) {
          transcriptCache.set(cacheKey, res);
          if (res.language && res.language !== language) {
            transcriptCache.set(`${videoId}_${res.language}`, res);
          }
        }
        logDev('Request completed', { videoId, language: res?.language || language });
        return res;
      } catch (err) {
        if (err?.response?.status === 429) {
          logDev('Rate limited', { videoId, language });
        } else {
          logDev('Request failed', { videoId, language });
        }
        throw err;
      } finally {
        inFlightRequests.delete(flightKey);
      }
    })();

    inFlightRequests.set(flightKey, reqPromise);
    return await reqPromise;
  },

  // Clear cache helper (Requirement 14)
  clearCache() {
    transcriptCache.clear();
    languagesCache.clear();
    inFlightRequests.clear();
    logDev('Cache cleared');
  },

  // Get timestamp Q&A data
  async getTimestampQA(timestamp, videoId = DEFAULT_VIDEO_ID) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (MOCK_TIMESTAMP_QA[timestamp]) {
      return MOCK_TIMESTAMP_QA[timestamp];
    }
    return {
      timestamp,
      range: `${timestamp} – relevant section`,
      topic: `Concepts explained around ${timestamp}`,
      sampleQuestions: [
        `What is the main point at ${timestamp}?`,
        `Can you simplify the explanation at ${timestamp}?`
      ],
      answers: {
        default: {
          answer: `At ${timestamp}, the instructor clarifies key algorithmic invariants and demonstrates the step-by-step state transition.`,
          referenceRange: `${timestamp} ± 30s`
        }
      }
    };
  },

  // Extract YouTube ID using robust parser
  extractYouTubeId(url) {
    return extractVideoId(url);
  }
};

