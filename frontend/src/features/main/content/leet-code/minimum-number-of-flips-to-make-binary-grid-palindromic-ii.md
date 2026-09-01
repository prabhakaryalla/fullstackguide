# 3240. Minimum Number of Flips to Make Binary Grid Palindromic II

**Difficulty:** Hard
**Category:** Array, Matrix

## Problem
Given an `m x n` binary grid, you may flip any cell's value. Return the minimum number of flips needed so that BOTH every row is a palindrome AND every column is a palindrome simultaneously.

## Approach
Divide the grid conceptually into groups of 4 symmetric cells: for each `(i, j)` in the top-left quadrant, its mirror positions are `(i, n-1-j)`, `(m-1-i, j)`, and `(m-1-i, n-1-j)`. For each such group of 4, count how many are set to 1; the minimum flips to make all 4 equal is the smaller of "flip all to 0" (cost = count of 1s) or "flip all to 1" (cost = 4 minus count of 1s). Handle the middle row separately (if `m` is odd), pairing left-right symmetric cells and tracking both the count of mismatched pairs and the total count of 1s among them. Similarly handle the middle column separately (if `n` is odd), pairing top-bottom symmetric cells. If there are no mismatched pairs in the middle row/column, an extra 2 flips may still be needed if the total count of 1s there isn't a multiple of 4 (specifically if it's 2 mod 4); otherwise, add the mismatched pair count directly (since each mismatched pair needs exactly 1 flip to make both entries equal). Finally, handle the single center cell (if both dimensions are odd) by flipping it if necessary to be 0 (since it has no pair to symmetrize against, and a lone 1 is never required by the palindrome constraint alone, but this follows the reference solution's specific handling).

## C# Solution
```csharp
public class Solution {
    public int MinFlips(int[][] grid) {
        int m = grid.Length;
        int n = grid[0].Length;
        int ans = 0;
        int middleOnes = 0;
        int mismatchedPairs = 0;

        for (int i = 0; i < m / 2; i++) {
            for (int j = 0; j < n / 2; j++) {
                int ones = grid[i][j] + grid[i][n - 1 - j] + grid[m - 1 - i][j] + grid[m - 1 - i][n - 1 - j];
                ans += Math.Min(ones, 4 - ones);
            }
        }

        if (m % 2 == 1) {
            for (int j = 0; j < n / 2; j++) {
                int leftCell = grid[m / 2][j];
                int rightCell = grid[m / 2][n - 1 - j];
                mismatchedPairs += leftCell ^ rightCell;
                middleOnes += leftCell + rightCell;
            }
        }

        if (n % 2 == 1) {
            for (int i = 0; i < m / 2; i++) {
                int topCell = grid[i][n / 2];
                int bottomCell = grid[m - 1 - i][n / 2];
                mismatchedPairs += topCell ^ bottomCell;
                middleOnes += topCell + bottomCell;
            }
        }

        if (mismatchedPairs == 0) {
            if (middleOnes % 4 == 2)
                ans += 2;
        } else {
            ans += mismatchedPairs;
        }

        if (m % 2 == 1 && n % 2 == 1)
            ans += grid[m / 2][n / 2];

        return ans;
    }
}
```

## Complexity
- Time: O(m * n)
- Space: O(1)
