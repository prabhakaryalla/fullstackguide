# 2503. Maximum Number of Points From Grid Queries

**Difficulty:** Hard
**Category:** Array, Breadth-First Search, Union Find, Sorting, Heap (Priority Queue)

## Problem

You are given an `m x n` integer matrix `grid` and an array `queries` of size `k`. For the `i-th` query, you start at the top-left cell `(0, 0)` with a value strictly greater than `grid[0][0]`. From any cell, you can move to an adjacent cell (up, down, left, or right) if the value in the new cell is strictly less than your current value.

For each query `queries[i]`, return the maximum number of cells you can visit starting from `(0, 0)`.

### Example

```
Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
Output: [5,8,1]
Explanation: For query value 5, we can visit 5 cells. For query value 6, we can visit 8 cells. For query value 2, we can visit only 1 cell.
```

## Approach

Sort queries while keeping track of original indices. Use a priority queue (min-heap) starting from `(0,0)` to explore cells in increasing order of their values. For each query value, expand the reachable region to include all cells with values less than the query value. Process queries in sorted order to reuse previous computation.

## C# Solution

```csharp
public class Solution
{
    public int[] MaxPoints(int[][] grid, int[] queries)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        int k = queries.Length;
        
        var sortedQueries = queries.Select((q, i) => (q, i)).OrderBy(x => x.q).ToArray();
        int[] result = new int[k];
        
        PriorityQueue<(int row, int col), int> pq = new PriorityQueue<(int, int), int>();
        bool[,] visited = new bool[m, n];
        pq.Enqueue((0, 0), grid[0][0]);
        visited[0, 0] = true;
        
        int count = 0;
        int[] dx = {0, 0, 1, -1};
        int[] dy = {1, -1, 0, 0};
        
        foreach (var (queryVal, idx) in sortedQueries)
        {
            while (pq.Count > 0 && pq.Peek().Priority < queryVal)
            {
                pq.TryDequeue(out var cell, out _);
                count++;
                
                for (int d = 0; d < 4; d++)
                {
                    int nr = cell.row + dx[d];
                    int nc = cell.col + dy[d];
                    
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr, nc])
                    {
                        visited[nr, nc] = true;
                        pq.Enqueue((nr, nc), grid[nr][nc]);
                    }
                }
            }
            result[idx] = count;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O((m × n + k) × log(m × n)) for heap operations
- **Space:** O(m × n) for visited array and priority queue
