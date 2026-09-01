# 302. Smallest Rectangle Enclosing Black Pixels

**Difficulty:** Hard
**Category:** Array, Binary Search, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an `m x n` binary matrix `image` where `'0'` represents a white pixel and `'1'` represents a black pixel, and given that all black pixels form exactly one connected region, along with the location `(x, y)` of one black pixel, return the area of the smallest axis-aligned rectangle that encloses all black pixels.

### Example

```
Input: image = [["0","0","1","0"],["0","1","1","0"],["0","1","0","0"]], x = 0, y = 2
Output: 6
```

### Constraints

- `m == image.length`
- `n == image[i].length`
- `1 <= m, n <= 100`
- `image[i][j]` is `'0'` or `'1'`.
- `0 <= x < m`, `0 <= y < n`
- `image[x][y] == '1'`

## Approach

Since the black region is a single connected component, for any row index, the set of rows containing at least one black pixel forms a contiguous range that includes row `x`; the same holds for columns. This means "does row `r` contain a black pixel" is a monotonic false→true→false pattern along each axis, so each of the rectangle's four boundaries can be found independently with binary search: search `[0, x]` for the topmost true row, `[x, m)` for the first false row after the black region (giving the bottom boundary), and symmetrically for columns.

## C# Solution

```csharp
public class Solution
{
    public int MinArea(char[][] image, int x, int y)
    {
        int rows = image.Length, cols = image[0].Length;

        int top = BinarySearch(0, x, mid => RowHasBlack(image, mid, cols));
        int bottom = BinarySearch(x, rows, mid => !RowHasBlack(image, mid, cols)) - 1;
        int left = BinarySearch(0, y, mid => ColHasBlack(image, mid, rows));
        int right = BinarySearch(y, cols, mid => !ColHasBlack(image, mid, rows)) - 1;

        return (bottom - top + 1) * (right - left + 1);
    }

    private int BinarySearch(int lo, int hi, Func<int, bool> condition)
    {
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (condition(mid)) hi = mid;
            else lo = mid + 1;
        }

        return lo;
    }

    private bool RowHasBlack(char[][] image, int row, int cols)
    {
        for (int c = 0; c < cols; c++)
            if (image[row][c] == '1') return true;

        return false;
    }

    private bool ColHasBlack(char[][] image, int col, int rows)
    {
        for (int r = 0; r < rows; r++)
            if (image[r][col] == '1') return true;

        return false;
    }
}
```

## Complexity

- **Time:** `O(m log n + n log m)`.
- **Space:** `O(1)`.
