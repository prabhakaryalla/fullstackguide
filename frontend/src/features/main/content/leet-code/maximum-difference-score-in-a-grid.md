# 3148. Maximum Difference Score in a Grid

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

You are given an `m x n` integer matrix `grid`. Starting at any cell, you may repeatedly move right or down to another cell (not necessarily adjacent — any cell further right in the same row, or further down in the same column, is reachable directly, though the path must be strictly monotonic). The "score" of a path is `(value at the end) - (value at the start)`. Return the maximum score achievable over any valid path with at least one move.

## Approach

Process cells in row-major order. For each cell `(i, j)`, the smallest value reachable so far along any monotonic path ending just before it is `min(grid[i-1][j], grid[i][j-1])` (the best "cheapest start" from directly above or to the left, which itself already accounts for further predecessors via the same rule). Update the running best score using `grid[i][j] - prevMin`, then overwrite `grid[i][j]` in place with `min(grid[i][j], prevMin)` so it correctly represents the cheapest value reachable ending at this cell for future cells to reference.

## C# Solution

```csharp
public class Solution {
    public int MaxScore(int[][] grid) {
        const int max = 200_000;
        int ans = -max;

        for (int i = 0; i < grid.Length; i++) {
            for (int j = 0; j < grid[0].Length; j++) {
                int prevMin = Math.Min(i > 0 ? grid[i - 1][j] : max, j > 0 ? grid[i][j - 1] : max);
                ans = Math.Max(ans, grid[i][j] - prevMin);
                grid[i][j] = Math.Min(grid[i][j], prevMin);
            }
        }

        return ans;
    }
}
```

## Complexity

- Time: O(m * n) — a single pass over the grid.
- Space: O(1) — the grid is updated in place.
