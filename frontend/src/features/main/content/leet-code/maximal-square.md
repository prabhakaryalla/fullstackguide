# 221. Maximal Square

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given an `m x n` binary matrix filled with `'0'`s and `'1'`s, find the largest square containing only `'1'`s, and return its area.

### Example

```
matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
-> 4   (a 2x2 square of 1's)
```

## Approach

`dp[row][col]` is the side length of the largest all-`'1'` square whose bottom-right corner is at `(row, col)`. If the current cell is `'1'`, the square can only grow as large as the smallest of the three neighboring squares (above, left, and diagonally above-left) plus one — any smaller neighbor caps how far the square can extend. Track the maximum side length seen; the answer is that value squared.

## C# Solution

```csharp
public class Solution
{
    public int MaximalSquare(char[][] matrix)
    {
        int rows = matrix.Length, cols = matrix[0].Length;
        var dp = new int[rows + 1, cols + 1];
        int maxSide = 0;

        for (int row = 1; row <= rows; row++)
        {
            for (int col = 1; col <= cols; col++)
            {
                if (matrix[row - 1][col - 1] == '1')
                {
                    dp[row, col] = 1 + Math.Min(dp[row - 1, col - 1], Math.Min(dp[row - 1, col], dp[row, col - 1]));
                    maxSide = Math.Max(maxSide, dp[row, col]);
                }
            }
        }

        return maxSide * maxSide;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — fills the DP table once.
- **Space:** `O(rows * cols)` — for the DP table (reducible to `O(cols)`).
