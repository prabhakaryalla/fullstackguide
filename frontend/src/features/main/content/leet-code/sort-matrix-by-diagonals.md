# 3446. Sort Matrix by Diagonals

**Difficulty:** Medium
**Category:** Array, Matrix, Sorting

## Problem

Given an `n x n` integer grid, sort every diagonal that starts in the first column (going from the top-left toward the bottom-right, including the main diagonal) in non-increasing order, and sort every diagonal that starts in the first row (excluding the main diagonal) in non-decreasing order. Return the resulting grid.

### Example

`grid = [[1,7,3],[9,8,2],[4,5,6]]` → after sorting the lower-left diagonals (including the main diagonal) descending and the upper-right diagonals ascending, the result groups larger values toward the bottom-left and keeps the upper-right diagonals ordered smallest to largest.

## Approach

Walk each diagonal (cells where `row - col` is constant) by its starting cell. For diagonals starting at `(row, 0)` for every row, collect the values, sort them descending, and write them back along the diagonal. For diagonals starting at `(0, col)` for `col >= 1`, collect the values, sort them ascending, and write them back.

## C# Solution

```csharp
public class Solution 
{
    public int[][] SortMatrix(int[][] grid) 
    {
        int n = grid.Length;

        for (int startRow = 0; startRow < n; startRow++)
        {
            List<int> values = new List<int>();
            int r = startRow, c = 0;
            while (r < n && c < n)
            {
                values.Add(grid[r][c]);
                r++; c++;
            }
            values.Sort((a, b) => b - a);

            r = startRow; c = 0;
            int idx = 0;
            while (r < n && c < n)
            {
                grid[r][c] = values[idx++];
                r++; c++;
            }
        }

        for (int startCol = 1; startCol < n; startCol++)
        {
            List<int> values = new List<int>();
            int r = 0, c = startCol;
            while (r < n && c < n)
            {
                values.Add(grid[r][c]);
                r++; c++;
            }
            values.Sort();

            r = 0; c = startCol;
            int idx = 0;
            while (r < n && c < n)
            {
                grid[r][c] = values[idx++];
                r++; c++;
            }
        }

        return grid;
    }
}
```

## Complexity

- **Time:** O(n^2 log n)
- **Space:** O(n)
