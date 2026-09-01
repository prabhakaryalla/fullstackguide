# 2290. Minimum Obstacle Removal to Reach Corner

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Graph, Heap (Priority Queue), Matrix, Shortest Path

## Problem

You are given a 0-indexed 2D integer array `grid` of size `m x n`. Each cell has one of two values:

- `0` represents an empty cell
- `1` represents an obstacle that may be removed

You can move up, down, left, or right from and to an empty cell.

Return the minimum number of obstacles to remove so you can move from the upper left corner `(0, 0)` to the lower right corner `(m - 1, n - 1)`.

### Example

```
Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
Output: 2
Explanation: Remove obstacles at (0,1) and (0,2) to create a path.
```

## Approach

Use 0-1 BFS or Dijkstra's algorithm. Treat this as a shortest path problem where moving to a cell with value 0 has cost 0, and moving to a cell with value 1 has cost 1. Use a deque for 0-1 BFS: add 0-cost moves to the front and 1-cost moves to the back.

## C# Solution

```csharp
public class Solution
{
    public int MinimumObstacles(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        int[][] dist = new int[m][];
        for (int i = 0; i < m; i++)
        {
            dist[i] = new int[n];
            Array.Fill(dist[i], int.MaxValue);
        }
        
        var deque = new LinkedList<(int, int)>();
        deque.AddFirst((0, 0));
        dist[0][0] = 0;
        
        int[][] dirs = new int[][] { new int[] {0,1}, new int[] {1,0}, new int[] {0,-1}, new int[] {-1,0} };
        
        while (deque.Count > 0)
        {
            var (r, c) = deque.First.Value;
            deque.RemoveFirst();
            
            foreach (var dir in dirs)
            {
                int nr = r + dir[0];
                int nc = c + dir[1];
                
                if (nr >= 0 && nr < m && nc >= 0 && nc < n)
                {
                    int newDist = dist[r][c] + grid[nr][nc];
                    
                    if (newDist < dist[nr][nc])
                    {
                        dist[nr][nc] = newDist;
                        
                        if (grid[nr][nc] == 0)
                        {
                            deque.AddFirst((nr, nc));
                        }
                        else
                        {
                            deque.AddLast((nr, nc));
                        }
                    }
                }
            }
        }
        
        return dist[m - 1][n - 1];
    }
}
```

## Complexity

- **Time:** O(m * n) using 0-1 BFS
- **Space:** O(m * n) for the distance array and deque
