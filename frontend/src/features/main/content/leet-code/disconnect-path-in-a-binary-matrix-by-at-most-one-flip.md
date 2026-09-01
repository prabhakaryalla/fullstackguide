# 2556. Disconnect Path in a Binary Matrix by at Most One Flip

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix, Depth-First Search, Breadth-First Search

## Problem

You are given a 0-indexed `m x n` binary matrix `grid`. You can move from a cell `(row, col)` to any of the cells `(row + 1, col)` or `(row, col + 1)`.

Return `true` if there is a way to flip at most one cell (changing 0 to 1 or 1 to 0) such that there is no path from the top-left corner `(0, 0)` to the bottom-right corner `(m - 1, n - 1)`.

### Example

```
Input: grid = [[1,1,1],[1,0,0],[1,1,1]]
Output: true
Explanation: Flip grid[1][1] from 0 to 1. This blocks the path.

Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: false
Explanation: Cannot disconnect by flipping one cell.
```

## Approach

1. Check if there's initially a path from `(0,0)` to `(m-1,n-1)` using BFS/DFS
2. If no path exists, return true (already disconnected)
3. Find a path and mark it
4. Try flipping each cell on the path and check if another path exists
5. If flipping any cell disconnects, return true
6. Otherwise, return false

Alternatively, find if there are at least 2 edge-disjoint paths. If only one path exists (through a critical cell), flipping that cell disconnects.

## C# Solution

```csharp
public class Solution
{
    public bool IsPossibleToCutPath(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        
        // Find first path
        if (!HasPath(grid, m, n))
            return true;
        
        // Restore start and end (they were marked in HasPath)
        grid[0][0] = 1;
        grid[m - 1][n - 1] = 1;
        
        // Check if second path exists
        if (!HasPath(grid, m, n))
            return true;
        
        return false;
    }
    
    private bool HasPath(int[][] grid, int m, int n)
    {
        var queue = new Queue<(int, int)>();
        queue.Enqueue((0, 0));
        grid[0][0] = 0; // Mark as visited
        
        while (queue.Count > 0)
        {
            var (row, col) = queue.Dequeue();
            
            if (row == m - 1 && col == n - 1)
                return true;
            
            if (row + 1 < m && grid[row + 1][col] == 1)
            {
                grid[row + 1][col] = 0;
                queue.Enqueue((row + 1, col));
            }
            
            if (col + 1 < n && grid[row][col + 1] == 1)
            {
                grid[row][col + 1] = 0;
                queue.Enqueue((row, col + 1));
            }
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(m × n) for two BFS traversals
- **Space:** O(m × n) for the queue
