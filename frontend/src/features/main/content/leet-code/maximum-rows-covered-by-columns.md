# 2397. Maximum Rows Covered by Columns

**Difficulty:** Medium
**Category:** Array, Backtracking, Bit Manipulation, Matrix, Enumeration

## Problem

You are given a 0-indexed `m x n` binary matrix `matrix` and an integer `numSelect`, which denotes the number of distinct columns you must select from `matrix`.

Let us consider `s = {c1, c2, ...., cnumSelect}` as the set of columns selected by you. A row `i` is covered by `s` if for each cell `matrix[i][j]` where `matrix[i][j] == 1`, column `j` is in `s` or `matrix[i][j] == 0`.

You need to choose `numSelect` columns such that the number of rows that are covered is maximized.

Return the maximum number of rows that can be covered by a set of `numSelect` columns.

### Example

```
Input: matrix = [[0,0,0],[1,0,1],[0,1,1],[0,0,1]], numSelect = 2
Output: 3
Explanation: Select columns 0 and 2. Rows 0, 2, and 3 are covered.
```

## Approach

Since the number of columns is at most 12, use bitmask enumeration to try all possible combinations of `numSelect` columns. For each combination, count how many rows are fully covered (all 1s in the row are in selected columns).

## C# Solution

```csharp
public class Solution
{
    public int MaximumRows(int[][] matrix, int numSelect)
    {
        int rows = matrix.Length;
        int cols = matrix[0].Length;
        int maxCovered = 0;
        
        // Try all combinations of numSelect columns using bitmask
        for (int mask = 0; mask < (1 << cols); mask++)
        {
            if (CountBits(mask) != numSelect) continue;
            
            int coveredRows = 0;
            
            for (int i = 0; i < rows; i++)
            {
                bool covered = true;
                
                for (int j = 0; j < cols; j++)
                {
                    if (matrix[i][j] == 1 && (mask & (1 << j)) == 0)
                    {
                        covered = false;
                        break;
                    }
                }
                
                if (covered) coveredRows++;
            }
            
            maxCovered = Math.Max(maxCovered, coveredRows);
        }
        
        return maxCovered;
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

- **Time:** O(2^n * m * n) where m is the number of rows and n is the number of columns
- **Space:** O(1)
