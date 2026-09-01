# 766. Toeplitz Matrix

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given an `m x n` matrix, return `true` if it is a Toeplitz matrix — every diagonal running from top-left to bottom-right has the same value.

### Example

```
Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true
```

## Approach

A matrix is Toeplitz exactly when every cell (except those in the first row or first column) matches the cell diagonally above-left of it. Check this condition directly for every applicable cell.

## C# Solution

```csharp
public class Solution
{
    public bool IsToeplitzMatrix(int[][] matrix)
    {
        int rows = matrix.Length, cols = matrix[0].Length;

        for (int r = 1; r < rows; r++)
        {
            for (int c = 1; c < cols; c++)
            {
                if (matrix[r][c] != matrix[r - 1][c - 1]) return false;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(1)` extra.
