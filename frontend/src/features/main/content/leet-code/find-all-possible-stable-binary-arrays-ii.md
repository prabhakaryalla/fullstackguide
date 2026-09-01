# 3130. Find All Possible Stable Binary Arrays II

**Difficulty:** Hard
**Category:** Dynamic Programming, Prefix Sum

## Problem

This is the same problem as [Find All Possible Stable Binary Arrays I](find-all-possible-stable-binary-arrays-i.md) — count stable binary arrays with exactly `zero` zeros and `one` ones where no run exceeds length `limit` — but with much larger constraints on `zero`, `one`, and `limit`.

## Approach

The DP formulation is identical to Part I: `dp[i][j][k]` tracks the number of stable arrays with `i` zeros, `j` ones, ending in a run of value `k`, using a prefix-sum-style subtraction to exclude runs longer than `limit`. Since the recurrence is already O(1) per state (no nested loop needed thanks to the subtraction trick), the same table fill handles the larger constraints without any algorithmic change — only the table size grows.

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
