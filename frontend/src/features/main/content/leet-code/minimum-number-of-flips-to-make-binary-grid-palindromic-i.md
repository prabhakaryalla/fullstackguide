# 3239. Minimum Number of Flips to Make Binary Grid Palindromic I

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem
Given an `m x n` binary grid, you may flip any cell's value (0 to 1 or 1 to 0). Return the minimum number of flips needed so that EITHER every row of the grid is a palindrome, OR every column of the grid is a palindrome (you choose whichever requires fewer flips).

## Approach
Compute two separate flip counts independently: the number of flips needed to make every row a palindrome (checking, within each row, mismatched pairs of cells equidistant from the row's ends and counting one flip per mismatched pair), and similarly the number of flips needed to make every column a palindrome (checking mismatched pairs equidistant from the top and bottom within each column). Return the minimum of these two totals.

## C# Solution
```csharp
public class Solution {
    public int MinFlips(int[][] grid) {
        int m = grid.Length;
        int n = grid[0].Length;
        int rowFlips = 0;
        int colFlips = 0;

        foreach (int[] row in grid)
            for (int i = 0; i < n / 2; i++)
                if (row[i] != row[n - 1 - i])
                    rowFlips++;

        for (int j = 0; j < n; j++)
            for (int i = 0; i < m / 2; i++)
                if (grid[i][j] != grid[m - 1 - i][j])
                    colFlips++;

        return Math.Min(rowFlips, colFlips);
    }
}
```

## Complexity
- Time: O(m * n)
- Space: O(1)
