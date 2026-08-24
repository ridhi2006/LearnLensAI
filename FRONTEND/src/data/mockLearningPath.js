export const MOCK_LEARNING_PATH = {
  'demo-binary-search': {
    stats: {
      coveredCount: 4,
      weakCount: 2,
      missingCount: 3,
      overallReadiness: 68
    },
    coveredTopics: [
      { id: 'cov-1', title: 'Binary Search Basics', icon: 'CheckCircle2', mastery: 95, tag: 'Understood' },
      { id: 'cov-2', title: 'Search Space Monotonicity', icon: 'CheckCircle2', mastery: 90, tag: 'Understood' },
      { id: 'cov-3', title: 'Mid Calculation & Overflow Prevention', icon: 'CheckCircle2', mastery: 92, tag: 'Understood' },
      { id: 'cov-4', title: 'O(log n) Complexity Analysis', icon: 'CheckCircle2', mastery: 94, tag: 'Understood' }
    ],
    weakTopics: [
      { id: 'weak-1', title: 'Lower Bound Condition', icon: 'AlertTriangle', mastery: 50, tag: 'Needs Revision', reason: 'Quiz performance: struggled with ans tracking when arr[mid] >= target' },
      { id: 'weak-2', title: 'Boundary Invariants & While Conditions', icon: 'AlertTriangle', mastery: 45, tag: 'Needs Revision', reason: 'Common error: infinite loop when left < right with inclusive bounds' }
    ],
    recommendedTopics: [
      { id: 'rec-1', title: 'Rotated Sorted Array Search', icon: 'CircleDot', mastery: 25, tag: 'Recommended Next', description: 'Apply half-sorted elimination strategy in rotated arrays.' },
      { id: 'rec-2', title: 'Peak Element Finding in Mountain Arrays', icon: 'CircleDot', mastery: 10, tag: 'Recommended', description: 'Binary search on unsorted array using local derivatives.' },
      { id: 'rec-3', title: 'Binary Search on Answer Space (Predicate Logic)', icon: 'CircleDot', mastery: 0, tag: 'Advanced Milestone', description: 'Solve optimization problems like Book Allocation & Koko Eating Bananas.' }
    ],
    roadmap: [
      {
        id: 'step-1',
        title: 'Binary Search Basics',
        status: 'completed',
        statusLabel: 'Completed',
        description: 'Pointers initialization, loop invariants, and basic array searching.',
        progress: 100,
        difficulty: 'Easy',
        estimatedTime: '15 min',
        actionLabel: 'Review Concept'
      },
      {
        id: 'step-2',
        title: 'Lower Bound & Upper Bound',
        status: 'needs-revision',
        statusLabel: 'Needs Revision',
        description: 'First occurrence searching and strict greater bounds with duplicate elements.',
        progress: 52,
        difficulty: 'Medium',
        estimatedTime: '20 min',
        actionLabel: 'Revise Lower Bound'
      },
      {
        id: 'step-3',
        title: 'Boundary Invariants & Edge Cases',
        status: 'needs-revision',
        statusLabel: 'Needs Revision',
        description: 'Avoiding off-by-one errors and integer overflow in midpoint evaluation.',
        progress: 48,
        difficulty: 'Medium',
        estimatedTime: '15 min',
        actionLabel: 'Practice Invariants'
      },
      {
        id: 'step-4',
        title: 'Rotated Sorted Array',
        status: 'next',
        statusLabel: 'Next Up',
        description: 'Handling single pivot rotations and identifying sorted halves.',
        progress: 20,
        difficulty: 'Medium-Hard',
        estimatedTime: '30 min',
        actionLabel: 'Start Learning'
      },
      {
        id: 'step-5',
        title: 'Find Peak Element',
        status: 'upcoming',
        statusLabel: 'Upcoming',
        description: 'Binary search when array is not sorted by comparing mid with neighbors.',
        progress: 0,
        difficulty: 'Medium',
        estimatedTime: '25 min',
        actionLabel: 'Locked'
      },
      {
        id: 'step-6',
        title: 'Binary Search on Answer Space',
        status: 'upcoming',
        statusLabel: 'Milestone',
        description: 'Predicate monotonicity in optimization and resource allocation problems.',
        progress: 0,
        difficulty: 'Hard',
        estimatedTime: '45 min',
        actionLabel: 'Locked'
      }
    ]
  }
};
