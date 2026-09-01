# 3409. Longest Subsequence With Decreasing Adjacent Difference

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem
You are given an array of integers `nums`. Find the length of the longest subsequence `seq0, seq1, ..., seqm` of `nums` such that the absolute differences between consecutive elements form a non-increasing sequence, i.e. `|seq1 - seq0| >= |seq2 - seq1| >= ... >= |seqm - seq(m-1)|`. Return the length of such a subsequence.

## Approach
Since values are bounded (0 to 300), use a DP indexed by value and by the last difference used. Let `dp[u][d]` be the length of the longest valid subsequence that ends with value `u` where the last step had absolute difference exactly `d`. When processing a new element `v`, for every possible previous value `u`, the new difference is `diff = |v - u|`, and it can only extend a chain whose last difference was `>= diff` (to keep the sequence non-increasing). Maintain `sufMax[u][d] = max(dp[u][d'] for d' >= d)` so this lookup is O(1). A fresh subsequence of length 1 always has no constraint yet, modeled with a virtual "infinite" difference bucket. After computing all candidate lengths for `v`, update `dp[v][*]` and rebuild `sufMax[v][*]` via a single suffix-max pass.

## C# Solution

```csharp
public class Solution 
{
    public int LongestSubsequence(int[] nums) 
    {
        const int maxVal = 300;
        const int inf = maxVal + 1;
        int[,] dp = new int[maxVal + 1, inf + 1];
        int[,] sufMax = new int[maxVal + 1, inf + 1];

        int ans = 1;
        foreach (int v in nums)
        {
            int[] best = new int[inf + 1];
            best[inf] = 1;

            for (int u = 0; u <= maxVal; u++)
            {
                int diff = Math.Abs(v - u);
                int prevBest = sufMax[u, diff];
                if (prevBest > 0)
                {
                    int candidate = prevBest + 1;
                    if (candidate > best[diff]) best[diff] = candidate;
                }
            }

            for (int diff = 0; diff <= inf; diff++)
            {
                if (best[diff] > dp[v, diff])
                {
                    dp[v, diff] = best[diff];
                }
                if (dp[v, diff] > ans) ans = dp[v, diff];
            }

            int running = 0;
            for (int diff = inf; diff >= 0; diff--)
            {
                if (dp[v, diff] > running) running = dp[v, diff];
                sufMax[v, diff] = running;
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n * V), where V is the bounded value range (301)
- **Space:** O(V^2)
