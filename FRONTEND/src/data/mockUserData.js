export const MOCK_USER = {
  name: 'Alex Chen',
  email: 'alex.chen@learnlens.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  tier: 'Student Pro',
  learningStreakDays: 14,
  stats: {
    videosAnalyzed: 12,
    conceptsLearned: 34,
    quizAverage: 78,
    topicsToRevise: 5,
    totalHoursStudied: 18.5,
    assessmentsCompleted: 9
  },
  preferences: {
    defaultLearningMode: 'College',
    autoPlayVideo: false,
    aiResponseDetail: 'Detailed',
    emailNotifications: true,
    weeklyDigest: true
  },
  dsaCategories: [
    { name: 'Arrays & Two Pointers', mastery: 92, status: 'Mastered', count: 12 },
    { name: 'Strings & Hashing', mastery: 80, status: 'Strong', count: 9 },
    { name: 'Binary Search', mastery: 72, status: 'In Progress', count: 7 },
    { name: 'Linked Lists', mastery: 64, status: 'In Progress', count: 6 },
    { name: 'Trees & Binary Trees', mastery: 43, status: 'Needs Work', count: 8 },
    { name: 'Graphs (BFS/DFS)', mastery: 20, status: 'Starting', count: 5 }
  ],
  recentActivityChart: [
    { day: 'Mon', score: 70, minutes: 35 },
    { day: 'Tue', score: 85, minutes: 45 },
    { day: 'Wed', score: 65, minutes: 20 },
    { day: 'Thu', score: 90, minutes: 60 },
    { day: 'Fri', score: 75, minutes: 40 },
    { day: 'Sat', score: 80, minutes: 50 },
    { day: 'Sun', score: 88, minutes: 55 }
  ],
  weakTopicsSummary: [
    { topic: 'Lower Bound Invariant', category: 'Binary Search', urgency: 'High', sourceVideo: 'Binary Search Mastery' },
    { topic: 'Directed Graph Cycle Detection', category: 'Graphs', urgency: 'Medium', sourceVideo: 'Graph BFS & DFS' },
    { topic: 'Boundary Conditions', category: 'Binary Search', urgency: 'High', sourceVideo: 'Binary Search Mastery' },
    { topic: 'Fiber Stale Closures', category: 'React 19', urgency: 'Low', sourceVideo: 'React Hooks Under the Hood' },
    { topic: 'SRTF Starvation', category: 'Operating Systems', urgency: 'Medium', sourceVideo: 'CPU Scheduling' }
  ],
  recommendedNext: [
    { title: 'Rotated Sorted Array Search', category: 'Binary Search', difficulty: 'Medium', eta: '30m' },
    { title: 'Binary Search on Answer (Predicate Logic)', category: 'Binary Search', difficulty: 'Hard', eta: '45m' },
    { title: 'BFS Shortest Path in Unweighted Grid', category: 'Graphs', difficulty: 'Medium', eta: '35m' }
  ]
};
