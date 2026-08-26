import api from './api';
import { MOCK_VIDEOS, DEFAULT_VIDEO_ID } from '../data/mockVideos';
import { MOCK_TRANSCRIPTS, MOCK_TIMESTAMP_QA } from '../data/mockTranscript';
import { extractVideoId } from '../utils/youtube';

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

  // Fetch available transcript languages from backend
  async getAvailableLanguages(videoId) {
    if (!videoId) return { languages: [] };
    return await api.get('/transcript/languages', {
      params: { video_id: videoId },
      timeout: 20000
    });
  },

  // Fetch real YouTube transcript from backend
  async getTranscript(urlOrId = DEFAULT_VIDEO_ID, language = 'en') {
    if (!urlOrId) return { videoId: '', language: 'en', languageName: 'English', segments: [], fullText: '' };
    const url = typeof urlOrId === 'string' && urlOrId.includes('/')
      ? urlOrId
      : `https://www.youtube.com/watch?v=${urlOrId}`;

    return await api.post('/transcript', { url, language }, { timeout: 90000 });
  },

  // Get timestamp Q&A data
  async getTimestampQA(timestamp, videoId = DEFAULT_VIDEO_ID) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (MOCK_TIMESTAMP_QA[timestamp]) {
      return MOCK_TIMESTAMP_QA[timestamp];
    }
    // Fallback dynamic generator for any timestamp
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

