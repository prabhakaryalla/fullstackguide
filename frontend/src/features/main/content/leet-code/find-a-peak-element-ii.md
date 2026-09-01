# 1901. Find a Peak Element II

**Difficulty:** Medium
**Category:** Array, Binary Search, Matrix

## Problem

A 2D grid `mat` of size `m x n` has no two adjacent cells (horizontally or vertically) with equal values. A peak element is strictly greater than all of its existing neighbors. Cells outside the grid are treated as having value `-1`. Return the `[row, col]` position of any peak element; multiple peaks may exist and any valid one may be returned.

### Example

```
Input: mat = [[10,20,15],[21,30,14],[7,16,32]]
Output: [1,1]
Explanation: mat[1][1] = 30 is greater than its left (21), right (14), top (20), and bottom (16) neighbors.
```

### Constraints

- `1 <= m, n <= 500`
- `1 <= mat[i][j] <= 10^5`
- No two adjacent cells share the same value.

## Approach

Binary search over columns. For the middle column, find the row with the maximum value in that column. Compare that cell against its left and right neighbors: if the left neighbor is larger, a peak must exist in the left half of columns (search there); if the right neighbor is larger, search the right half; otherwise the current cell is itself a peak because it already dominates its column (max in column) and both horizontal neighbors. This halves the search space each step, giving `O(rows * log(cols))`.

## C# Solution

```csharp
public class Solution
{
    public int[] FindPeakGrid(int[][] mat)
    {
        int rows = mat.Length, cols = mat[0].Length;
        int lo = 0, hi = cols - 1;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;
            int maxRow = 0;
            for (int r = 1; r < rows; r++)
            {
                if (mat[r][mid] > mat[maxRow][mid]) maxRow = r;
            }

            int left = mid > 0 ? mat[maxRow][mid - 1] : -1;
            int right = mid < cols - 1 ? mat[maxRow][mid + 1] : -1;

            if (mat[maxRow][mid] > left && mat[maxRow][mid] > right)
            {
                return new int[] { maxRow, mid };
            }
            else if (left > mat[maxRow][mid])
            {
                hi = mid - 1;
            }
            else
            {
                lo = mid + 1;
            }
        }

        return new int[] { -1, -1 };
    }
}
```

## Complexity

- **Time:** `O(rows * log(cols))` — each binary search step scans a full column.
- **Space:** `O(1)` — only a few scalar variables are used.
