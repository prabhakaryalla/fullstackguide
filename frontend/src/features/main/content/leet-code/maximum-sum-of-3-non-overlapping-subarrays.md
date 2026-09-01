# 689. Maximum Sum of 3 Non-Overlapping Subarrays

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given an integer array `nums` and an integer `k`, return the indices of three non-overlapping subarrays of length `k` that together have the maximum sum, choosing the lexicographically smallest set of indices if there's a tie.

### Example

```
Input: nums = [1,2,1,2,6,7,5,1], k = 2
Output: [0,3,5]
```

## Approach

Precompute the sum of every length-`k` window. For each window index, determine the best (highest-sum) window at or before it (`left`, preferring an earlier index on ties for lexicographically smallest results) and the best window at or after it (`right`, preferring an earlier index even when tying for maximum, using `>=` in the backward scan). Then try every possible middle window (leaving room for `k` on each side), combining it with the best qualifying window fully to its left and fully to its right, and keep the combination with the maximum total sum.

## C# Solution

```csharp
public class Solution
{
    public int[] MaxSumOfThreeSubarrays(int[] nums, int k)
    {
        int n = nums.Length;
        var windowSums = new int[n - k + 1];
        int sum = 0;

        for (int i = 0; i < n; i++)
        {
            sum += nums[i];
            if (i >= k) sum -= nums[i - k];
            if (i >= k - 1) windowSums[i - k + 1] = sum;
        }

        int m = windowSums.Length;
        var left = new int[m];
        int bestLeft = 0;
        for (int i = 0; i < m; i++)
        {
            if (windowSums[i] > windowSums[bestLeft])
                bestLeft = i;
            left[i] = bestLeft;
        }

        var right = new int[m];
        int bestRight = m - 1;
        for (int i = m - 1; i >= 0; i--)
        {
            if (windowSums[i] >= windowSums[bestRight])
                bestRight = i;
            right[i] = bestRight;
        }

        var result = new int[3];
        int maxTotal = -1;

        for (int mid = k; mid <= m - 1 - k; mid++)
        {
            int l = left[mid - k];
            int r = right[mid + k];
            int total = windowSums[l] + windowSums[mid] + windowSums[r];

            if (total > maxTotal)
            {
                maxTotal = total;
                result = new[] { l, mid, r };
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the window sums and left/right best-index arrays.
