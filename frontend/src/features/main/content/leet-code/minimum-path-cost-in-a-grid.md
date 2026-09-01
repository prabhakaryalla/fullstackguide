# 2304. Minimum Path Cost in a Grid

**Difficulty:** Medium
**Category:** Dynamic Programming, Array, Matrix

## Problem

You are given a 0-indexed `m x n` integer matrix `grid` consisting of distinct integers from `0` to `m * n - 1`. You can move in this matrix from a cell to any cell in the next row. That is, if you are in cell `(x, y)` such that `x < m - 1`, you can move to any of the cells `(x + 1, 0)`, `(x + 1, 1)`, ..., `(x + 1, n - 1)`.

You are also given an integer array `moveCost` of length `m * n` where `moveCost[i]` is the cost of moving from a cell with value `i` to any cell in the next row.

Return the minimum cost to start at any cell in the first row and reach any cell in the last row.

### Example

```
Input: grid = [[5,3],[4,0],[2,1]], moveCost = [9,8,1,7,0,3,4,2]
Output: 5
Explanation: Start at cell (0,1) with value 3, move to (1,1) with cost 8, then to (2,1) with cost 0.
Total = 3 + 8 + 1 + 0 = 12, but minimum path is 5.
```

## Approach

Use dynamic programming where `dp[i][j]` represents the minimum cost to reach cell `(i, j)`. For each cell in the current row, compute the minimum cost to reach any cell in the next row by considering the move cost.

## C# Solution

```csharp
public class Solution
{
    public int MinPathCost(int[][] grid, int[] moveCost)
    {
        int m = grid.Length, n = grid[0].Length;
        var dp = new int[m, n];
        
        for (int j = 0; j < n; j++)
        {
            dp[0, j] = grid[0][j];
        }
        
        for (int i = 0; i < m - 1; i++)
        {
            for (int j = 0; j < n; j++)
            {
                int cellValue = grid[i][j];
                int costSoFar = dp[i, j];
                
                for (int k = 0; k < n; k++)
                {
                    int newCost = costSoFar + moveCost[cellValue] + grid[i + 1][k];
                    if (i == 0 || newCost < dp[i + 1, k])
                    {
                        dp[i + 1, k] = newCost;
                    }
                    else
                    {
                        dp[i + 1, k] = Math.Min(dp[i + 1, k], newCost);
                    }
                }
            }
        }
        
        int result = int.MaxValue;
        for (int j = 0; j < n; j++)
        {
            result = Math.Min(result, dp[m - 1, j]);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m * n^2)
- **Space:** O(m * n)
