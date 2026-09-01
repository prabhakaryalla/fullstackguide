# 566. Reshape the Matrix

**Difficulty:** Easy
**Category:** Array, Matrix, Simulation

## Problem

Given a matrix `mat` and two integers `r` and `c` representing the desired number of rows and columns, reshape the matrix into a new `r x c` matrix using the same elements in the same row-traversal order. Return the original matrix if the reshape is not possible.

### Example

```
Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]
```

### Constraints

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 100`
- `1 <= r, c <= 300`

## Approach

Reshaping is only possible when the total element count matches (`rows * cols == r * c`). Treat the original matrix as a flat sequence read in row-major order, and map each flat index `k` to both the original position (`k / cols, k % cols`) and the new position (`k / c, k % c`), copying elements accordingly.

## C# Solution

```csharp
public class Solution
{
    public int[][] MatrixReshape(int[][] mat, int r, int c)
    {
        int rows = mat.Length, cols = mat[0].Length;
        if (rows * cols != r * c) return mat;

        var result = new int[r][];
        for (int i = 0; i < r; i++)
            result[i] = new int[c];

        for (int i = 0; i < rows * cols; i++)
        {
            result[i / c][i % c] = mat[i / cols][i % cols];
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the output matrix.
