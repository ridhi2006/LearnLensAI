export const chatService = {
  // Generate contextual AI response based on message and mode
  async sendTutorMessage({ message, mode = 'College', videoContext = 'Binary Search' }) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lower = message.toLowerCase();

    // Mode-specific tone variations for common queries
    if (lower.includes('sorted') || lower.includes('order') || lower.includes('why does binary search need')) {
      if (mode === 'Beginner') {
        return "Imagine looking up a word in a dictionary where all words are scrambled randomly. You'd have to check every single page from start to finish! But because it's sorted alphabetically, if you open to 'M' and want 'Tiger', you know 100% you can throw away the entire first half without looking at it. That's why sorting is required.";
      }
      if (mode === 'Revision') {
        return "• Core Requirement: Monotonicity f(x).\n• Invariant: Target either strictly lies in [left, mid-1] or [mid+1, right].\n• Without order, no elimination can be made -> falls back to O(N) linear search.";
      }
      if (mode === 'Interview') {
        return "Binary Search relies on the invariant of a monotonic decision boundary. When you compare `arr[mid]` with `target`, you can discard `n/2` candidates in O(1) time ONLY if the partition theorem holds. In an interview, mention that monotonicity isn't limited to sorted arrays—it also applies to monotonic boolean predicate functions `f: X -> {0, 1}`.";
      }
      // College default
      return "Binary Search requires sorted data because the divide-and-conquer decision rule relies on monotonicity: if `arr[mid] < target`, all elements at indices `i <= mid` are guaranteed to be strictly less than `target` by transitivity. This enables discarding exactly half the search space with each comparison.";
    }

    if (lower.includes('overflow') || lower.includes('mid') || lower.includes('calculation')) {
      return "Using `mid = left + (right - left) / 2` calculates the relative offset `(right - left)` first. Since both `left` and `right` are within valid index bounds, their difference is non-negative and will never exceed the maximum integer boundary, avoiding the 32-bit overflow of `(left + right)`.";
    }

    if (lower.includes('log') || lower.includes('complexity') || lower.includes('time')) {
      return "The recurrence relation is `T(n) = T(n/2) + O(1)`. Applying the Master Theorem (Case 2 with a=1, b=2, k=0) yields `T(n) = O(log2 n)`. For 1,000,000 elements, it guarantees at most 20 iterations.";
    }

    if (lower.includes('example') || lower.includes('code')) {
      return "Here is the standard iterative implementation:\n\n```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```";
    }

    // Default intelligent response
    return `In **${mode} Mode**: When analyzing this concept within ${videoContext}, the key is maintaining the search invariant. Each comparison eliminates half the remaining candidate elements. Would you like me to show a step-by-step trace or test you with a quick conceptual question?`;
  },

  // Evaluate Interview assessment answer
  async evaluateInterviewAnswer({ questionId, questionText, userAnswer }) {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Realistic assessment feedback
    return {
      feedback: "Strong explanation of the core search space elimination and O(log n) time complexity. However, you didn't explicitly mention the overflow risk in midpoint calculation `(left + (right-left)/2)` or duplicate handling with Lower/Upper bounds.",
      scores: {
        conceptUnderstanding: 8,
        complexityAnalysis: 7,
        implementationDetails: 6,
        problemSolving: 7,
        overall: 7.0
      },
      weakTopics: [
        'Boundary Conditions & Overflow',
        'Lower Bound Duplicate Invariant'
      ],
      strengths: [
        'Clear intuition on divide-and-conquer strategy',
        'Accurate logarithmic time complexity justification'
      ],
      recommendation: "Review the 'Lower Bound' section in Notes and practice the 'Rotated Array' roadmap module."
    };
  }
};
