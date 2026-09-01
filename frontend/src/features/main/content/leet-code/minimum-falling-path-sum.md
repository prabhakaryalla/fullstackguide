# 931. Minimum Falling Path Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given an `n x n` integer matrix, return the minimum sum of any *falling path*, where a falling path starts at any cell in the first row and moves to a cell in the next row that is directly below or diagonally adjacent, one row at a time.

### Example

```
Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
```

## Approach

Process rows bottom-up. `dp[c]` holds the minimum falling-path sum from row `r` to the bottom, ending at column `c`. For the row above, each cell adds the minimum of the three DP values directly below and diagonally below it. The answer is the minimum over the final `dp` row.

## C# Solution

```csharp
public class Solution
{
    public int MinFallingPathSum(int[][] matrix)
    {
        int n = matrix.Length;
        var dp = (int[])matrix[n - 1].Clone();

        for (int r = n - 2; r >= 0; r--)
        {
            var next = new int[n];

            for (int c = 0; c < n; c++)
            {
                int best = dp[c];
                if (c > 0) best = Math.Min(best, dp[c - 1]);
                if (c < n - 1) best = Math.Min(best, dp[c + 1]);
                next[c] = matrix[r][c] + best;
            }

            dp = next;
        }

        return dp.Min();
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)`.
