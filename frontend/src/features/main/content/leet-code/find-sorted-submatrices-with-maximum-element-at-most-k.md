# 3359. Find Sorted Submatrices With Maximum Element at Most K

**Difficulty:** Hard
**Category:** Array, Matrix, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an `rows x cols` integer matrix `grid` and an integer `k`, count the number of submatrices (defined by choosing a contiguous range of rows and a contiguous range of columns) such that every row of the submatrix is sorted in non-decreasing order left to right, every column is sorted in non-decreasing order top to bottom, and the maximum element in the submatrix is at most `k`.

## Approach
For every choice of top row `r1` and bottom row `r2`, extend the submatrix one column at a time from `c1` outward. At each newly added column `c2`, verify (for every row within `[r1, r2]`) that the new column keeps each row non-decreasing relative to the previous column and each column non-decreasing relative to the previous row, while tracking the running maximum. As soon as the extended rectangle stays valid and its maximum is at most `k`, it counts.

## C# Solution

```csharp
public class Solution 
{
    public long CountSubmatrices(int[][] grid, int k) 
    {
        int rows = grid.Length, cols = grid[0].Length;
        long count = 0;

        for (int r1 = 0; r1 < rows; r1++) 
        {
            for (int r2 = r1; r2 < rows; r2++) 
            {
                for (int c1 = 0; c1 < cols; c1++) 
                {
                    int maxVal = int.MinValue;
                    bool valid = true;

                    for (int c2 = c1; c2 < cols && valid; c2++) 
                    {
                        for (int i = r1; i <= r2 && valid; i++) 
                        {
                            if (c2 > c1 && grid[i][c2] < grid[i][c2 - 1]) valid = false;
                            if (i > r1 && grid[i][c2] < grid[i - 1][c2]) valid = false;
                            maxVal = Math.Max(maxVal, grid[i][c2]);
                        }
                        if (valid && maxVal <= k) count++;
                    }
                }
            }
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(rows^3 * cols^2) in the worst case.
- **Space:** O(1) extra
