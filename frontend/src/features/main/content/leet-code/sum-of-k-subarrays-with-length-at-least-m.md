# 3473. Sum of K Subarrays With Length at Least M

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

You are given an integer array `nums` and two integers `k` and `m`. Choose exactly `k` non-overlapping subarrays of `nums`, each of length at least `m`, to maximize the sum of the elements across all chosen subarrays. Return this maximum possible sum.

### Example

`nums = [1,2,-1,3,3,4], k = 2, m = 2` → picking the subarrays `[1,2]` and `[3,3,4]` (or another combination satisfying the length and count requirements) that jointly maximize the total sum is the target result.

## Approach

Use dynamic programming where `dp[i][j]` represents the best achievable sum using the first `i` elements while having selected `j` subarrays so far, with the `j`-th subarray (if selected) ending at or before index `i`. The transition either skips element `i - 1` (`dp[i][j] = dp[i-1][j]`) or closes a new subarray of length at least `m` ending exactly at `i`. To keep this efficient, maintain, for each subarray count `j`, a running maximum of `dp[t][j-1] - prefix[t]` for every valid starting point `t <= i - m`, so each `dp[i][j]` can be computed in O(1) using prefix sums.

## C# Solution

```csharp
public class Solution 
{
    public long MaxSum(int[] nums, int k, int m) 
    {
        int n = nums.Length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++)
            prefix[i + 1] = prefix[i] + nums[i];

        long NEG = long.MinValue / 2;
        long[,] dp = new long[n + 1, k + 1];
        for (int i = 0; i <= n; i++)
            for (int j = 0; j <= k; j++)
                dp[i, j] = (j == 0) ? 0 : NEG;

        for (int j = 1; j <= k; j++)
        {
            long best = NEG;

            for (int i = 0; i <= n; i++)
            {
                dp[i, j] = i > 0 ? dp[i - 1, j] : NEG;

                int t = i - m;
                if (t >= 0)
                {
                    long candidateBase = dp[t, j - 1];
                    if (candidateBase > NEG / 2)
                        best = Math.Max(best, candidateBase - prefix[t]);
                }

                if (best > NEG / 2)
                    dp[i, j] = Math.Max(dp[i, j], prefix[i] + best);
            }
        }

        return dp[n, k];
    }
}
```

## Complexity

- **Time:** O(n * k)
- **Space:** O(n * k)
