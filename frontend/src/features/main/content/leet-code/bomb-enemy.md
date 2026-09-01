# 361. Bomb Enemy

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `m x n` grid where `'W'` marks a wall, `'E'` marks an enemy, and `'0'` marks empty ground, return the maximum number of enemies a single bomb could kill if placed on an empty cell. A bomb kills all enemies in the same row and column until (but not including) a wall blocks the line of sight.

### Example

```
Input: grid = [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]
Output: 3
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 500`

## Approach

Compute, for every empty cell, how many enemies would be hit horizontally and vertically without fully rescanning each time. Scan each row left to right, and whenever a new wall-free segment begins (at the start of the row or right after a wall), precompute the enemy count for that whole segment once and reuse it for every cell within it; do the same scanning columns top to bottom. Summing the row and column hit counts at each empty cell gives the total kill count if a bomb were placed there.

## C# Solution

```csharp
public class Solution
{
    public int MaxKilledEnemies(char[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var killCount = new int[rows, cols];

        for (int r = 0; r < rows; r++)
        {
            int rowHits = 0;
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 'W') { rowHits = 0; continue; }
                if (c == 0 || grid[r][c - 1] == 'W') rowHits = CountRowHits(grid, r, c, cols);
                killCount[r, c] += rowHits;
            }
        }

        for (int c = 0; c < cols; c++)
        {
            int colHits = 0;
            for (int r = 0; r < rows; r++)
            {
                if (grid[r][c] == 'W') { colHits = 0; continue; }
                if (r == 0 || grid[r - 1][c] == 'W') colHits = CountColHits(grid, r, c, rows);
                killCount[r, c] += colHits;
            }
        }

        int best = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] == '0')
                    best = Math.Max(best, killCount[r, c]);

        return best;
    }

    private int CountRowHits(char[][] grid, int row, int startCol, int cols)
    {
        int count = 0;
        for (int c = startCol; c < cols && grid[row][c] != 'W'; c++)
            if (grid[row][c] == 'E') count++;

        return count;
    }

    private int CountColHits(char[][] grid, int startRow, int col, int rows)
    {
        int count = 0;
        for (int r = startRow; r < rows && grid[r][col] != 'W'; r++)
            if (grid[r][col] == 'E') count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the kill-count grid.
