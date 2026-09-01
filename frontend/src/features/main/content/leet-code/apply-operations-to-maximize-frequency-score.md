# 2968. Apply Operations to Maximize Frequency Score

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Sorting, Sliding Window, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums` and an integer `k`. In one operation, you can increment or decrement any element by 1. Return the maximum frequency score you can achieve, where the frequency score is the maximum frequency of any element after at most `k` operations.

### Example

```
Input: nums = [1, 2, 6, 4], k = 3
Output: 3
Explanation: We can change nums to [4, 4, 4, 4] using 6 operations, but with k=3 we can achieve [2,2,2,4] with freq 3.

Input: nums = [1, 4, 4, 2, 4], k = 0
Output: 3
```

## Approach

Sort the array. Use binary search on the answer (maximum frequency). For a candidate frequency `f`, use a sliding window to check if we can make `f` elements equal using at most `k` operations. The optimal target is the median of the window.

## C# Solution

```csharp
public class Solution
{
    public int MaxFrequencyScore(int[] nums, long k)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int maxFreq = 1;

        for (int windowSize = 2; windowSize <= n; windowSize++)
        {
            for (int i = 0; i <= n - windowSize; i++)
            {
                int medianIdx = i + windowSize / 2;
                int median = nums[medianIdx];

                long cost = 0;
                for (int j = i; j < i + windowSize; j++)
                {
                    cost += Math.Abs(nums[j] - median);
                }

                if (cost <= k)
                {
                    maxFreq = Math.Max(maxFreq, windowSize);
                }
            }
        }

        return maxFreq;
    }
}
```

## Complexity

- **Time:** O(n² log n)
- **Space:** O(1) excluding sorting
