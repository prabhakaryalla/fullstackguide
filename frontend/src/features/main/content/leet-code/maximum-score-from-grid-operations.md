# 3225. Maximum Score From Grid Operations

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix, Prefix Sum

## Problem
You are given an `n x n` binary grid. You must select some cells column by column such that, within each column, the selected cells form a contiguous "bottom" segment (from some row down to the last row), and additionally, for consecutive columns, the selected segment in one column must not extend deeper (reach a lower row) than the segment in the column immediately to its right, unless separated properly (this encodes a staircase-like non-decreasing depth constraint moving left, or specific overlap rules per official constraints). Compute the maximum achievable score, where score is the total number of `1`s covered by all selected segments across all columns, given the added twist that some columns may be entirely skipped from selection.

## Approach
Use dynamic programming column by column, tracking for each column two states: `prevPick[i]`, the maximum achievable score up to the previous column when the previous column's selected bottom-segment starts at row `i`, and `prevSkip[i]`, the maximum achievable score up to the column before that (used when the previous column was skipped). Precompute prefix sums per column to quickly retrieve the count of 1s in any bottom-segment range. Transition between columns by considering every combination of "current selection start row" and "previous selection start row," applying different scoring formulas depending on whether the current selection is deeper or shallower than the previous one (as dictated by the overlap constraint), and update the current column's pick/skip states accordingly. The final answer is the maximum value across the last column's pick state array.

## C# Solution
```csharp
public class Solution {
    public long MaximumScore(int[][] grid) {
        int n = grid.Length;
        long[][] prefix = new long[n][];
        for (int j = 0; j < n; j++)
            prefix[j] = new long[n + 1];

        long[] prevPick = new long[n + 1];
        long[] prevSkip = new long[n + 1];

        for (int j = 0; j < n; j++)
            for (int i = 0; i < n; i++)
                prefix[j][i + 1] = prefix[j][i] + grid[i][j];

        for (int j = 1; j < n; j++) {
            long[] currPick = new long[n + 1];
            long[] currSkip = new long[n + 1];

            for (int curr = 0; curr <= n; curr++) {
                for (int prev = 0; prev <= n; prev++) {
                    if (curr > prev) {
                        long score = prefix[j - 1][curr] - prefix[j - 1][prev];
                        currPick[curr] = Math.Max(currPick[curr], prevSkip[prev] + score);
                        currSkip[curr] = Math.Max(currSkip[curr], prevSkip[prev] + score);
                    } else {
                        long score = prefix[j][prev] - prefix[j][curr];
                        currPick[curr] = Math.Max(currPick[curr], prevPick[prev] + score);
                        currSkip[curr] = Math.Max(currSkip[curr], prevPick[prev]);
                    }
                }
            }

            prevPick = currPick;
            prevSkip = currSkip;
        }

        return prevPick.Max();
    }
}
```

## Complexity
- Time: O(n^3)
- Space: O(n^2)
