# 3742. Maximum Path Score in a Grid

**Difficulty:** Medium
**Category:** Dynamic Programming, Matrix

## Problem

Given an `m x n` grid of integers, find a path from the top-left cell to the bottom-right cell, moving only right or down at each step, that maximizes the sum of the visited cell values. Return that maximum sum.

### Example

grid = [[1,3,1],[1,5,1],[4,2,1]] → the path 1→3→5→2→1 sums to 12, which is the maximum.

## Approach

Standard grid dynamic programming: `dp[i][j]` is the best score reaching cell `(i, j)`, computed as `grid[i][j] + max(dp[i-1][j], dp[i][j-1])`, with the first row and column filled by simple accumulation since only one direction reaches them.

## C# Solution

```csharp
public class Solution 
{
    public int MaxPathScore(int[][] grid) 
    {
        int m = grid.Length, n = grid[0].Length;
        int[][] dp = new int[m][];
        for (int i = 0; i < m; i++) dp[i] = new int[n];

        dp[0][0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
        for (int i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];

        for (int i = 1; i < m; i++) 
        {
            for (int j = 1; j < n; j++) 
            {
                dp[i][j] = grid[i][j] + Math.Max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
