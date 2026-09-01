# 3071. Minimum Operations to Write the Letter Y on a Grid

**Difficulty:** Medium
**Category:** Array, Hash Table, Matrix, Counting

## Problem

You are given an `n x n` grid (`n` odd) with values `0`, `1`, or `2`. The cells forming the letter "Y" are the two diagonals from each corner to the center, then straight down the middle column from the center to the bottom edge; all other cells form the background. In one operation you may change any single cell's value. Return the minimum number of operations needed so that every "Y" cell holds one common value `a` and every background cell holds a different common value `b`.

## Approach

Since there are only 3 possible values, try every ordered pair `(a, b)` with `a != b` (3*2 = 6 combinations). For each pair, scan every cell: if the cell belongs to the "Y" pattern and doesn't already equal `a`, count a change; if it's a background cell that doesn't equal `b`, count a change. Take the minimum total across all 6 pairs.

## C# Solution

```csharp
public class Solution {
    public int MinimumOperationsToWriteY(int[][] grid) {
        int best = int.MaxValue;
        for (int a = 0; a < 3; a++)
            for (int b = 0; b < 3; b++)
                if (a != b)
                    best = Math.Min(best, GetOperations(grid, a, b));
        return best;
    }

    // Returns the number of cells that must change so the 'Y' pattern is all `a`
    // and the background is all `b`.
    private int GetOperations(int[][] grid, int a, int b) {
        int n = grid.Length;
        int mid = n / 2;
        int operations = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                bool onY = (i < mid && (i == j || i + j == n - 1)) || (i >= mid && j == mid);
                if (onY) {
                    if (grid[i][j] != a) operations++;
                } else {
                    if (grid[i][j] != b) operations++;
                }
            }
        }

        return operations;
    }
}
```

## Complexity

- Time: O(n^2) — 6 full passes over the grid.
- Space: O(1).
