# 2146. K Highest Ranked Items Within a Price Range

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Sorting, Heap (Priority Queue), Matrix

## Problem

You are given a 0-indexed 2D integer array `grid` of size `m x n` representing a map of a store. You start at position `start = [row, col]`.

Return the positions of the `k` highest ranked items within the price range `[low, high]`, ranked by:
1. Distance from start (ascending)
2. Price (ascending)
3. Row number (ascending)
4. Column number (ascending)

### Example

```
Input: grid = [[1,2,0,1],[1,3,0,1],[0,2,5,1]], pricing = [2,5], start = [0,0], k = 3
Output: [[0,1],[1,1],[2,1]]
```

## Approach

Use BFS to explore cells by distance from start. Collect all items within the price range along with their distance. Sort collected items by the ranking criteria, then return the top k positions.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> HighestRankedKItems(int[][] grid, int[] pricing, int[] start, int k)
    {
        int m = grid.Length, n = grid[0].Length;
        int low = pricing[0], high = pricing[1];
        
        var items = new List<(int dist, int price, int row, int col)>();
        var visited = new bool[m, n];
        var queue = new Queue<(int r, int c, int dist)>();
        
        queue.Enqueue((start[0], start[1], 0));
        visited[start[0], start[1]] = true;
        
        int[] dr = {0, 0, 1, -1};
        int[] dc = {1, -1, 0, 0};
        
        while (queue.Count > 0)
        {
            var (r, c, dist) = queue.Dequeue();
            int price = grid[r][c];
            
            if (price >= low && price <= high)
            {
                items.Add((dist, price, r, c));
            }
            
            for (int i = 0; i < 4; i++)
            {
                int nr = r + dr[i];
                int nc = c + dc[i];
                
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && 
                    !visited[nr, nc] && grid[nr][nc] > 0)
                {
                    visited[nr, nc] = true;
                    queue.Enqueue((nr, nc, dist + 1));
                }
            }
        }
        
        // Sort by ranking criteria
        items.Sort((a, b) => {
            if (a.dist != b.dist) return a.dist.CompareTo(b.dist);
            if (a.price != b.price) return a.price.CompareTo(b.price);
            if (a.row != b.row) return a.row.CompareTo(b.row);
            return a.col.CompareTo(b.col);
        });
        
        var result = new List<IList<int>>();
        for (int i = 0; i < Math.Min(k, items.Count); i++)
        {
            result.Add(new List<int> { items[i].row, items[i].col });
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m * n * log(m * n)) for BFS and sorting
- **Space:** O(m * n) for visited array and queue
