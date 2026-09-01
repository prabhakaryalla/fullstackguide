# 694. Number of Distinct Islands

**Difficulty:** Medium
**Category:** Array, Hash Table, Depth-First Search, Breadth-First Search, Matrix, Hash Function
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a binary grid, return the number of distinct islands, where two islands are considered the same if one can be translated (but not rotated or reflected) to exactly match the other.

### Example

```
Input: grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]
Output: 1
```

## Approach

For each unvisited land cell, run a depth-first search over its island, recording every visited cell's position *relative to the island's starting cell* (so translation doesn't affect the recorded shape) as a string signature. Collecting all these relative-position signatures into a set and counting distinct signatures gives the count of distinct island shapes.

## C# Solution

```csharp
public class Solution
{
    public int NumDistinctIslands(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var visited = new bool[rows, cols];
        var shapes = new HashSet<string>();

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 1 && !visited[r, c])
                {
                    var shape = new StringBuilder();
                    Dfs(grid, visited, r, c, r, c, shape);
                    shapes.Add(shape.ToString());
                }
            }
        }

        return shapes.Count;
    }

    private void Dfs(int[][] grid, bool[,] visited, int r, int c, int originR, int originC, StringBuilder shape)
    {
        int rows = grid.Length, cols = grid[0].Length;
        if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r, c] || grid[r][c] == 0) return;

        visited[r, c] = true;
        shape.Append('(').Append(r - originR).Append(',').Append(c - originC).Append(')');

        Dfs(grid, visited, r + 1, c, originR, originC, shape);
        Dfs(grid, visited, r - 1, c, originR, originC, shape);
        Dfs(grid, visited, r, c + 1, originR, originC, shape);
        Dfs(grid, visited, r, c - 1, originR, originC, shape);
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the visited grid and shape signatures.
