# 3142. Check if Grid Satisfies Conditions

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given an `m x n` integer matrix `grid`, return `true` if every column is constant (all values in a column are equal), and every pair of horizontally adjacent cells (same row, neighboring columns) holds different values.

## Approach

Check both conditions directly with two simple passes: for every pair of vertically adjacent cells, they must be equal (constant columns); for every pair of horizontally adjacent cells, they must differ. If either check fails anywhere, return `false`; otherwise `true`.

## C# Solution

```csharp
public class Solution {
    public bool SatisfiesConditions(int[][] grid) {
        int m = grid.Length, n = grid[0].Length;

        for (int i = 0; i + 1 < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] != grid[i + 1][j])
                    return false;

        for (int i = 0; i < m; i++)
            for (int j = 0; j + 1 < n; j++)
                if (grid[i][j] == grid[i][j + 1])
                    return false;

        return true;
    }
}
```

## Complexity

- Time: O(m * n) — two passes over the grid.
- Space: O(1).
