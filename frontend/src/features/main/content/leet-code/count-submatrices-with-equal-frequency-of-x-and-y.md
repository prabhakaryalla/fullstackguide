# 3212. Count Submatrices With Equal Frequency of X and Y

**Difficulty:** Medium
**Category:** Array, Matrix, Prefix Sum

## Problem
Given a character grid containing `'X'`, `'Y'`, and `'.'` (empty), count the number of submatrices anchored at the top-left corner (0,0) that contain an equal, nonzero number of `'X'` and `'Y'` characters.

## Approach
Precompute two 2D prefix-sum arrays: one tracking the cumulative count of `'X'` characters up to each cell, and another tracking the cumulative count of `'Y'` characters, both using the standard inclusion-exclusion 2D prefix-sum formula. Then, for every possible bottom-right corner `(i, j)` of a top-left-anchored submatrix, look up the precomputed prefix sums directly (since the submatrix is always anchored at (0,0)), and increment the answer whenever the counts of 'X' and 'Y' in that submatrix are equal and greater than zero.

## C# Solution
```csharp
public class Solution {
    public int NumberOfSubmatrices(char[][] grid) {
        int m = grid.Length;
        int n = grid[0].Length;
        int ans = 0;

        int[,] x = new int[m + 1, n + 1];
        int[,] y = new int[m + 1, n + 1];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                x[i + 1, j + 1] = (grid[i][j] == 'X' ? 1 : 0) + x[i, j + 1] + x[i + 1, j] - x[i, j];
                y[i + 1, j + 1] = (grid[i][j] == 'Y' ? 1 : 0) + y[i, j + 1] + y[i + 1, j] - y[i, j];
                if (x[i + 1, j + 1] > 0 && x[i + 1, j + 1] == y[i + 1, j + 1])
                    ans++;
            }
        }

        return ans;
    }
}
```

## Complexity
- Time: O(m * n)
- Space: O(m * n)
