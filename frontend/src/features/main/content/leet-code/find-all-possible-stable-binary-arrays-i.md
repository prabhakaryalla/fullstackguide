# 3129. Find All Possible Stable Binary Arrays I

**Difficulty:** Medium
**Category:** Dynamic Programming, Prefix Sum

## Problem

You are given integers `zero`, `one`, and `limit`. A binary array is "stable" if it contains exactly `zero` zeros and `one` ones, and no subarray of length greater than `limit` is entirely made of the same value. Return the number of distinct stable binary arrays, modulo `10^9 + 7`.

## Approach

Use a DP over `dp[i][j][k]` = the number of stable arrays using exactly `i` zeros and `j` ones so far, ending in a run whose last value is `k` (`0` or `1`). Transition: `dp[i][j][0]` builds on either ending case at `i-1` zeros, but must subtract off the count of arrays where the trailing run of `0`s would become too long (more than `limit`) — handled via a prefix-sum-style subtraction of the state exactly `limit + 1` zeros back that still ended in a `1`-run before this. The symmetric logic applies to `dp[i][j][1]`. The final answer combines both ending cases at `dp[zero][one]`.

## C# Solution

```csharp
public class Solution {
    private const int Mod = 1_000_000_007;

    public int NumberOfStableArrays(int zero, int one, int limit) {
        var dp = new long[zero + 1, one + 1, 2];

        for (int i = 0; i <= Math.Min(zero, limit); i++)
            dp[i, 0, 0] = 1;
        for (int j = 0; j <= Math.Min(one, limit); j++)
            dp[0, j, 1] = 1;

        for (int i = 1; i <= zero; i++) {
            for (int j = 1; j <= one; j++) {
                dp[i, j, 0] = (dp[i - 1, j, 0] + dp[i - 1, j, 1] -
                    (i - limit < 1 ? 0 : dp[i - limit - 1, j, 1]) + Mod) % Mod;
                dp[i, j, 1] = (dp[i, j - 1, 0] + dp[i, j - 1, 1] -
                    (j - limit < 1 ? 0 : dp[i, j - limit - 1, 0]) + Mod) % Mod;
            }
        }

        return (int)((dp[zero, one, 0] + dp[zero, one, 1]) % Mod);
    }
}
```

## Complexity

- Time: O(zero * one) — filling the DP table.
- Space: O(zero * one) — the DP table.
