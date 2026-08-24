export const MOCK_QUIZZES = {
  'demo-binary-search': {
    easy: [
      {
        id: 'q1',
        topic: 'Binary Search Basics',
        question: 'What is the primary prerequisite condition for applying standard binary search on an array?',
        options: [
          'The array elements must all be distinct positive integers',
          'The array must be sorted in monotonic order (ascending or descending)',
          'The array size must be a power of two (2^k)',
          'The array must be stored inside a linked list structure'
        ],
        correctIndex: 1,
        explanation: 'Binary search requires the search space to be monotonic (ordered) so that comparing the target with the middle element eliminates half the search space definitively.'
      },
      {
        id: 'q2',
        topic: 'Time Complexity',
        question: 'What is the worst-case time complexity of Binary Search on an array of length n?',
        options: [
          'O(n)',
          'O(n log n)',
          'O(log n)',
          'O(1)'
        ],
        correctIndex: 2,
        explanation: 'Each step halves the search space from n to n/2 to n/4 ... until 1 element remains. Solving n / 2^k = 1 yields k = log2(n), giving O(log n).'
      },
      {
        id: 'q3',
        topic: 'Mid Calculation',
        question: 'Which midpoint calculation formula is guaranteed to prevent integer overflow in languages like C++ and Java?',
        options: [
          'mid = (left + right) / 2',
          'mid = left + (right - left) / 2',
          'mid = (left + right) >> 2',
          'mid = right - (left / 2)'
        ],
        correctIndex: 1,
        explanation: '`left + (right - left) / 2` calculates the offset `(right - left)` first, which never exceeds the array bounds, avoiding the overflow created by `left + right`.'
      },
      {
        id: 'q4',
        topic: 'Search Space',
        question: 'In standard binary search on an ascending array, if arr[mid] < target, which pointer should be updated?',
        options: [
          'right = mid - 1',
          'left = mid + 1',
          'left = mid',
          'right = mid'
        ],
        correctIndex: 1,
        explanation: 'Since the array is sorted and arr[mid] is strictly smaller than target, the target cannot exist in the left half or at mid, so we narrow the search space to the right half by setting left = mid + 1.'
      },
      {
        id: 'q5',
        topic: 'Boundary Conditions',
        question: 'What is the standard while loop termination condition when using inclusive bounds [0, n-1]?',
        options: [
          'while (left < right)',
          'while (left <= right)',
          'while (left != right)',
          'while (left + 1 < right)'
        ],
        correctIndex: 1,
        explanation: 'When both left and right are inclusive, the valid single-element search space occurs when left == right. Therefore, the loop must continue `while (left <= right)`.'
      }
    ],
    medium: [
      {
        id: 'qm1',
        topic: 'Lower Bound',
        question: 'What is the mathematical definition of Lower Bound for target T in a sorted array?',
        options: [
          'First index i such that arr[i] > T',
          'First index i such that arr[i] >= T',
          'Last index i such that arr[i] <= T',
          'Exact index where arr[i] == T or -1 if missing'
        ],
        correctIndex: 1,
        explanation: 'Lower bound is formally the first position where the element is greater than or equal to the target (`arr[i] >= T`).'
      },
      {
        id: 'qm2',
        topic: 'Upper Bound',
        question: 'For array `[1, 3, 3, 3, 5, 8]`, what index is returned by Upper Bound for target 3?',
        options: [
          'Index 1 (the first 3)',
          'Index 3 (the last 3)',
          'Index 4 (the value 5)',
          'Index 2 (the middle 3)'
        ],
        correctIndex: 2,
        explanation: 'Upper bound finds the first index where `arr[i] > 3`. In this array, that element is 5 at index 4.'
      },
      {
        id: 'qm3',
        topic: 'Boundary Conditions',
        question: 'If you want to count total occurrences of target X in a sorted array containing duplicates, what is the optimal O(log n) approach?',
        options: [
          'Run standard binary search and scan linearly left and right',
          'Calculate upperBound(X) - lowerBound(X)',
          'Run two separate binary searches for first and last index and add them',
          'Sort the array again with quicksort'
        ],
        correctIndex: 1,
        explanation: 'The number of occurrences of X is directly `upperBound(X) - lowerBound(X)`, both executable in O(log n) time.'
      },
      {
        id: 'qm4',
        topic: 'Rotated Array',
        question: 'In a rotated sorted array like `[4, 5, 6, 7, 0, 1, 2]`, how do you determine which half is sorted?',
        options: [
          'Compare arr[left] with arr[right]',
          'Compare arr[left] with arr[mid]: if arr[left] <= arr[mid], left half is sorted; else right half is sorted',
          'Check if arr[0] == 0',
          'Compute the median of all three pointer values'
        ],
        correctIndex: 1,
        explanation: 'Because the array was originally sorted and rotated at a single pivot, at least one half between [left, mid] or [mid, right] must be monotonically increasing. If arr[left] <= arr[mid], the left half is guaranteed sorted.'
      },
      {
        id: 'qm5',
        topic: 'Space Complexity',
        question: 'What is the auxiliary space complexity of iterative binary search versus recursive binary search without tail-call optimization?',
        options: [
          'Iterative: O(1), Recursive: O(log n) call stack frames',
          'Iterative: O(log n), Recursive: O(1)',
          'Both are O(n)',
          'Both are strictly O(1)'
        ],
        correctIndex: 0,
        explanation: 'Iterative binary search uses only pointers (O(1) auxiliary space), whereas recursive binary search creates a recursion call stack frame for each split (O(log n) space).'
      },
      {
        id: 'qm6',
        topic: 'Binary Search Basics',
        question: 'If target is greater than all elements in a sorted array of length n, what will lower_bound return?',
        options: [
          'Index 0',
          'Index n-1',
          'Index n (beyond array length)',
          '-1'
        ],
        correctIndex: 2,
        explanation: 'Lower bound returns index n, indicating that all elements in the array are strictly smaller than the target and the insertion index is at the end.'
      },
      {
        id: 'qm7',
        topic: 'Mid Calculation',
        question: 'What bitwise operation is equivalent to integer division by 2 for non-negative numbers?',
        options: [
          'x << 1',
          'x >> 1',
          'x & 1',
          'x ^ 2'
        ],
        correctIndex: 1,
        explanation: 'Right arithmetic/logical shift by 1 (`x >> 1`) shifts bits rightward, dividing positive integers by 2.'
      },
      {
        id: 'qm8',
        topic: 'Boundary Conditions',
        question: 'When implementing lower bound with `ans = n`, if `arr[mid] >= target`, which update step is correct?',
        options: [
          'ans = mid; right = mid - 1',
          'ans = mid; left = mid + 1',
          'right = mid; left = mid',
          'ans = -1; return'
        ],
        correctIndex: 0,
        explanation: 'If `arr[mid] >= target`, `mid` could be the first occurrence, so we save `ans = mid` and search further left by setting `right = mid - 1`.'
      },
      {
        id: 'qm9',
        topic: 'Rotated Array',
        question: 'What causes standard O(log n) binary search on rotated sorted array to degrade to O(n) in worst case?',
        options: [
          'Negative values in the array',
          'Duplicate values where arr[left] == arr[mid] == arr[right]',
          'Odd array length',
          'All numbers being prime'
        ],
        correctIndex: 1,
        explanation: 'When duplicates exist and arr[left] == arr[mid] == arr[right], we cannot determine which half is sorted without incrementing left and decrementing right one by one, degrading complexity to O(n).'
      },
      {
        id: 'qm10',
        topic: 'Time Complexity',
        question: 'On an array of size 1,000,000, approximately how many maximum comparisons does Binary Search need in the worst case?',
        options: [
          '1,000 comparisons',
          '500,000 comparisons',
          '20 comparisons (since 2^20 ≈ 1,048,576)',
          '100 comparisons'
        ],
        correctIndex: 2,
        explanation: 'log2(1,000,000) ≈ 19.93. Hence, Binary Search takes at most 20 comparisons to find or reject any element in 1 million items!'
      }
    ],
    hard: [
      {
        id: 'qh1',
        topic: 'Binary Search on Answer',
        question: 'In problems like "Koko Eating Bananas" or "Book Allocation", what monotonic property enables Binary Search on the Answer?',
        options: [
          'The input array itself is sorted',
          'The predicate function f(speed/capacity) is monotonic (False False ... True True)',
          'The maximum value is always a power of 2',
          'The number of piles is equal to the number of hours'
        ],
        correctIndex: 1,
        explanation: 'Binary Search on Answer relies on a boolean predicate function f(x) that is monotonic: once a speed or allocation x is feasible, all x > feasible are also feasible.'
      },
      {
        id: 'qh2',
        topic: 'Rotated Array',
        question: 'To find the minimum element in a rotated sorted array without duplicates, what comparison is made with mid?',
        options: [
          'Compare arr[mid] with arr[0]',
          'Compare arr[mid] with arr[right]: if arr[mid] > arr[right], min is in right half; else left half',
          'Compare arr[mid] with target',
          'Check if mid == 0'
        ],
        correctIndex: 1,
        explanation: 'Comparing arr[mid] with arr[right] cleanly separates the inflection point: if arr[mid] > arr[right], the pivot/minimum lies strictly to the right of mid (left = mid + 1); otherwise it is at mid or to the left (right = mid).'
      }
    ]
  }
};
