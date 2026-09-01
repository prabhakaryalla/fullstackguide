# 1091. Shortest Path in Binary Matrix

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Matrix

## Problem

Given an `n x n` binary matrix `grid`, return the length of the shortest clear path from the top-left cell to the bottom-right cell, moving 8-directionally through cells with value `0`. Return `-1` if no such path exists.

### Example

```
Input: grid = [[0,1],[1,0]]
Output: 2
```

## Approach

This is an unweighted shortest-path problem, which BFS solves optimally. Starting from the top-left cell (if it's clear), explore all 8 neighboring directions level by level, marking cells visited as they're enqueued to avoid revisiting. The first time the bottom-right cell is dequeued, its recorded path length is the answer.

## C# Solution

```csharp
public class Solution
{
    public int ShortestPathBinaryMatrix(int[][] grid)
    {
        int n = grid.Length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) return -1;

        int[] dr = { -1, -1, -1, 0, 0, 1, 1, 1 };
        int[] dc = { -1, 0, 1, -1, 1, -1, 0, 1 };

        var visited = new bool[n, n];
        var queue = new Queue<(int r, int c, int dist)>();
        queue.Enqueue((0, 0, 1));
        visited[0, 0] = true;

        while (queue.Count > 0)
        {
            var (r, c, dist) = queue.Dequeue();

            if (r == n - 1 && c == n - 1) return dist;

            for (int d = 0; d < 8; d++)
            {
                int nr = r + dr[d], nc = c + dc[d];

                if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
                if (visited[nr, nc] || grid[nr][nc] == 1) continue;

                visited[nr, nc] = true;
                queue.Enqueue((nr, nc, dist + 1));
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — each cell is enqueued at most once.
- **Space:** `O(n^2)` for the visited grid and queue.
