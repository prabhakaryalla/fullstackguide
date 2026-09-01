# 2258. Escape the Spreading Fire

**Difficulty:** Hard
**Category:** Array, Binary Search, Breadth-First Search, Matrix

## Problem

You are given a 2D grid representing a building. Some cells contain fire that spreads every minute. You need to escape from the top-left to the bottom-right. You can wait at the start for some minutes before moving. Return the maximum number of minutes you can wait before starting.

### Example

```
Input: grid = [[0,2,0,0,0,0,0],[0,0,0,2,2,1,0],[0,2,0,0,1,2,0],[0,0,2,2,2,0,2],[0,0,0,0,0,0,0]]
Output: 3
```

## Approach

Use binary search on the wait time. For each candidate wait time, simulate multi-source BFS from fire sources and from the start position (after waiting). Check if you can reach the destination before the fire does.

## C# Solution

```csharp
public class Solution
{
    public int MaximumMinutes(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        int left = 0, right = m * n;
        
        while (left < right)
        {
            int mid = left + (right - left + 1) / 2;
            if (CanEscape(grid, mid))
            {
                left = mid;
            }
            else
            {
                right = mid - 1;
            }
        }
        
        return left == m * n ? 1_000_000_000 : left;
    }
    
    private bool CanEscape(int[][] grid, int wait)
    {
        int m = grid.Length, n = grid[0].Length;
        var fireTime = new int[m, n];
        var queue = new Queue<(int, int, int)>();
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                fireTime[i, j] = int.MaxValue;
                if (grid[i][j] == 1)
                {
                    queue.Enqueue((i, j, 0));
                    fireTime[i, j] = 0;
                }
            }
        }
        
        int[][] dirs = { new int[] { 0, 1 }, new int[] { 1, 0 }, new int[] { 0, -1 }, new int[] { -1, 0 } };
        
        while (queue.Count > 0)
        {
            var (r, c, t) = queue.Dequeue();
            foreach (var dir in dirs)
            {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 0 && fireTime[nr, nc] == int.MaxValue)
                {
                    fireTime[nr, nc] = t + 1;
                    queue.Enqueue((nr, nc, t + 1));
                }
            }
        }
        
        var personQueue = new Queue<(int, int, int)>();
        var visited = new bool[m, n];
        personQueue.Enqueue((0, 0, wait));
        visited[0, 0] = true;
        
        while (personQueue.Count > 0)
        {
            var (r, c, t) = personQueue.Dequeue();
            
            foreach (var dir in dirs)
            {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 0 && !visited[nr, nc])
                {
                    int arrivalTime = t + 1;
                    if (nr == m - 1 && nc == n - 1)
                    {
                        return arrivalTime <= fireTime[nr, nc];
                    }
                    if (arrivalTime < fireTime[nr, nc])
                    {
                        visited[nr, nc] = true;
                        personQueue.Enqueue((nr, nc, arrivalTime));
                    }
                }
            }
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(m * n * log(m * n))
- **Space:** O(m * n)
