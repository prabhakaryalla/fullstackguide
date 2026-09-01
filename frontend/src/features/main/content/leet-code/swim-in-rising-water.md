# 778. Swim in Rising Water

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Union Find, Heap, Matrix

## Problem

Given an `n x n` grid where `grid[r][c]` is the elevation at that cell, water rises over time and you can swim between adjacent cells only if both have elevation `<=` the current water level. Return the minimum time (water level) at which you can travel from the top-left cell to the bottom-right cell.

### Example

```
Input: grid = [[0,2],[1,3]]
Output: 3
```

## Approach

This is equivalent to finding the path from the start to the end that minimizes the maximum elevation encountered along the way, solved with a Dijkstra-like approach using a min-heap keyed by cell elevation. Always expand the frontier cell with the smallest elevation seen so far, tracking the maximum elevation encountered on the path taken (the "time" so far), until the bottom-right cell is reached.

## C# Solution

```csharp
public class Solution
{
    public int SwimInWater(int[][] grid)
    {
        int n = grid.Length;
        var visited = new bool[n, n];
        var heap = new PriorityQueue<(int, int), int>();
        heap.Enqueue((0, 0), grid[0][0]);
        visited[0, 0] = true;

        int[][] directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };
        int result = 0;

        while (heap.Count > 0)
        {
            heap.TryDequeue(out var cell, out var time);
            result = Math.Max(result, time);

            var (r, c) = cell;
            if (r == n - 1 && c == n - 1) return result;

            foreach (var dir in directions)
            {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr < 0 || nr >= n || nc < 0 || nc >= n || visited[nr, nc]) continue;

                visited[nr, nc] = true;
                heap.Enqueue((nr, nc), grid[nr][nc]);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^2 log n)`.
- **Space:** `O(n^2)` for the visited grid and heap.
