# 2174. Remove All Ones With Row and Column Flips II

**Difficulty:** Medium
**Category:** Array, Matrix, Greedy

## Problem

You are given a binary matrix `grid`. In one operation, you can flip all values in a row or column.

Return the minimum number of operations needed to remove all ones from the matrix.

### Example

```
Input: grid = [[1,1,0],[0,0,0],[0,1,0]]
Output: 2
Explanation: Flip row 0 and column 1 to clear all ones.
```

## Approach

This is an optimization problem. Try different combinations of row and column flips. Since flipping the same row/column twice cancels out, we only need to consider whether each row/column is flipped or not (2^(m+n) possibilities for an m×n grid).

For small grids, try all combinations. For larger grids, use greedy heuristics or observation that the minimum operations equals the smaller of (number of rows with ones) and (number of columns with ones) in many cases.

## C# Solution

```csharp
public class Solution
{
    public int RemoveOnes(int[][] grid)
    {
        int m = grid.Length;
        int n = grid[0].Length;
        int minOps = m + n;
        
        // Try all combinations of row flips (2^m possibilities)
        for (int rowMask = 0; rowMask < (1 << m); rowMask++)
        {
            var tempGrid = new int[m][];
            for (int i = 0; i < m; i++)
            {
                tempGrid[i] = (int[])grid[i].Clone();
                if ((rowMask & (1 << i)) != 0)
                {
                    for (int j = 0; j < n; j++)
                        tempGrid[i][j] ^= 1;
                }
            }
            
            // Count columns that need flipping
            int colFlips = 0;
            for (int j = 0; j < n; j++)
            {
                bool hasOne = false;
                for (int i = 0; i < m; i++)
                {
                    if (tempGrid[i][j] == 1)
                    {
                        hasOne = true;
                        break;
                    }
                }
                if (hasOne) colFlips++;
            }
            
            int rowFlips = CountBits(rowMask);
            minOps = Math.Min(minOps, rowFlips + colFlips);
        }
        
        return minOps;
    }
    
    private int CountBits(int n)
    {
        int count = 0;
        while (n > 0)
        {
            count += n & 1;
            n >>= 1;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(2^m * m * n)
- **Space:** O(m * n) for temporary grid
