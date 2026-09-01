# 2435. Paths in Matrix Whose Sum Is Divisible by K

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem

You are given an `m x n` integer matrix `grid` and an integer `k`. You start at cell `(0, 0)` and can only move right or down, ending at `(m - 1, n - 1)`. Return the number of paths where the sum of the values visited is divisible by `k`, modulo `10^9 + 7`.

### Example

Input: `grid = [[5,2,4],[3,0,5],[0,7,2]]`, `k = 3`
Output: `2`
Explanation: There are two paths from top-left to bottom-right whose sum of visited values is divisible by 3.

## Approach

Use dynamic programming where `dp[i][j][r]` is the number of ways to reach cell `(i, j)` with a path sum that is `r` modulo `k`. The base case is `dp[0][0][grid[0][0] % k] = 1`. For every other cell, sum the contributions from the cell above and the cell to the left for each remainder `r`, then shift that remainder by the current cell's value modulo `k`. The answer is `dp[m-1][n-1][0]`.

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfPaths(int[][] grid, int k) 
    {
        const int Mod = 1_000_000_007;
        int m = grid.Length, n = grid[0].Length;

        var dp = new long[m, n, k];
        dp[0, 0, grid[0][0] % k] = 1;

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (i == 0 && j == 0) continue;

                for (int r = 0; r < k; r++)
                {
                    long ways = 0;
                    if (i > 0) ways += dp[i - 1, j, r];
                    if (j > 0) ways += dp[i, j - 1, r];
                    ways %= Mod;

                    int newRem = (int)((r + grid[i][j]) % k);
                    dp[i, j, newRem] = (dp[i, j, newRem] + ways) % Mod;
                }
            }
        }

        return (int)dp[m - 1, n - 1, 0];
    }
}
```

## Complexity

- **Time:** O(m * n * k)
- **Space:** O(m * n * k)
