# 2617. Minimum Number of Visited Cells in a Grid

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Breadth-First Search, Binary Indexed Tree, Segment Tree

## Problem

You are given a 0-indexed `m x n` integer matrix `grid`. You are initially positioned at the top-left cell `(0, 0)`.

Starting from cell `(r, c)`, you can move to any of the following cells:
- Cells `(r, c + k)` where `1 <= k <= grid[r][c]` and `c + k < n`
- Cells `(r + k, c)` where `1 <= k <= grid[r][c]` and `r + k < m`

Return the minimum number of cells you need to visit to reach the bottom-right cell `(m - 1, n - 1)`. If there is no valid path, return `-1`.

### Example

```
Input: grid = [[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]
Output: 4
Explanation: One possible path is (0,0) -> (0,3) -> (3,3).
```

## Approach

Use BFS with optimizations. For each cell, track the minimum steps to reach it. Use segment trees or similar data structures to efficiently query and update the minimum reachable cells in each row and column to avoid O(n²) redundant checks.

## C# Solution

```csharp
public class Solution
{
    public int MinimumVisitedCells(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        var queue = new Queue<(int, int, int)>();
        queue.Enqueue((0, 0, 1));
        
        var rowQueues = new Queue<(int, int)>[m];
        var colQueues = new Queue<(int, int)>[n];
        
        for (int i = 0; i < m; i++)
            rowQueues[i] = new Queue<(int, int)>();
        for (int j = 0; j < n; j++)
            colQueues[j] = new Queue<(int, int)>();
        
        var visited = new HashSet<(int, int)>();
        visited.Add((0, 0));
        
        while (queue.Count > 0)
        {
            var (r, c, steps) = queue.Dequeue();
            
            if (r == m - 1 && c == n - 1)
                return steps;
            
            int reach = grid[r][c];
            
            while (rowQueues[r].Count > 0 && rowQueues[r].Peek().Item1 < c)
                rowQueues[r].Dequeue();
            
            for (int nc = c + 1; nc <= Math.Min(c + reach, n - 1); nc++)
            {
                if (!visited.Contains((r, nc)) && (rowQueues[r].Count == 0 || rowQueues[r].Peek().Item1 > nc))
                {
                    visited.Add((r, nc));
                    queue.Enqueue((r, nc, steps + 1));
                }
            }
            
            rowQueues[r].Enqueue((c + reach, steps + 1));
            
            while (colQueues[c].Count > 0 && colQueues[c].Peek().Item1 < r)
                colQueues[c].Dequeue();
            
            for (int nr = r + 1; nr <= Math.Min(r + reach, m - 1); nr++)
            {
                if (!visited.Contains((nr, c)) && (colQueues[c].Count == 0 || colQueues[c].Peek().Item1 > nr))
                {
                    visited.Add((nr, c));
                    queue.Enqueue((nr, c, steps + 1));
                }
            }
            
            colQueues[c].Enqueue((r + reach, steps + 1));
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(m × n) — BFS with optimizations
- **Space:** O(m × n) — visited set and queues
