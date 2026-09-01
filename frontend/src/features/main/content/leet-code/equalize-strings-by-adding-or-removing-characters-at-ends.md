# 3135. Equalize Strings by Adding or Removing Characters at Ends

**Difficulty:** Medium
**Category:** Dynamic Programming, Hash Function, Sliding Window, String

## Problem

You are given two strings `initial` and `target`. In one operation, you may add or remove a character at either end of `initial`. Return the minimum number of operations to transform `initial` into `target`.

## Approach

Since characters can only be added or removed at the ends, the best strategy is to find the longest contiguous block of characters that appears as a **substring** in both `initial` and `target` — that shared block never needs to move, while everything outside it (on both sides, in both strings) gets trimmed or extended away. This is the classic "longest common substring" DP: `dp[i][j]` equals `dp[i-1][j-1] + 1` if `initial[i-1] == target[j-1]` (extending a matching run), or `0` otherwise (no match resets the run). The minimum operations equal `|initial| + |target| - 2 * (longest common substring length)` — trimming both strings down to just the shared block, then rebuilding whatever's missing.

## C# Solution

```csharp
public class Solution {
    public int MinOperations(string initial, string target) {
        int m = initial.Length, n = target.Length;
        int[,] dp = new int[m + 1, n + 1];

        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                if (initial[i - 1] == target[j - 1])
                    dp[i, j] = 1 + dp[i - 1, j - 1];

        int maxCommonLength = 0;
        for (int i = 0; i <= m; i++)
            for (int j = 0; j <= n; j++)
                maxCommonLength = Math.Max(maxCommonLength, dp[i, j]);

        return m + n - 2 * maxCommonLength;
    }
}
```

## Complexity

- Time: O(m * n) — filling the DP table.
- Space: O(m * n) — the DP table.
