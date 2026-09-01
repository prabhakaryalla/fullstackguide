# 2482. Difference Between Ones and Zeros in Row and Column

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation

## Problem

You are given a binary matrix `grid` of size `m x n`.

A matrix `diff` is created where:
- `diff[i][j] = onesRow[i] + onesCol[j] - zerosRow[i] - zerosCol[j]`

Where:
- `onesRow[i]` is the number of ones in row `i`
- `onesCol[j]` is the number of ones in column `j`
- `zerosRow[i]` is the number of zeros in row `i`
- `zerosCol[j]` is the number of zeros in column `j`

Return the matrix `diff`.

### Example

```
Input: grid = [[0,1,1],[1,0,1],[0,0,1]]
Output: [[0,0,4],[0,0,4],[-2,-2,2]]
```

## Approach

First, precompute the counts of ones for each row and each column. Since we know the dimensions, we can derive the zeros count as `n - onesInRow` for rows and `m - onesInCol` for columns.

Then for each cell `[i][j]`, compute the difference using the formula. The key optimization is preprocessing these counts once rather than recalculating for each cell.

## C# Solution

```csharp
public class Solution
{
    public int[][] OnesMinusZeros(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        
        int[] onesRow = new int[m];
        int[] onesCol = new int[n];
        
        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                onesRow[i] += grid[i][j];
                onesCol[j] += grid[i][j];
            }
        }
        
        int[][] diff = new int[m][];
        for (int i = 0; i < m; i++)
        {
            diff[i] = new int[n];
            for (int j = 0; j < n; j++)
            {
                int zerosRow = n - onesRow[i];
                int zerosCol = m - onesCol[j];
                diff[i][j] = onesRow[i] + onesCol[j] - zerosRow - zerosCol;
            }
        }
        
        return diff;
    }
}
```

## Complexity

- **Time:** O(m × n) for preprocessing and computing the result
- **Space:** O(m + n) for the count arrays
