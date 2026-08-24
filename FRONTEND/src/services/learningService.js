import { MOCK_LEARNING_PATH } from '../data/mockLearningPath';
import { MOCK_USER } from '../data/mockUserData';
import { MOCK_KNOWLEDGE_GRAPH } from '../data/mockKnowledgeGraph';

export const learningService = {
  // Get knowledge gap analysis and roadmap
  async getLearningPath(videoId = 'demo-binary-search') {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_LEARNING_PATH[videoId] || MOCK_LEARNING_PATH['demo-binary-search'];
  },

  // Get knowledge graph data
  async getKnowledgeGraph(videoId = 'demo-binary-search') {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return MOCK_KNOWLEDGE_GRAPH[videoId] || MOCK_KNOWLEDGE_GRAPH['demo-binary-search'];
  },

  // Get user profile and metrics
  async getUserData() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_USER;
  },

  // Generate shareable link
  generateShareLink(videoId = 'demo-binary-search') {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://learnlens.ai';
    return `${origin}/share/${videoId}`;
  }
};
