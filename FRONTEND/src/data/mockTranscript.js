export const MOCK_TRANSCRIPTS = {
  'demo-binary-search': [
    {
      id: 't-0',
      timestamp: '00:00',
      seconds: 0,
      speaker: 'Instructor',
      text: 'Welcome everyone! Today we are going to master Binary Search completely from the mathematical intuition to advanced edge cases and interview variations.'
    },
    {
      id: 't-1',
      timestamp: '02:14',
      seconds: 134,
      speaker: 'Instructor',
      text: 'Binary Search is an efficient algorithm for finding an element in a monotonic search space. Unlike linear search which examines every item one by one taking O(n) time, binary search cuts the problem size in half on every single comparison.'
    },
    {
      id: 't-2',
      timestamp: '05:43',
      seconds: 343,
      speaker: 'Instructor',
      text: 'Why does sorted data or monotonicity matter so much? Because when you look at the middle element, the order tells you with 100% certainty that your target cannot exist in the other half. Without ordering, you cannot make this elimination decision reliably.'
    },
    {
      id: 't-3',
      timestamp: '08:20',
      seconds: 500,
      speaker: 'Instructor',
      text: 'Let us define our pointers. We maintain two pointers: left at index 0 and right at index n-1. In each iteration, we calculate the middle index. If arr[mid] equals target, we found our answer. If arr[mid] is less than target, we shift left to mid + 1.'
    },
    {
      id: 't-4',
      timestamp: '12:15',
      seconds: 735,
      speaker: 'Instructor',
      text: 'Now let us talk about the while loop condition: while left <= right. When left exceeds right, the search space becomes empty and we terminate, returning -1 to indicate the target is not in the array.'
    },
    {
      id: 't-5',
      timestamp: '17:32',
      seconds: 1052,
      speaker: 'Instructor',
      text: 'Here is a critical trap in C++, Java, and many other languages: calculating mid as (left + right) / 2. If left and right are both large positive integers close to 2^31 - 1, their sum overflows into a negative value! To be completely safe, always write left + (right - left) / 2.'
    },
    {
      id: 't-6',
      timestamp: '22:05',
      seconds: 1325,
      speaker: 'Instructor',
      text: 'Let us analyze the time complexity rigorously. After 1 step, we have n/2 elements remaining. After 2 steps, n/4. After k steps, n / (2^k) elements. When n / (2^k) = 1, we get 2^k = n, which means k = log2(n). Hence the time complexity is strictly O(log n).'
    },
    {
      id: 't-7',
      timestamp: '27:18',
      seconds: 1638,
      speaker: 'Instructor',
      text: 'Now moving to Lower Bound and Upper Bound. Lower bound is defined as the smallest index i such that arr[i] >= target. Even if the exact target does not exist, lower bound tells you where it would be inserted to preserve sorted order.'
    },
    {
      id: 't-8',
      timestamp: '31:20',
      seconds: 1880,
      speaker: 'Instructor',
      text: 'Notice how in Lower Bound, when arr[mid] >= target, mid could still be our answer! So we do not discard mid immediately; we save mid as potential answer and move right = mid - 1 to look for an earlier occurrence on the left side.'
    },
    {
      id: 't-9',
      timestamp: '36:45',
      seconds: 2205,
      speaker: 'Instructor',
      text: 'Upper Bound is subtly different: it finds the first index where arr[i] is strictly greater than target (> target). When arr[mid] <= target, we must move left = mid + 1 because arr[mid] cannot be the upper bound.'
    },
    {
      id: 't-10',
      timestamp: '41:10',
      seconds: 2470,
      speaker: 'Instructor',
      text: 'Finally, let us look at Rotated Sorted Arrays like [4, 5, 6, 7, 0, 1, 2]. The key insight here is: at least one half of the array (either left to mid, or mid to right) is ALWAYS strictly sorted! We check which half is sorted, test if target lies in that range, and discard the other half.'
    }
  ]
};

export const MOCK_TIMESTAMP_QA = {
  '17:32': {
    timestamp: '17:32',
    range: '16:58 – 18:15',
    topic: 'Safe Midpoint Calculation & Integer Overflow',
    sampleQuestions: [
      'Why did the instructor calculate mid this way?',
      'What happens if I use (left + right) / 2 in Python vs Java?',
      'Can integer overflow happen in modern 64-bit systems?'
    ],
    answers: {
      'Why did the instructor calculate mid this way?': {
        answer: 'At 17:32, the instructor explains why `left + (right - left) / 2` is safer than `(left + right) / 2`. In languages with fixed integer sizes (like 32-bit `int` in C++, Java, or Go with max value 2,147,483,647), adding two large indices (e.g., `2,000,000,000 + 2,000,000,000`) overflows into a negative number, causing an out-of-bounds array index exception.\n\nThe expression `left + (right - left) / 2` calculates the distance between `left` and `right` first (`right - left`, which is always non-negative and within bounds), halves it, and offsets it from `left`, completely preventing arithmetic overflow.',
        referenceRange: '16:58 – 18:15',
        keyFormula: 'mid = left + (right - left) / 2'
      }
    }
  },
  '31:20': {
    timestamp: '31:20',
    range: '30:45 – 33:10',
    topic: 'Lower Bound Condition & Invariant Preservation',
    sampleQuestions: [
      'Why do we set right = mid - 1 in Lower Bound instead of returning mid?',
      'What is the difference between Lower Bound and standard Binary Search?'
    ],
    answers: {
      'default': {
        answer: 'At 31:20, the instructor highlights that Lower Bound looks for the *first* element `>= target`. If `arr[mid] >= target`, `mid` is a valid candidate, but there might be an earlier duplicate matching element to the left. Thus, we record `ans = mid` and continue searching the left half by updating `right = mid - 1`.',
        referenceRange: '30:45 – 33:10'
      }
    }
  }
};
