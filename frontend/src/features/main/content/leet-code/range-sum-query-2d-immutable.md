# 304. Range Sum Query 2D - Immutable

**Difficulty:** Medium
**Category:** Array, Design, Matrix, Prefix Sum

## Problem

Given a 2D matrix `matrix`, handle multiple queries of the following type: calculate the sum of the elements inside the rectangle defined by its upper-left corner `(row1, col1)` and lower-right corner `(row2, col2)`.

### Example

```
Input:
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]], [2,1,4,3], [1,1,2,2], [1,2,2,4]]
Output:
[null, 8, 11, 12]
```

### Constraints

- `1 <= matrix.length, matrix[i].length <= 200`
- `-10^5 <= matrix[i][j] <= 10^5`
- `0 <= row1 <= row2 < matrix.length`
- `0 <= col1 <= col2 < matrix[0].length`
- At most `10^4` calls will be made to `SumRegion`.

## Approach

Build a 2D prefix-sum table where each cell stores the sum of the rectangle from the top-left corner to that cell, using inclusion-exclusion to avoid recomputation. Each region query then combines four prefix-sum lookups in constant time.

## C# Solution

```csharp
public class NumMatrix
{
    private readonly int[,] prefixSums;

    public NumMatrix(int[][] matrix)
    {
        int rows = matrix.Length;
        int cols = rows > 0 ? matrix[0].Length : 0;
        prefixSums = new int[rows + 1, cols + 1];

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                prefixSums[r + 1, c + 1] = matrix[r][c] + prefixSums[r, c + 1]
                    + prefixSums[r + 1, c] - prefixSums[r, c];
            }
        }
    }

    public int SumRegion(int row1, int col1, int row2, int col2)
    {
        return prefixSums[row2 + 1, col2 + 1] - prefixSums[row1, col2 + 1]
            - prefixSums[row2 + 1, col1] + prefixSums[row1, col1];
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` construction, `O(1)` per `SumRegion` query.
- **Space:** `O(rows * cols)` for the prefix-sum table.
