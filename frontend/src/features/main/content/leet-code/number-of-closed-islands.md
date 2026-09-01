# 1254. Number of Closed Islands

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

## Problem

Given a grid where `0` represents land and `1` represents water, return the number of "closed" islands — groups of connected land cells that are completely surrounded by water and do not touch the grid's border.

### Example

```
Input: grid = [[1,1,1,1,1,1,1,0],
               [1,0,0,0,0,1,1,0],
               [1,0,1,0,1,1,1,0],
               [1,0,0,0,0,1,0,1],
               [1,1,1,1,1,1,1,0]]
Output: 2
```

## Approach

Any land region touching the border cannot be closed, so first flood-fill (DFS) every border land cell, converting it and everything connected to it into water — this removes all "open" islands from consideration. Then scan the entire grid and run a flood fill from each remaining land cell found, incrementing the closed-island count once per new connected component discovered, marking visited cells as water to avoid recounting.

## C# Solution

```csharp
public class Solution
{
    private int rows, cols;

    public int ClosedIsland(int[][] grid)
    {
        rows = grid.Length;
        cols = grid[0].Length;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                bool isBorder = r == 0 || r == rows - 1 || c == 0 || c == cols - 1;
                if (isBorder && grid[r][c] == 0)
                    Fill(grid, r, c);
            }
        }

        int count = 0;
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 0)
                {
                    Fill(grid, r, c);
                    count++;
                }
            }
        }

        return count;
    }

    private void Fill(int[][] grid, int r, int c)
    {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != 0) return;

        grid[r][c] = 1;
        Fill(grid, r + 1, c);
        Fill(grid, r - 1, c);
        Fill(grid, r, c + 1);
        Fill(grid, r, c - 1);
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the recursion stack in the worst case.
