# 1162. As Far from Land as Possible

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Breadth-First Search, Matrix

## Problem

Given an `n x n` grid of `0`s (water) and `1`s (land), find the water cell that is farthest (Manhattan distance) from any land cell, and return that distance. Return `-1` if the grid is all land or all water.

### Example

```
Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
Output: 2
```

## Approach

Run a multi-source BFS starting simultaneously from every land cell. Expanding outward one ring at a time naturally computes the shortest distance from the nearest land cell to every water cell; the last ring processed (the final BFS layer) contains the water cell(s) farthest from any land.

## C# Solution

```csharp
public class Solution
{
    public int MaxDistance(int[][] grid)
    {
        int n = grid.Length;
        var queue = new Queue<(int r, int c)>();

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] == 1) queue.Enqueue((i, j));
            }
        }

        if (queue.Count == 0 || queue.Count == n * n) return -1;

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };
        int distance = -1;

        while (queue.Count > 0)
        {
            int size = queue.Count;
            distance++;

            for (int i = 0; i < size; i++)
            {
                var (r, c) = queue.Dequeue();

                for (int d = 0; d < 4; d++)
                {
                    int nr = r + dr[d], nc = c + dc[d];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0)
                    {
                        grid[nr][nc] = 1;
                        queue.Enqueue((nr, nc));
                    }
                }
            }
        }

        return distance;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the BFS queue.
