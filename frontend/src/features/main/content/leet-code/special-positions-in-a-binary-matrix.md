# 1582. Special Positions in a Binary Matrix

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given an `m x n` binary matrix `mat`, a cell `(i, j)` is "special" if `mat[i][j] == 1` and every other element in row `i` and column `j` is `0`. Return the count of special positions.

### Example

```
Input: mat = [[1,0,0],[0,0,1],[1,0,0]]
Output: 1
```

## Approach

Precompute the sum of each row and the sum of each column. A `1` at `(i, j)` is special exactly when its row sum and its column sum are both `1` (meaning it's the only `1` in that row and that column).

## C# Solution

```csharp
public class Solution
{
    public int NumSpecial(int[][] mat)
    {
        int rows = mat.Length;
        int cols = mat[0].Length;
        int[] rowSum = new int[rows];
        int[] colSum = new int[cols];

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                rowSum[r] += mat[r][c];
                colSum[c] += mat[r][c];
            }
        }

        int count = 0;
        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (mat[r][c] == 1 && rowSum[r] == 1 && colSum[c] == 1)
                {
                    count++;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — two passes over the matrix.
- **Space:** `O(rows + cols)` for the row/column sum arrays.
