# 1895. Largest Magic Square

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum

## Problem

Given an `m x n` integer `grid`, a "magic square" of size `k` is a `k x k` subgrid where every row sum, every column sum, and both diagonal sums are all equal. Return the largest possible `k` for which a magic square exists within `grid` (every `1x1` subgrid trivially qualifies).

### Example

```
Input: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
Output: 3
```

## Approach

Precompute row-wise and column-wise prefix sums so any row or column segment sum can be queried in O(1). Try candidate sizes from largest (`min(rows, cols)`) down to `2`; for each size, slide every possible top-left corner and check whether all `k` row sums, all `k` column sums, and both diagonal sums equal a common target (using the first row's sum as the target). The first size that yields a match is the answer; if none do, the answer defaults to `1`.

## C# Solution

```csharp
public class Solution
{
    public int LargestMagicSquare(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var rowPrefix = new long[rows, cols + 1];
        var colPrefix = new long[rows + 1, cols];

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                rowPrefix[r, c + 1] = rowPrefix[r, c] + grid[r][c];
            }
        }

        for (int c = 0; c < cols; c++)
        {
            for (int r = 0; r < rows; r++)
            {
                colPrefix[r + 1, c] = colPrefix[r, c] + grid[r][c];
            }
        }

        int maxSize = Math.Min(rows, cols);

        for (int size = maxSize; size >= 2; size--)
        {
            for (int r = 0; r + size <= rows; r++)
            {
                for (int c = 0; c + size <= cols; c++)
                {
                    if (IsMagic(grid, rowPrefix, colPrefix, r, c, size)) return size;
                }
            }
        }

        return 1;
    }

    private bool IsMagic(int[][] grid, long[,] rowPrefix, long[,] colPrefix, int r, int c, int size)
    {
        long target = rowPrefix[r, c + size] - rowPrefix[r, c];

        for (int i = 0; i < size; i++)
        {
            if (rowPrefix[r + i, c + size] - rowPrefix[r + i, c] != target) return false;
            if (colPrefix[r + size, c + i] - colPrefix[r, c + i] != target) return false;
        }

        long diag1 = 0, diag2 = 0;
        for (int i = 0; i < size; i++)
        {
            diag1 += grid[r + i][c + i];
            diag2 += grid[r + i][c + size - 1 - i];
        }

        return diag1 == target && diag2 == target;
    }
}
```

## Complexity

- **Time:** `O(min(rows, cols) * rows * cols)` in the worst case across all candidate sizes and positions.
- **Space:** `O(rows * cols)` for the prefix sum tables.
