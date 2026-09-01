# 2684. Maximum Number of Moves in a Grid

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

You are given a 0-indexed `m x n` matrix `grid` consisting of positive integers.

You can start at any cell in the first column and traverse the grid as follows:

- From cell `(row, col)`, you can move to any of the cells: `(row - 1, col + 1)`, `(row, col + 1)`, or `(row + 1, col + 1)` such that the value of the cell you move to is strictly greater than the value of the current cell.

Return the maximum number of moves you can perform.

### Example

```
Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
Output: 3
Explanation: Starting from (0,0), one path is: (0,0) -> (0,1) -> (1,2) -> (2,3).

Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
Output: 0
Explanation: No valid moves from any cell in the first column.
```

## Approach

Use dynamic programming with memoization. For each cell, compute the maximum moves from that cell by trying all three possible next moves. Start from each cell in the first column and track the maximum.

Alternatively, use bottom-up DP iterating column by column from right to left.

## C# Solution

```csharp
public class Solution
{
    public int MaxMoves(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        int[,] dp = new int[m, n];
        
        for (int col = n - 2; col >= 0; col--)
        {
            for (int row = 0; row < m; row++)
            {
                int maxMove = 0;
                
                if (row > 0 && grid[row][col] < grid[row - 1][col + 1])
                {
                    maxMove = Math.Max(maxMove, 1 + dp[row - 1, col + 1]);
                }
                
                if (grid[row][col] < grid[row][col + 1])
                {
                    maxMove = Math.Max(maxMove, 1 + dp[row, col + 1]);
                }
                
                if (row < m - 1 && grid[row][col] < grid[row + 1][col + 1])
                {
                    maxMove = Math.Max(maxMove, 1 + dp[row + 1, col + 1]);
                }
                
                dp[row, col] = maxMove;
            }
        }
        
        int result = 0;
        for (int row = 0; row < m; row++)
        {
            result = Math.Max(result, dp[row, 0]);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n) for the DP table
