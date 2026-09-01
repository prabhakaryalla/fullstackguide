# 2577. Minimum Time to Visit a Cell In a Grid

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Graph, Heap (Priority Queue), Matrix, Shortest Path

## Problem

You are given an `m x n` matrix `grid` where each cell has a non-negative integer value. You start at the top-left cell `(0, 0)` at time `0`.

When you visit a cell, you can only enter if the current time is greater than or equal to the value in that cell. You can move to an adjacent cell in 1 unit of time.

You can wait in your current cell before moving to the next one.

Return the minimum time to reach the bottom-right cell `(m - 1, n - 1)`. If it's impossible, return `-1`.

### Example

```
Input: grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
Output: 7
Explanation: Path with minimum time
```

## Approach

Use Dijkstra's algorithm with a priority queue:

1. Track `(time, row, col)` in the priority queue (min-heap by time)
2. For each cell, try moving to adjacent cells
3. If we can't enter a cell yet (current_time < grid[r][c]), we must wait:
   - If the difference is odd, we can reach exactly at grid[r][c]
   - If even, we need to wait 1 more time unit (due to back-and-forth movement constraint)
4. Special case: If both grid[0][1] > 1 and grid[1][0] > 1, it's impossible to leave the start

## C# Solution

```csharp
public class Solution
{
    public int MinimumTime(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        
        if (grid[0][1] > 1 && grid[1][0] > 1)
            return -1;
        
        var pq = new PriorityQueue<(int time, int r, int c), int>();
        var visited = new bool[m, n];
        int[][] dirs = { new[] {0,1}, new[] {1,0}, new[] {0,-1}, new[] {-1,0} };
        
        pq.Enqueue((0, 0, 0), 0);
        
        while (pq.Count > 0)
        {
            var (time, r, c) = pq.Dequeue();
            
            if (r == m - 1 && c == n - 1)
                return time;
            
            if (visited[r, c])
                continue;
            visited[r, c] = true;
            
            foreach (var dir in dirs)
            {
                int nr = r + dir[0], nc = c + dir[1];
                
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr, nc])
                    continue;
                
                int nextTime = time + 1;
                if (nextTime < grid[nr][nc])
                {
                    int wait = grid[nr][nc] - nextTime;
                    nextTime = grid[nr][nc] + (wait % 2);
                }
                
                pq.Enqueue((nextTime, nr, nc), nextTime);
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(m × n × log(m × n)) for priority queue operations
- **Space:** O(m × n) for visited tracking and queue
