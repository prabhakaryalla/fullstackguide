# 3082. Find the Sum of the Power of All Subsequences

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given a 0-indexed integer array `nums` and an integer `k`. The "power" of a subsequence is defined as the number of its own subsequences that sum to exactly `k`. Return the sum of the power of every subsequence of `nums`, modulo `10^9 + 7`.

## Approach

Reframe the problem: count, over all pairs (outer subsequence, inner sub-subsequence of it summing to k), how many times each element combination is counted. Equivalently, this is the number of ways to pick a "core" subset that sums to `k` (the inner subsequence), where every other remaining element is independently either included or excluded from the outer subsequence (contributing a factor of `2` per free element). This becomes a knapsack-style counting DP: `dp[j]` = number of subsequences of the elements processed so far that sum to `j`, where excluding an element doubles all existing counts (since it can freely join or not join any already-counted "outer" subsequence) and including it both doubles the existing ways and adds new ways reachable via this element.

## C# Solution

```csharp
public class Solution {
    private const int Mod = 1_000_000_007;

    public int SumOfPower(int[] nums, int k) {
        int[] dp = new int[k + 1];
        dp[0] = 1;

        foreach (int num in nums) {
            for (int i = k; i >= 0; i--) {
                if (i < num)
                    dp[i] = (int)((dp[i] * 2L) % Mod);
                else
                    dp[i] = (int)((dp[i] * 2L + dp[i - num]) % Mod);
            }
        }

        return dp[k];
    }
}
```

## Complexity

- Time: O(n * k) — a knapsack-style DP over all elements and sums up to k.
- Space: O(k) — the 1D DP array.
