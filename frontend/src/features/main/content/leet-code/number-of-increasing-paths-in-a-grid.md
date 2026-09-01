# 2440. Number of Increasing Paths in a Grid

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Depth-First Search, Breadth-First Search, Graph, Topological Sort, Memoization, Matrix

## Problem

You are given an `m x n` integer matrix `grid`, where you can move from a cell to any adjacent cell in all 4 directions.

Return the number of strictly increasing paths in the grid such that you can start from any cell and end at any cell. Since the answer may be very large, return it modulo 10^9 + 7.

### Example

```
Input: grid = [[1,1],[3,4]]
Output: 8
Explanation: The 8 strictly increasing paths are:
- Paths with length 1: [1], [1], [3], [4].
- Paths with length 2: [1,3], [1,4], [3,4].
- Paths with length 3: [1,3,4].
Note that the path [1,1,3] and [1,1,4] are not valid because you cannot stay on the same cell.
```

## Approach

Use DFS with memoization. For each cell, compute the number of increasing paths starting from that cell by recursively exploring all four directions and summing results where the next cell has a larger value.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    private int[][] directions = new int[][] { new int[] {0, 1}, new int[] {0, -1}, new int[] {1, 0}, new int[] {-1, 0} };
    
    public int CountPaths(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        int[][] dp = new int[m][];
        
        for (int i = 0; i < m; i++)
        {
            dp[i] = new int[n];
            Array.Fill(dp[i], -1);
        }
        
        long total = 0;
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                total = (total + DFS(grid, i, j, dp)) % MOD;
            }
        }
        
        return (int)total;
    }
    
    private int DFS(int[][] grid, int i, int j, int[][] dp)
    {
        if (dp[i][j] != -1) return dp[i][j];
        
        long count = 1;
        
        foreach (var dir in directions)
        {
            int ni = i + dir[0];
            int nj = j + dir[1];
            
            if (ni >= 0 && ni < grid.Length && nj >= 0 && nj < grid[0].Length && grid[ni][nj] > grid[i][j])
            {
                count = (count + DFS(grid, ni, nj, dp)) % MOD;
            }
        }
        
        dp[i][j] = (int)count;
        return dp[i][j];
    }
}
```

## Complexity

- **Time:** O(m × n) where m and n are the grid dimensions
- **Space:** O(m × n) for the memoization array
