# 695. Max Area of Island

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

## Problem

Given a binary grid, return the area of the largest island (a group of 4-directionally connected `1`s), or `0` if there is no island.

### Example

```
Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0]]
Output: 6
```

## Approach

For every unvisited land cell, run a depth-first search that marks visited cells by sinking them to `0` (avoiding a separate visited array) while counting the total number of cells in that island. Track the maximum island size found across the whole grid.

## C# Solution

```csharp
public class Solution
{
    public int MaxAreaOfIsland(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int maxArea = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 1)
                    maxArea = Math.Max(maxArea, Dfs(grid, r, c));
            }
        }

        return maxArea;
    }

    private int Dfs(int[][] grid, int r, int c)
    {
        int rows = grid.Length, cols = grid[0].Length;
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == 0) return 0;

        grid[r][c] = 0;

        return 1 + Dfs(grid, r + 1, c) + Dfs(grid, r - 1, c) + Dfs(grid, r, c + 1) + Dfs(grid, r, c - 1);
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the recursion stack in the worst case.
