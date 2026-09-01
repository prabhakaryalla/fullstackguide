# 867. Transpose Matrix

**Difficulty:** Easy
**Category:** Array, Matrix

## Problem

Given a 2D integer array `matrix`, return its transpose (rows become columns and vice versa).

### Example

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]
```

## Approach

Create a new matrix with swapped dimensions, then copy each element `matrix[r][c]` to position `[c][r]` in the result.

## C# Solution

```csharp
public class Solution
{
    public int[][] Transpose(int[][] matrix)
    {
        int rows = matrix.Length, cols = matrix[0].Length;
        var result = new int[cols][];

        for (int c = 0; c < cols; c++)
        {
            result[c] = new int[rows];
            for (int r = 0; r < rows; r++)
                result[c][r] = matrix[r][c];
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the output.
