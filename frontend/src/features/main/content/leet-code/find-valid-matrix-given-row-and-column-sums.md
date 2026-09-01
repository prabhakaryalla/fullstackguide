# 1605. Find Valid Matrix Given Row and Column Sums

**Difficulty:** Medium
**Category:** Array, Greedy, Matrix

## Problem

Given `rowSum` and `colSum` arrays of nonnegative integers describing the sum of each row and column of an unknown nonnegative integer matrix, construct any matrix that satisfies both constraints.

### Example

```
Input: rowSum = [3,8], colSum = [4,7]
Output: [[3,0],[1,7]]
```

## Approach

Greedily fill each cell `(i, j)` with `min(rowSum[i], colSum[j])`, then subtract that amount from both the remaining row sum and column sum. This always leaves a feasible remainder because the total row sum equals the total column sum, guaranteeing a valid matrix is produced by the time the last cell is filled.

## C# Solution

```csharp
public class Solution
{
    public int[][] RestoreMatrix(int[] rowSum, int[] colSum)
    {
        int rows = rowSum.Length;
        int cols = colSum.Length;
        int[][] matrix = new int[rows][];

        for (int i = 0; i < rows; i++)
        {
            matrix[i] = new int[cols];
        }

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                int value = Math.Min(rowSum[i], colSum[j]);
                matrix[i][j] = value;
                rowSum[i] -= value;
                colSum[j] -= value;
            }
        }

        return matrix;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the output matrix.
