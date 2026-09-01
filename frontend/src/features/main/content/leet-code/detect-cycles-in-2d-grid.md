# 1559. Detect Cycles in 2D Grid

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

## Problem

Given an `m x n` grid of characters, return `true` if the grid contains a cycle of length 4 or more — a sequence of cells all with the same character, connected via up/down/left/right moves, that returns to the starting cell without immediately backtracking to the previous cell.

### Example

```
Input: grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]
Output: true
```

## Approach

Run a depth-first search from every unvisited cell, tracking the cell we came from (to avoid trivially "reusing" the same edge backward). If the search reaches a cell that is already visited **and is not the immediate parent**, a cycle has been found. Only move to neighbors sharing the same character.

## C# Solution

```csharp
public class Solution
{
    private char[][] grid = null!;
    private bool[,] visited = null!;
    private int rows, cols;

    public bool ContainsCycle(char[][] grid)
    {
        this.grid = grid;
        rows = grid.Length;
        cols = grid[0].Length;
        visited = new bool[rows, cols];

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (!visited[r, c] && Dfs(r, c, -1, -1))
                {
                    return true;
                }
            }
        }

        return false;
    }

    private bool Dfs(int r, int c, int parentR, int parentC)
    {
        visited[r, c] = true;
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        for (int d = 0; d < 4; d++)
        {
            int nr = r + dr[d];
            int nc = c + dc[d];

            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] != grid[r][c])
            {
                continue;
            }

            if (nr == parentR && nc == parentC)
            {
                continue;
            }

            if (visited[nr, nc])
            {
                return true;
            }

            if (Dfs(nr, nc, r, c))
            {
                return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — each cell is visited once.
- **Space:** `O(rows * cols)` for the visited array and recursion stack.
