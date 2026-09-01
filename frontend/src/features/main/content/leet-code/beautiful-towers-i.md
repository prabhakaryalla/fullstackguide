# 2865. Beautiful Towers I

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack

## Problem

You are given a 0-indexed array `heights` of positive integers representing tower heights. You can change the height of any tower to any non-negative integer.

A configuration is considered beautiful if:
- `heights` forms a mountain array (increases then decreases, or only increases, or only decreases)
- More formally, there exists an index `i` (the peak) where `0 <= i < n` such that:
  - For all `0 <= j < i`: `heights[j] <= heights[j+1]`
  - For all `i < j < n-1`: `heights[j] >= heights[j+1]`

Return the maximum possible sum of heights in a beautiful configuration.

### Example

```
Input: heights = [5,3,4,1,1]
Output: 13
Explanation:
Choose peak at index 2.
Modify to [3,3,4,1,1].
Sum = 3+3+4+1+1 = 12
Actually, choose peak at index 0: [5,3,3,1,1], sum = 13
```

## Approach

For each possible peak position `p`, compute the maximum sum if the peak is at `p`. Use two passes:
1. Left pass: for each position, compute max sum maintaining non-decreasing property up to that point
2. Right pass: for each position, compute max sum maintaining non-increasing property from that point

For each peak, the answer is `left[p] + right[p] - heights[p]`.

## C# Solution

```csharp
public class Solution
{
    public long MaximumSumOfHeights(int[] heights)
    {
        int n = heights.Length;
        long[] left = new long[n];
        long[] right = new long[n];
        
        left[0] = heights[0];
        for (int i = 1; i < n; i++)
        {
            left[i] = left[i - 1] + Math.Min(heights[i], heights[i - 1]);
        }
        
        right[n - 1] = heights[n - 1];
        for (int i = n - 2; i >= 0; i--)
        {
            right[i] = right[i + 1] + Math.Min(heights[i], heights[i + 1]);
        }
        
        long maxSum = 0;
        for (int i = 0; i < n; i++)
        {
            long sum = left[i] + right[i] - heights[i];
            maxSum = Math.Max(maxSum, sum);
        }
        
        return maxSum;
    }
}
```

## Complexity

- **Time:** `O(n)` — three linear passes.
- **Space:** `O(n)` for the left and right arrays.
