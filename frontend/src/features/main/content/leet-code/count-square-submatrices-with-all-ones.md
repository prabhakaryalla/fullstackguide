# 1277. Count Square Submatrices with All Ones

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given a binary matrix, return the total number of square submatrices consisting entirely of `1`s.

### Example

```
Input: matrix = [[0,1,1,1],[1,1,1,1],[0,1,1,1]]
Output: 15
```

## Approach

Use the classic "maximal square" DP: `dp[r][c]` represents the side length of the largest all-ones square whose bottom-right corner is at `(r, c)`. It equals `min(dp[r-1][c], dp[r][c-1], dp[r-1][c-1]) + 1` whenever the cell itself is `1` (bounded by the smallest of its three neighboring squares plus one), or `0` otherwise. The key extra insight for counting: `dp[r][c]` itself equals the number of distinct all-ones squares ending at `(r, c)` (one for every side length from `1` up to `dp[r][c]`), so summing `dp[r][c]` over the whole matrix gives the total count directly.

## C# Solution

```csharp
public class Solution
{
    public int CountSquares(int[][] matrix)
    {
        int rows = matrix.Length, cols = matrix[0].Length;
        var dp = new int[rows, cols];
        int total = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (matrix[r][c] == 1)
                {
                    dp[r, c] = (r == 0 || c == 0)
                        ? 1
                        : Math.Min(dp[r - 1, c], Math.Min(dp[r, c - 1], dp[r - 1, c - 1])) + 1;

                    total += dp[r, c];
                }
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)`.
