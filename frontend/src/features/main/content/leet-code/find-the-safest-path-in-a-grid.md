# 2812. Find the Safest Path in a Grid

**Difficulty:** Medium
**Category:** Array, Binary Search, Breadth-First Search, Matrix

## Problem

You are given a 0-indexed 2D matrix `grid` of size `n × n`, where `(r, c)` represents:
- A cell containing a thief if `grid[r][c] = 1`
- An empty cell if `grid[r][c] = 0`

You start at cell `(0, 0)` and want to reach `(n - 1, n - 1)`. You can move to adjacent cells (up, down, left, right).

The safeness factor of a path is the minimum Manhattan distance from any cell in the path to any thief in the grid. Return the maximum safeness factor of all paths from `(0, 0)` to `(n - 1, n - 1)`.

### Example

```
Input: grid = [[1,0,0],[0,0,0],[0,0,1]]
Output: 0
Explanation: All paths will have safeness factor 0 since we start or end adjacent to a thief.
```

## Approach

1. Use multi-source BFS to calculate the minimum distance to any thief for each cell
2. Use binary search on the safeness factor combined with BFS/DFS to check if a path exists with at least that safeness factor
3. Return the maximum valid safeness factor

Alternatively, use a priority queue (Dijkstra-like) to maximize the minimum distance along the path.

## C# Solution

```csharp
public class Solution
{
    public int MaximumSafenessFactor(IList<IList<int>> grid)
    {
        int n = grid.Count;
        var dist = new int[n][];
        for (int i = 0; i < n; i++)
        {
            dist[i] = new int[n];
            Array.Fill(dist[i], int.MaxValue);
        }
        
        var queue = new Queue<(int, int)>();
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (grid[i][j] == 1)
                {
                    queue.Enqueue((i, j));
                    dist[i][j] = 0;
                }
            }
        }
        
        int[][] dirs = { new[] { 0, 1 }, new[] { 1, 0 }, new[] { 0, -1 }, new[] { -1, 0 } };
        
        while (queue.Count > 0)
        {
            var (r, c) = queue.Dequeue();
            foreach (var dir in dirs)
            {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] > dist[r][c] + 1)
                {
                    dist[nr][nc] = dist[r][c] + 1;
                    queue.Enqueue((nr, nc));
                }
            }
        }
        
        var pq = new PriorityQueue<(int, int), int>();
        pq.Enqueue((0, 0), -dist[0][0]);
        var visited = new bool[n, n];
        visited[0, 0] = true;
        
        while (pq.Count > 0)
        {
            pq.TryDequeue(out var pos, out int negSafeness);
            int safeness = -negSafeness;
            int r = pos.Item1;
            int c = pos.Item2;
            
            if (r == n - 1 && c == n - 1)
            {
                return safeness;
            }
            
            foreach (var dir in dirs)
            {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr, nc])
                {
                    visited[nr, nc] = true;
                    int newSafeness = Math.Min(safeness, dist[nr][nc]);
                    pq.Enqueue((nr, nc), -newSafeness);
                }
            }
        }
        
        return 0;
    }
}
```

## Complexity

- **Time:** O(n² log n) for BFS and priority queue operations
- **Space:** O(n²) for distance matrix and visited tracking
