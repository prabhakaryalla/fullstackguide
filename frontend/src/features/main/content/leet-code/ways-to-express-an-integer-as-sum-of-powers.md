# 2787. Ways to Express an Integer as Sum of Powers

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Math

## Problem

Given two positive integers `n` and `x`, return the number of ways `n` can be expressed as the sum of the `x`-th power of unique positive integers, modulo `10^9 + 7`. Two ways are different if the sets of base integers used differ.

### Example

Input: n = 4, x = 1
Output: 2
Explanation: 4 = 4, and 4 = 3 + 1. Both use distinct positive integers.

## Approach

This is a subset-sum style dynamic programming problem. Let `dp[s]` be the number of ways to reach sum `s` using distinct bases processed so far. For each candidate base `b` starting at 1, compute `power = b^x`; if `power > n`, stop. Otherwise update `dp[s] += dp[s - power]` for `s` from `n` down to `power` (0/1 knapsack style, iterating downward so each base is used at most once). The answer is `dp[n]`.

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfWays(int n, int x) 
    {
        const int MOD = 1_000_000_007;
        var dp = new long[n + 1];
        dp[0] = 1;

        for (int baseNum = 1; ; baseNum++) 
        {
            long power = 1;
            for (int k = 0; k < x; k++) power *= baseNum;
            if (power > n) break;

            for (int s = n; s >= power; s--) 
            {
                dp[s] = (dp[s] + dp[s - power]) % MOD;
            }
        }

        return (int)dp[n];
    }
}
```

## Complexity

- **Time:** O(n^(1/x) · n)
- **Space:** O(n)
