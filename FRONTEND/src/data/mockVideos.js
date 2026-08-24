export const MOCK_VIDEOS = {
  'demo-binary-search': {
    id: 'demo-binary-search',
    youtubeId: 'MFhxShGxHWc',
    youtubeUrl: 'https://www.youtube.com/watch?v=MFhxShGxHWc',
    title: 'Binary Search Algorithm — Complete Mastery & Edge Cases',
    channel: 'AlgoUniversity & System Design Labs',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13c6314f4?w=800&auto=format&fit=crop&q=80',
    duration: '46 min',
    durationSeconds: 2760,
    difficulty: 'Intermediate',
    defaultLearningMode: 'College',
    rating: 4.9,
    views: '184K',
    publishedDate: '2 weeks ago',
    progress: 72,
    quizScore: 8,
    conceptsCount: 7,
    topicsCoveredCount: 5,
    summary: {
      headline: 'A deep dive into Binary Search mechanics, search space reduction, overflow prevention, lower/upper bounds, and solving rotated arrays.',
      keyTakeaways: [
        'Binary Search operates on a monotonic search space (not just sorted arrays) with O(log n) time complexity.',
        'Mid calculation using left + (right - left) / 2 prevents integer overflow bugs in 32-bit systems.',
        'Lower Bound finds the first index where array[index] >= target; Upper Bound finds first index where array[index] > target.',
        'Handling boundary conditions requires strict invariant preservation between inclusive [left, right] vs half-open [left, right) ranges.',
        'Rotated sorted arrays can be solved in O(log n) by identifying which half is guaranteed to be strictly sorted.'
      ],
      coreFormulas: [
        { label: 'Safe Midpoint', formula: 'mid = left + (right - left) // 2' },
        { label: 'Time Complexity', formula: 'T(n) = T(n/2) + O(1) -> O(log n)' },
        { label: 'Space Complexity', formula: 'O(1) Iterative / O(log n) Recursive' }
      ]
    },
    keyConcepts: [
      { id: 'c1', name: 'Monotonic Search Space', mastery: 90, status: 'Mastered' },
      { id: 'c2', name: 'Safe Mid Calculation', mastery: 85, status: 'Mastered' },
      { id: 'c3', name: 'Lower Bound / First Occurrence', mastery: 55, status: 'Needs Revision' },
      { id: 'c4', name: 'Upper Bound / Strict Greater', mastery: 75, status: 'Mastered' },
      { id: 'c5', name: 'Boundary Invariants', mastery: 45, status: 'Needs Revision' },
      { id: 'c6', name: 'Rotated Sorted Array Search', mastery: 30, status: 'Upcoming' },
      { id: 'c7', name: 'Binary Search on Answer Space', mastery: 15, status: 'Upcoming' }
    ]
  },
  'graph-bfs-dfs': {
    id: 'graph-bfs-dfs',
    youtubeId: 'pcKY4hjDrxk',
    youtubeUrl: 'https://www.youtube.com/watch?v=pcKY4hjDrxk',
    title: 'Graph Traversal Masterclass: BFS, DFS & Cycle Detection',
    channel: 'CS Tech Insights',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    duration: '52 min',
    durationSeconds: 3120,
    difficulty: 'Advanced',
    defaultLearningMode: 'Interview',
    rating: 4.8,
    views: '92K',
    publishedDate: '1 month ago',
    progress: 45,
    quizScore: 6,
    conceptsCount: 8,
    topicsCoveredCount: 4,
    summary: {
      headline: 'Comprehensive breakdown of graph representations, BFS queue dynamics, DFS recursion stack, and detecting cycles in directed vs undirected graphs.',
      keyTakeaways: [
        'Adjacency List is optimal for sparse graphs O(V + E), while Adjacency Matrix is O(V²) space.',
        'BFS uses a FIFO Queue to find unweighted shortest paths level by level.',
        'DFS uses recursion/LIFO Stack for topological sorting, connected components, and pathfinding.',
        'Cycle detection in directed graphs requires 3-color node state tracking (White, Gray, Black).'
      ],
      coreFormulas: [
        { label: 'BFS / DFS Time', formula: 'O(V + E)' },
        { label: 'Space Complexity', formula: 'O(V) for visited array & recursion/queue' }
      ]
    },
    keyConcepts: [
      { id: 'g1', name: 'Adjacency List vs Matrix', mastery: 85, status: 'Mastered' },
      { id: 'g2', name: 'BFS Level-Order Queue', mastery: 80, status: 'Mastered' },
      { id: 'g3', name: 'DFS Call Stack & Backtracking', mastery: 65, status: 'Mastered' },
      { id: 'g4', name: 'Cycle Detection (3-Color / Visited)', mastery: 35, status: 'Needs Revision' }
    ]
  },
  'react-hooks': {
    id: 'react-hooks',
    youtubeId: 'TNhaISOUy6Q',
    youtubeUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q',
    title: 'React 19 Hooks Under the Hood: Render Cycles & Memoization',
    channel: 'Frontend Masters Academy',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    duration: '38 min',
    durationSeconds: 2280,
    difficulty: 'Intermediate',
    defaultLearningMode: 'Beginner',
    rating: 4.9,
    views: '240K',
    publishedDate: '3 weeks ago',
    progress: 88,
    quizScore: 9,
    conceptsCount: 6,
    topicsCoveredCount: 5,
    summary: {
      headline: 'Deep dive into React Fiber reconcile cycle, closures in useEffect, useMemo vs useCallback optimization heuristics, and useSyncExternalStore.',
      keyTakeaways: [
        'Hooks rely on call order linked-lists stored on the Fiber node internally.',
        'Stale closures in useEffect occur when dependencies are omitted from dependency array.',
        'useCallback caches function instances, useMemo caches computation outputs.'
      ],
      coreFormulas: [
        { label: 'Hook Rule', formula: 'Only call hooks at top level of functional components' }
      ]
    },
    keyConcepts: [
      { id: 'r1', name: 'Fiber Node Linked Lists', mastery: 90, status: 'Mastered' },
      { id: 'r2', name: 'Stale Closures & Dependency Array', mastery: 95, status: 'Mastered' },
      { id: 'r3', name: 'Memoization Cost vs Benefit', mastery: 80, status: 'Mastered' }
    ]
  },
  'os-scheduling': {
    id: 'os-scheduling',
    youtubeId: 'WJ-Ua-t9_80',
    youtubeUrl: 'https://www.youtube.com/watch?v=WJ-Ua-t9_80',
    title: 'Operating Systems: CPU Scheduling Algorithms & Preemption',
    channel: 'Core Systems University',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    duration: '41 min',
    durationSeconds: 2460,
    difficulty: 'College',
    defaultLearningMode: 'College',
    rating: 4.7,
    views: '64K',
    publishedDate: '2 months ago',
    progress: 100,
    quizScore: 10,
    conceptsCount: 6,
    topicsCoveredCount: 6,
    summary: {
      headline: 'Analysis of FCFS, SJF, SRTF, Round Robin with quantum selection, Priority Inversion, and Multi-Level Feedback Queues.',
      keyTakeaways: [
        'Preemptive scheduling interrupts currently running tasks when higher priority arrives.',
        'SJF minimizes average waiting time but can suffer from starvation of long processes.',
        'Round Robin performance heavily depends on time quantum size relative to context switch overhead.'
      ],
      coreFormulas: [
        { label: 'Turnaround Time', formula: 'Completion Time - Arrival Time' },
        { label: 'Waiting Time', formula: 'Turnaround Time - Burst Time' }
      ]
    },
    keyConcepts: [
      { id: 'o1', name: 'Preemptive vs Non-Preemptive', mastery: 100, status: 'Mastered' },
      { id: 'o2', name: 'Round Robin Quantum Overhead', mastery: 95, status: 'Mastered' },
      { id: 'o3', name: 'Multi-Level Feedback Queues', mastery: 90, status: 'Mastered' }
    ]
  }
};

export const DEFAULT_VIDEO_ID = 'demo-binary-search';
