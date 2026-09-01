# 3797. Count Routes to Climb a Rectangular Grid

**Difficulty:** Medium
**Category:** Dynamic Programming, Combinatorics, Matrix

## Problem
You are given two integers `m` and `n` representing the number of rows and columns of a grid, and you start at the top-left cell `(0, 0)`, trying to reach the bottom-right cell `(m - 1, n - 1)`. From any cell `(r, c)`, you may move to `(r + 1, c)` (down) or `(r, c + 1)` (right), staying within the grid bounds. Return the total number of distinct routes from the start to the destination, modulo `10^9 + 7`.

## Approach
This is the classic unique-paths counting problem. Use dynamic programming where `dp[r][c]` represents the number of distinct ways to reach cell `(r, c)` from `(0, 0)`. The base case is `dp[0][0] = 1`, and every cell in the first row or first column has exactly one way to reach it (moving straight right or straight down). For all other cells, `dp[r][c] = dp[r-1][c] + dp[r][c-1]`, since the last move into `(r, c)` must come from either directly above or directly to the left. The answer is `dp[m-1][n-1]`, taken modulo `10^9 + 7`. Space can be optimized to a single rolling row of size `n`.

## C# Solution

```csharp
public class Solution 
{
    public int CountRoutes(int m, int n)
    {
        const long Mod = 1_000_000_007;
        long[] dp = new long[n];
        for (int c = 0; c < n; c++) dp[c] = 1;

        for (int r = 1; r < m; r++)
        {
            for (int c = 1; c < n; c++)
            {
                dp[c] = (dp[c] + dp[c - 1]) % Mod;
            }
        }

        return (int)(dp[n - 1] % Mod);
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(n)
