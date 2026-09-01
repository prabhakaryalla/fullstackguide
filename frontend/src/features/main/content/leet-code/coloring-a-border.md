# 1034. Coloring A Border

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix

## Problem

Given a grid of colors and a starting cell `(row, col)`, find the connected component of cells with the same color as the starting cell (connected via 4-directional moves), and repaint only the **border** cells of that component with `color`. A cell is on the border if it's on the edge of the grid or adjacent to a cell of a different color.

### Example

```
Input: grid = [[1,1],[1,2]], row = 0, col = 0, color = 3
Output: [[3,3],[3,2]]
```

## Approach

Depth-first search from `(row, col)`, staying within cells that share the original color and marking them visited. While visiting a cell, check its four neighbors: if a neighbor is out of bounds or has a different color, the current cell is a border cell; if a neighbor shares the color and hasn't been visited, recurse into it. Collect all border cells during the traversal, and only after the traversal completes, repaint them — this avoids the repainted color being mistaken for "different" while still exploring the same component.

## C# Solution

```csharp
public class Solution
{
    public int[][] ColorBorder(int[][] grid, int row, int col, int color)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int originalColor = grid[row][col];
        var visited = new bool[rows, cols];
        var borderCells = new List<(int r, int c)>();
        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        void Dfs(int r, int c)
        {
            visited[r, c] = true;
            bool isBorder = false;

            for (int d = 0; d < 4; d++)
            {
                int nr = r + dr[d], nc = c + dc[d];

                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols)
                {
                    isBorder = true;
                }
                else if (grid[nr][nc] != originalColor)
                {
                    isBorder = true;
                }
                else if (!visited[nr, nc])
                {
                    Dfs(nr, nc);
                }
            }

            if (isBorder) borderCells.Add((r, c));
        }

        Dfs(row, col);

        foreach (var (r, c) in borderCells)
        {
            grid[r][c] = color;
        }

        return grid;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — each cell is visited once.
- **Space:** `O(rows * cols)` for the visited grid and recursion stack.
