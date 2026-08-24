export const MOCK_KNOWLEDGE_GRAPH = {
  'demo-binary-search': {
    nodes: [
      {
        id: 'node-root',
        type: 'custom',
        position: { x: 380, y: 180 },
        data: {
          label: 'Binary Search',
          status: 'main',
          badge: 'Core Concept',
          timestamp: '00:00',
          mastery: 85,
          color: '#6366F1'
        }
      },
      {
        id: 'node-search-space',
        type: 'custom',
        position: { x: 120, y: 60 },
        data: {
          label: 'Monotonic Search Space',
          status: 'completed',
          badge: 'Mastered',
          timestamp: '02:14',
          mastery: 95,
          color: '#22C55E'
        }
      },
      {
        id: 'node-mid-calc',
        type: 'custom',
        position: { x: 640, y: 60 },
        data: {
          label: 'Mid Calculation & Overflow',
          status: 'completed',
          badge: 'Mastered',
          timestamp: '17:32',
          mastery: 90,
          color: '#22C55E'
        }
      },
      {
        id: 'node-lower-bound',
        type: 'custom',
        position: { x: 100, y: 320 },
        data: {
          label: 'Lower Bound',
          status: 'weak',
          badge: 'Needs Revision',
          timestamp: '27:18',
          mastery: 50,
          color: '#F59E0B'
        }
      },
      {
        id: 'node-upper-bound',
        type: 'custom',
        position: { x: 380, y: 360 },
        data: {
          label: 'Upper Bound',
          status: 'completed',
          badge: 'Mastered',
          timestamp: '36:45',
          mastery: 80,
          color: '#22C55E'
        }
      },
      {
        id: 'node-complexity',
        type: 'custom',
        position: { x: 680, y: 240 },
        data: {
          label: 'O(log n) Complexity',
          status: 'completed',
          badge: 'Mastered',
          timestamp: '22:05',
          mastery: 95,
          color: '#22C55E'
        }
      },
      {
        id: 'node-rotated-array',
        type: 'custom',
        position: { x: 660, y: 380 },
        data: {
          label: 'Rotated Sorted Array',
          status: 'recommended',
          badge: 'Next Up',
          timestamp: '41:10',
          mastery: 30,
          color: '#22D3EE'
        }
      }
    ],
    edges: [
      {
        id: 'e-root-searchspace',
        source: 'node-root',
        target: 'node-search-space',
        animated: true,
        style: { stroke: '#6366F1', strokeWidth: 2 }
      },
      {
        id: 'e-root-midcalc',
        source: 'node-root',
        target: 'node-mid-calc',
        animated: true,
        style: { stroke: '#6366F1', strokeWidth: 2 }
      },
      {
        id: 'e-root-lowerbound',
        source: 'node-root',
        target: 'node-lower-bound',
        animated: false,
        style: { stroke: '#F59E0B', strokeWidth: 2, strokeDasharray: '4 4' }
      },
      {
        id: 'e-root-upperbound',
        source: 'node-root',
        target: 'node-upper-bound',
        animated: false,
        style: { stroke: '#6366F1', strokeWidth: 2 }
      },
      {
        id: 'e-root-complexity',
        source: 'node-root',
        target: 'node-complexity',
        animated: true,
        style: { stroke: '#6366F1', strokeWidth: 2 }
      },
      {
        id: 'e-lower-upper',
        source: 'node-lower-bound',
        target: 'node-upper-bound',
        animated: false,
        style: { stroke: '#8B5CF6', strokeWidth: 1.5 }
      },
      {
        id: 'e-upper-rotated',
        source: 'node-upper-bound',
        target: 'node-rotated-array',
        animated: true,
        style: { stroke: '#22D3EE', strokeWidth: 2 }
      }
    ],
    details: {
      'node-root': {
        title: 'Binary Search',
        status: 'Core Concept',
        statusType: 'main',
        definition: 'A divide-and-conquer searching algorithm that finds the position of a target value within a sorted or monotonic collection in logarithmic time.',
        explanation: 'Binary Search eliminates half the remaining elements with each comparison by evaluating whether the target is in the left or right partition relative to the midpoint.',
        example: 'arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target = 23\nStep 1: mid = 16 (index 4) < 23 -> search right [23, 38, 56, 72, 91]\nStep 2: mid = 56 (index 7) > 23 -> search left [23, 38]\nStep 3: mid = 23 (index 5) == 23 -> FOUND index 5',
        timestamp: '00:00',
        formula: 'T(n) = T(n/2) + O(1) -> O(log n)',
        connectedNodes: ['Monotonic Search Space', 'Mid Calculation & Overflow', 'Lower Bound', 'Upper Bound', 'O(log n) Complexity']
      },
      'node-lower-bound': {
        title: 'Lower Bound',
        status: 'Needs Revision',
        statusType: 'weak',
        definition: 'The smallest index `i` in a sorted array such that `array[i] >= target`.',
        explanation: 'When searching for target `k`, lower bound returns the first occurrence if `k` exists, or the index where `k` can be inserted without violating sorted order. If all elements are smaller than `k`, it returns `n` (array length).',
        example: 'arr = [1, 2, 4, 4, 4, 6, 7], target = 4\nLower bound index = 2 (first element >= 4)\n\nImplementation:\nint ans = n;\nwhile(l <= r) {\n  int mid = l + (r - l) / 2;\n  if(arr[mid] >= target) {\n    ans = mid;\n    r = mid - 1; // look further left\n  } else {\n    l = mid + 1;\n  }\n}',
        timestamp: '27:18',
        formula: 'min { i | arr[i] >= target }',
        connectedNodes: ['Binary Search', 'Upper Bound']
      },
      'node-upper-bound': {
        title: 'Upper Bound',
        status: 'Mastered',
        statusType: 'completed',
        definition: 'The first index `i` in a sorted array such that `array[i] > target` (strictly greater).',
        explanation: 'Upper bound is key for range counting. To find the frequency of any element X in a sorted array: `count(X) = upperBound(X) - lowerBound(X)`.',
        example: 'arr = [1, 2, 4, 4, 4, 6, 7], target = 4\nUpper bound index = 5 (the value 6, first > 4)\nFrequency of 4 = 5 - 2 = 3 occurrences.',
        timestamp: '36:45',
        formula: 'min { i | arr[i] > target }',
        connectedNodes: ['Binary Search', 'Lower Bound', 'Rotated Sorted Array']
      },
      'node-mid-calc': {
        title: 'Mid Calculation & Overflow',
        status: 'Mastered',
        statusType: 'completed',
        definition: 'Arithmetic technique to compute the midpoint index without exceeding maximum integer boundaries.',
        explanation: 'Standard `(left + right) / 2` will fail in fixed 32-bit integer arithmetic if `left + right > 2,147,483,647`. Using `left + (right - left) / 2` guarantees safe arithmetic.',
        example: 'left = 2,000,000,000, right = 2,000,000,004\n(left + right) = 4,000,000,004 -> Overflow to -294,967,292 (Crash!)\nleft + (right - left) / 2 = 2,000,000,000 + 2 = 2,000,000,002 (Safe!)',
        timestamp: '17:32',
        formula: 'mid = left + (right - left) / 2',
        connectedNodes: ['Binary Search']
      },
      'node-search-space': {
        title: 'Monotonic Search Space',
        status: 'Mastered',
        statusType: 'completed',
        definition: 'A domain or array where elements follow a non-decreasing or non-increasing order.',
        explanation: 'Monotonicity is the fundamental requirement that guarantees that discarding one half never loses a valid potential candidate.',
        example: 'f(x): [False, False, False, True, True, True]\nBinary search can find the exact transition index in O(log n) steps.',
        timestamp: '02:14',
        formula: 'f(i) <= f(i+1) for all i',
        connectedNodes: ['Binary Search']
      },
      'node-complexity': {
        title: 'O(log n) Time Complexity',
        status: 'Mastered',
        statusType: 'completed',
        definition: 'Logarithmic rate of growth where problem size is divided by a constant factor at each step.',
        explanation: 'Doubling the input size adds only 1 additional comparison. For 1 billion elements (10^9), binary search takes at most 30 comparisons.',
        example: 'N = 1,000,000 elements\nLinear Search: Up to 1,000,000 comparisons\nBinary Search: At most 20 comparisons',
        timestamp: '22:05',
        formula: 'T(n) = O(log2 n)',
        connectedNodes: ['Binary Search']
      },
      'node-rotated-array': {
        title: 'Rotated Sorted Array',
        status: 'Next Up',
        statusType: 'recommended',
        definition: 'A sorted array rotated around a hidden pivot point, producing two individually sorted halves.',
        explanation: 'To search in O(log n), evaluate whether the left half (`arr[left] <= arr[mid]`) or right half is sorted, then check if target is inside that sorted half.',
        example: 'arr = [4, 5, 6, 7, 0, 1, 2], target = 0\nmid = 7 (index 3). Left half [4..7] is sorted, but target (0) is NOT in [4..7].\nTherefore, eliminate left half and search right half [0, 1, 2].',
        timestamp: '41:10',
        formula: 'arr[l] <= arr[mid] ? Check left : Check right',
        connectedNodes: ['Upper Bound', 'Binary Search']
      }
    }
  }
};
