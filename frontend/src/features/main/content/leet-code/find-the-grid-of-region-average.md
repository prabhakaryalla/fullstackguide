# 3030. Find the Grid of Region Average

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem

You are given a 2D integer matrix `image` and an integer `threshold`. A `3 x 3` subgrid is a **region** if every pair of adjacent cells within it (horizontally or vertically neighboring) differs in value by at most `threshold`. For every cell that belongs to at least one region, replace its value with the average (rounded down) of the averages of every `3 x 3` region it belongs to (a cell can belong to more than one overlapping region). Cells that belong to no region keep their original value. Return the resulting grid.

## Approach

Slide every possible `3 x 3` window over the grid. For each window, check whether it qualifies as a region (all adjacent-cell differences within the window are `<= threshold`). If it does, compute its average (integer division of the sum by 9) and add that average to a running sum for every one of its 9 cells, incrementing that cell's count of contributing regions.

Finally, for every cell with at least one contributing region, its result is the running sum divided by the count of contributing regions (again integer division). Cells with zero contributing regions keep the original `image` value.

## C# Solution

```csharp
public class Solution {
    public int[][] ResultGrid(int[][] image, int threshold) {
        int m = image.Length, n = image[0].Length;
        int[,] sums = new int[m, n];
        int[,] counts = new int[m, n];

        for (int i = 0; i <= m - 3; i++) {
            for (int j = 0; j <= n - 3; j++) {
                if (IsRegion(image, i, j, threshold)) {
                    int subgridSum = GetSubgridSum(image, i, j);
                    for (int x = i; x < i + 3; x++)
                        for (int y = j; y < j + 3; y++) {
                            sums[x, y] += subgridSum / 9;
                            counts[x, y]++;
                        }
                }
            }
        }

        int[][] result = new int[m][];
        for (int i = 0; i < m; i++) {
            result[i] = new int[n];
            for (int j = 0; j < n; j++)
                result[i][j] = counts[i, j] > 0 ? sums[i, j] / counts[i, j] : image[i][j];
        }
        return result;
    }

    // Returns true if image[i..i+2][j..j+2] qualifies as a region.
    private bool IsRegion(int[][] image, int i, int j, int threshold) {
        for (int x = i; x < i + 3; x++) {
            for (int y = j; y < j + 3; y++) {
                if (x > i && Math.Abs(image[x][y] - image[x - 1][y]) > threshold)
                    return false;
                if (y > j && Math.Abs(image[x][y] - image[x][y - 1]) > threshold)
                    return false;
            }
        }
        return true;
    }

    private int GetSubgridSum(int[][] image, int i, int j) {
        int sum = 0;
        for (int x = i; x < i + 3; x++)
            for (int y = j; y < j + 3; y++)
                sum += image[x][y];
        return sum;
    }
}
```

## Complexity

- Time: O(m * n) — every `3 x 3` window is checked and processed in constant time.
- Space: O(m * n) — the sums, counts, and result grids.
