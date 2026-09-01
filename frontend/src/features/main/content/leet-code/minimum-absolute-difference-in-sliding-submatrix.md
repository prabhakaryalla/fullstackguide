# 3567. Minimum Absolute Difference in Sliding Submatrix

**Difficulty:** Medium
**Category:** Matrix, Array, Sorting

## Problem

You are given an `m x n` integer matrix `grid` and an integer `k`. For every `k x k` submatrix (a contiguous block of `k` rows and `k` columns), compute the minimum absolute difference between any two distinct elements within that submatrix. Return an `(m - k + 1) x (n - k + 1)` matrix `ans`, where `ans[i][j]` is the minimum absolute difference for the submatrix whose top-left corner is at `(i, j)`. If a submatrix has fewer than two distinct values, its minimum absolute difference is `0`.

### Example

`grid = [[1,3],[5,2]]`, `k = 2`. The only submatrix is the whole grid: values `[1,3,5,2]` sorted become `[1,2,3,5]`, and the smallest gap between adjacent sorted values is `1`. So `ans = [[1]]`.

## Approach

For each valid top-left position `(i, j)` of a `k x k` window, collect all `k * k` values inside the window into a list and sort it. The minimum absolute difference between any two values in a sorted list always occurs between some pair of adjacent elements, so scan adjacent pairs in the sorted list to find the minimum gap.

## C# Solution

```csharp
public class Solution 
{
    public int[][] MinAbsDiff(int[][] grid, int k) 
    {
        int m = grid.Length;
        int n = grid[0].Length;
        int rows = m - k + 1;
        int cols = n - k + 1;
        int[][] ans = new int[rows][];

        for (int i = 0; i < rows; i++)
        {
            ans[i] = new int[cols];
            for (int j = 0; j < cols; j++)
            {
                List<int> values = new List<int>();
                for (int r = i; r < i + k; r++)
                {
                    for (int c = j; c < j + k; c++)
                    {
                        values.Add(grid[r][c]);
                    }
                }

                values.Sort();
                int minDiff = int.MaxValue;
                for (int idx = 1; idx < values.Count; idx++)
                {
                    int diff = values[idx] - values[idx - 1];
                    if (diff < minDiff)
                    {
                        minDiff = diff;
                    }
                }

                ans[i][j] = minDiff == int.MaxValue ? 0 : minDiff;
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(rows * cols * k^2 log k)
- **Space:** O(k^2)
