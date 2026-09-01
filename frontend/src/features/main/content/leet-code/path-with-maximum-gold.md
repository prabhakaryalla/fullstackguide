# 1219. Path with Maximum Gold

**Difficulty:** Medium
**Category:** Array, Backtracking, Matrix

## Problem

Given an `m x n` grid where each cell holds an amount of gold (`0` means no gold), return the maximum amount of gold collectible on a path that starts and stops at any cell with gold, only moves to an adjacent cell that also has gold, and never revisits a cell.

### Example

```
Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
```

## Approach

Try starting a depth-first search from every cell that has gold. During the DFS, temporarily zero out the current cell (marking it visited without extra memory), recurse into the four neighboring cells that still have gold, take the best result, then restore the cell's value on the way back up (backtracking) so other starting points can reuse it.

## C# Solution

```csharp
public class Solution
{
    private int[][] grid = null!;
    private int rows, cols;

    public int GetMaximumGold(int[][] grid)
    {
        this.grid = grid;
        rows = grid.Length;
        cols = grid[0].Length;
        int best = 0;

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                if (grid[r][c] != 0)
                    best = Math.Max(best, Dfs(r, c));

        return best;
    }

    private int Dfs(int r, int c)
    {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == 0) return 0;

        int gold = grid[r][c];
        grid[r][c] = 0;

        int best = Math.Max(
            Math.Max(Dfs(r + 1, c), Dfs(r - 1, c)),
            Math.Max(Dfs(r, c + 1), Dfs(r, c - 1)));

        grid[r][c] = gold;
        return gold + best;
    }
}
```

## Complexity

- **Time:** `O(3^k)` in the worst case, where `k` is the number of cells with gold (each step has up to 3 unvisited neighbor choices).
- **Space:** `O(k)` for the recursion stack.
