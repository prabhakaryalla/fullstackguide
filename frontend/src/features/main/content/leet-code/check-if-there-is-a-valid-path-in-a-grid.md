# 1391. Check if There is a Valid Path in a Grid

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Union Find, Matrix

## Problem

Given a grid where each cell contains one of 6 street types (each connecting a specific pair of the four directions), return `true` if there is a valid path from the top-left to the bottom-right cell that only moves between cells whose street pieces connect.

### Example

```
Input: grid = [[2,4,3],[6,5,2]]
Output: true
```

## Approach

Map each street type to the set of directions it connects. Run a breadth-first search from `(0,0)`: from each cell, only move to a neighbor if the current cell's street connects toward that neighbor **and** the neighbor's street connects back toward the current cell. Return whether the bottom-right cell is ever reached.

## C# Solution

```csharp
public class Solution
{
    // Directions: 0=up, 1=right, 2=down, 3=left
    private static readonly Dictionary<int, int[]> Connections = new()
    {
        [1] = new[] { 1, 3 },
        [2] = new[] { 0, 2 },
        [3] = new[] { 2, 3 },
        [4] = new[] { 1, 2 },
        [5] = new[] { 0, 3 },
        [6] = new[] { 0, 1 },
    };

    public bool HasValidPath(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        var visited = new bool[m, n];
        var queue = new Queue<(int r, int c)>();
        queue.Enqueue((0, 0));
        visited[0, 0] = true;

        int[] dr = { -1, 0, 1, 0 };
        int[] dc = { 0, 1, 0, -1 };

        while (queue.Count > 0)
        {
            var (r, c) = queue.Dequeue();
            if (r == m - 1 && c == n - 1) return true;

            foreach (int dir in Connections[grid[r][c]])
            {
                int nr = r + dr[dir], nc = c + dc[dir];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr, nc]) continue;

                int opposite = (dir + 2) % 4;
                if (Connections[grid[nr][nc]].Contains(opposite))
                {
                    visited[nr, nc] = true;
                    queue.Enqueue((nr, nc));
                }
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(m * n)`.
- **Space:** `O(m * n)` for the visited grid and queue.
