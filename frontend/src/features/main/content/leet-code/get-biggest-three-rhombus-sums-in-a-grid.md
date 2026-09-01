# 1878. Get Biggest Three Rhombus Sums in a Grid

**Difficulty:** Medium
**Category:** Array, Matrix, Simulation

## Problem

Given an `m x n` integer `grid`, an axis-aligned rhombus is defined by a center cell and a "radius" (`size`), with its four vertices `size` cells above, below, left, and right of the center; its sum is the total of all cells along its perimeter (a single cell counts as a rhombus of size `0`). Return the three largest distinct rhombus sums found in the grid, in decreasing order (fewer than three if that many distinct sums don't exist).

### Example

```
Input: grid = [[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]]
Output: [228,216,211]
```

## Approach

For every possible center cell, try every rhombus size from `0` up to the largest that still fits within the grid bounds. For size `0`, the sum is just the cell itself. For a positive size, walk the four straight edges connecting the top, right, bottom, and left vertices (each edge contributing `size` cells, so `4 * size` cells total, with no cell double-counted). Maintain a small `SortedSet<int>` capped at 3 elements to track the distinct largest sums seen, evicting the smallest whenever a fourth distinct value is added.

## C# Solution

```csharp
public class Solution
{
    public int[] GetBiggestThree(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var top3 = new SortedSet<int>();

        void Consider(int value)
        {
            top3.Add(value);
            if (top3.Count > 3) top3.Remove(top3.Min);
        }

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                Consider(grid[r][c]);

                for (int size = 1; r - size >= 0 && r + size < rows && c - size >= 0 && c + size < cols; size++)
                {
                    long sum = 0;

                    for (int k = 0; k < size; k++)
                    {
                        sum += grid[r - size + k][c + k];
                        sum += grid[r + k][c + size - k];
                        sum += grid[r + size - k][c - k];
                        sum += grid[r - k][c - size + k];
                    }

                    Consider((int)sum);
                }
            }
        }

        return top3.Reverse().ToArray();
    }
}
```

## Complexity

- **Time:** `O(m * n * min(m, n))` in the worst case, since each center tries `O(min(m,n))` sizes each costing `O(size)`.
- **Space:** `O(1)` beyond the fixed-size top-3 set.
