# 308. Range Sum Query 2D - Mutable

**Difficulty:** Hard
**Category:** Design, Binary Indexed Tree, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a 2D matrix, handle multiple queries: update the value at a given cell, and calculate the sum of elements inside a given rectangle. Implement the `NumMatrix` class with `Update(row, col, val)` and `SumRegion(row1, col1, row2, col2)`.

### Example

```
Input:
["NumMatrix", "sumRegion", "update", "sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]], [2,1,4,3], [3,2,2], [2,1,4,3]]
Output:
[null, 8, null, 10]
```

### Constraints

- `1 <= rows, cols <= 200`
- `-1000 <= matrix[i][j] <= 1000`
- At most `10^4` calls total to `Update` and `SumRegion`.

## Approach

Use a 2D Binary Indexed Tree (Fenwick Tree) to support point updates and 2D prefix-sum queries in logarithmic time along both dimensions. `Update` applies the delta between old and new values across `O(log rows * log cols)` tree nodes, and `SumRegion` combines four 2D prefix-sum queries using inclusion-exclusion.

## C# Solution

```csharp
public class NumMatrix
{
    private readonly int[,] tree;
    private readonly int[][] matrix;
    private readonly int rows, cols;

    public NumMatrix(int[][] matrix)
    {
        rows = matrix.Length;
        cols = rows > 0 ? matrix[0].Length : 0;
        this.matrix = new int[rows][];
        for (int i = 0; i < rows; i++)
            this.matrix[i] = new int[cols];

        tree = new int[rows + 1, cols + 1];

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                Update(r, c, matrix[r][c]);
    }

    public void Update(int row, int col, int val)
    {
        int delta = val - matrix[row][col];
        matrix[row][col] = val;

        for (int r = row + 1; r <= rows; r += r & (-r))
            for (int c = col + 1; c <= cols; c += c & (-c))
                tree[r, c] += delta;
    }

    public int SumRegion(int row1, int col1, int row2, int col2)
    {
        return Query(row2 + 1, col2 + 1) - Query(row1, col2 + 1) - Query(row2 + 1, col1) + Query(row1, col1);
    }

    private int Query(int row, int col)
    {
        int sum = 0;
        for (int r = row; r > 0; r -= r & (-r))
            for (int c = col; c > 0; c -= c & (-c))
                sum += tree[r, c];

        return sum;
    }
}
```

## Complexity

- **Time:** `O(log rows * log cols)` per `Update` or `SumRegion` call.
- **Space:** `O(rows * cols)` for the tree and matrix copy.
