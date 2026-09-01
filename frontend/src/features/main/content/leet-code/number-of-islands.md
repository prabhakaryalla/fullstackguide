# 200. Number of Islands

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

## Problem

Given an `m x n` 2D binary grid where `'1'` represents land and `'0'` represents water, return the number of islands (groups of `'1'`s connected horizontally or vertically).

### Example

```
grid = [
  ["1","1","0","0"],
  ["1","1","0","0"],
  ["0","0","1","0"],
  ["0","0","0","1"]
] -> 3
```

## Approach

Scan every cell; whenever an unvisited land cell (`'1'`) is found, it marks the start of a new island — increment the island count and flood-fill (DFS/BFS) outward from it, marking every connected land cell as visited (e.g. by overwriting it to `'0'`) so it isn't counted again.

## C# Solution

```csharp
public class Solution
{
    public int NumIslands(char[][] grid)
    {
        int islands = 0;

        for (int row = 0; row < grid.Length; row++)
        {
            for (int col = 0; col < grid[0].Length; col++)
            {
                if (grid[row][col] == '1')
                {
                    islands++;
                    Sink(grid, row, col);
                }
            }
        }

        return islands;
    }

    private void Sink(char[][] grid, int row, int col)
    {
        if (row < 0 || row >= grid.Length || col < 0 || col >= grid[0].Length || grid[row][col] != '1')
        {
            return;
        }

        grid[row][col] = '0';

        Sink(grid, row + 1, col);
        Sink(grid, row - 1, col);
        Sink(grid, row, col + 1);
        Sink(grid, row, col - 1);
    }
}
```

## Complexity

- **Time:** `O(m * n)` — every cell is visited a constant number of times.
- **Space:** `O(m * n)` — worst case recursion depth for the flood fill.
