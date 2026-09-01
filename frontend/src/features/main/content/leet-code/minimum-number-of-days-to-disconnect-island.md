# 1568. Minimum Number of Days to Disconnect Island

**Difficulty:** Hard
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix

## Problem

Given a binary grid representing land (`1`) and water (`0`), where an island is a maximal group of `1`'s connected 4-directionally, you may turn any land cell into water on each "day". Return the minimum number of days required to make the grid have no island, or split it into two or more islands (or reduce it to no land at all).

### Example

```
Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]
Output: 2
```

## Approach

This relies on a key theorem: the answer is always `0`, `1`, or `2`. First, count connected components — if it's already `0` or `2+`, the answer is `0`. Otherwise, try removing each individual land cell one at a time (temporarily), and recount components; if any single removal produces `0` or `2+` components, the answer is `1`. If no single-cell removal works, the answer is always `2` (removing any two adjacent land cells is provably always sufficient for a single connected island).

## C# Solution

```csharp
public class Solution
{
    public int MinDays(int[][] grid)
    {
        int rows = grid.Length;
        int cols = grid[0].Length;

        int CountIslands(int[][] g)
        {
            bool[,] visited = new bool[rows, cols];
            int islands = 0;

            void Dfs(int r, int c)
            {
                if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r, c] || g[r][c] == 0)
                {
                    return;
                }
                visited[r, c] = true;
                Dfs(r + 1, c);
                Dfs(r - 1, c);
                Dfs(r, c + 1);
                Dfs(r, c - 1);
            }

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    if (g[r][c] == 1 && !visited[r, c])
                    {
                        islands++;
                        Dfs(r, c);
                    }
                }
            }

            return islands;
        }

        if (CountIslands(grid) != 1)
        {
            return 0;
        }

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 1)
                {
                    grid[r][c] = 0;
                    int islands = CountIslands(grid);
                    grid[r][c] = 1;

                    if (islands != 1)
                    {
                        return 1;
                    }
                }
            }
        }

        return 2;
    }
}
```

## Complexity

- **Time:** `O((rows * cols)^2)` — for every land cell, a full grid traversal is performed to recount islands.
- **Space:** `O(rows * cols)` for the visited array and recursion stack.
