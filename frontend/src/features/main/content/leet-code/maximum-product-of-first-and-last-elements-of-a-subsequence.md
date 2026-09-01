# 3584. Maximum Product of First and Last Elements of a Subsequence

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Max/Min

## Problem
You are given an integer array `nums` and an integer `m`. Consider every subsequence of `nums` with exactly `m` elements. For such a subsequence, only the **first** and **last** chosen elements matter for scoring: the score is their product. Return the maximum score achievable over all subsequences of length `m`.

## Approach
Choosing a subsequence of length `m` with first index `i` and last index `j` only requires `j - i >= m - 1` (enough room to pick the remaining `m - 2` elements strictly between them — their identity doesn't affect the score). So the problem reduces to: maximize `nums[i] * nums[j]` over all pairs `i < j` with `j - i >= m - 1`.

Scan `j` from left to right while maintaining the running minimum and maximum of `nums[i]` for all valid `i` (i.e., `i <= j - m + 1`). Because values can be negative, both the running max and running min must be tried against `nums[j]` to find the best product.

## C# Solution

```csharp
public class Solution 
{
    public long MaxProduct(int[] nums, int m)
    {
        int n = nums.Length;
        long best = long.MinValue;
        long minSoFar = long.MaxValue;
        long maxSoFar = long.MinValue;

        for (int j = m - 1; j < n; j++)
        {
            int i = j - m + 1;
            minSoFar = Math.Min(minSoFar, nums[i]);
            maxSoFar = Math.Max(maxSoFar, nums[i]);

            long last = nums[j];
            best = Math.Max(best, Math.Max(minSoFar * last, maxSoFar * last));
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
