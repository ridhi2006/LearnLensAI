import { MOCK_VIDEOS, DEFAULT_VIDEO_ID } from '../data/mockVideos';
import { MOCK_TRANSCRIPTS, MOCK_TIMESTAMP_QA } from '../data/mockTranscript';

export const videoService = {
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

  // Get transcript by video ID
  async getTranscript(videoId = DEFAULT_VIDEO_ID) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_TRANSCRIPTS[videoId] || MOCK_TRANSCRIPTS[DEFAULT_VIDEO_ID] || [];
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

  // Simulate analyzing a YouTube URL
  extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : 'MFhxShGxHWc';
  }
};
