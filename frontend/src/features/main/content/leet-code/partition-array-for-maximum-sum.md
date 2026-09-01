# 1043. Partition Array for Maximum Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an integer array `arr` and an integer `k`, partition it into contiguous subarrays of length at most `k`, then change every element in each subarray to the maximum value of that subarray. Return the largest possible sum of the resulting array.

### Example

```
Input: arr = [1,15,7,9,2,5,10], k = 3
Output: 84
```

## Approach

Let `dp[i]` be the best achievable sum for the prefix `arr[0..i)`. To compute `dp[i]`, consider every possible length `j` (from `1` to `k`) for the last partition ending at index `i - 1`: that partition's contribution is `max(arr[i-j..i-1]) * j`, added to `dp[i-j]`. Track the running maximum of the last `j` elements incrementally as `j` grows to avoid recomputing it from scratch.

## C# Solution

```csharp
public class Solution
{
    public int MaxSumAfterPartitioning(int[] arr, int k)
    {
        int n = arr.Length;
        var dp = new int[n + 1];

        for (int i = 1; i <= n; i++)
        {
            int currentMax = 0;
            for (int j = 1; j <= k && j <= i; j++)
            {
                currentMax = Math.Max(currentMax, arr[i - j]);
                dp[i] = Math.Max(dp[i], dp[i - j] + currentMax * j);
            }
        }

        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n * k)`.
- **Space:** `O(n)` for the DP array.
