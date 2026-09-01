# 3665. Twisted Mirror Path Count

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem
You are given an `m x n` grid where each cell contains one of the following characters:
- `.` an empty cell
- `#` a wall (cannot be entered)
- `/` or `\` a mirror

A ball starts at the top-left cell `(0, 0)` and must reach the bottom-right cell `(m-1, n-1)`. At every step the ball moves either **right** or **down** into an adjacent cell. However, whenever the ball leaves a cell that contains a mirror, its direction is forced to twist: if it arrived moving **right**, it must leave moving **down**, and if it arrived moving **down**, it must leave moving **right**. Cells without a mirror allow the ball to continue in either direction freely.

Return the number of distinct paths from `(0, 0)` to `(m-1, n-1)`, modulo `10^9 + 7`. The ball can never enter a `#` cell.

## Approach
Use dynamic programming with the arrival direction as part of the state: `dp[r][c][0]` counts the ways to reach `(r, c)` having just moved right, and `dp[r][c][1]` counts the ways having just moved down.

For every cell, compute the total number of ways to be standing there (sum over both arrival directions, or `1` for the starting cell). Then:
- If the cell is a mirror, the outgoing direction is forced to be the opposite of however the ball arrived, so only the arrival-specific counts propagate to the single allowed neighbor.
- Otherwise, the full total propagates to **both** the right neighbor (arriving as "right") and the down neighbor (arriving as "down").

The answer is the total number of ways to be standing at the bottom-right cell.

## C# Solution

```csharp
public class Solution
{
    public int CountPaths(char[][] grid)
    {
        const int MOD = 1_000_000_007;
        int n = grid.Length, m = grid[0].Length;
        if (grid[0][0] == '#' || grid[n - 1][m - 1] == '#') return 0;
        if (n == 1 && m == 1) return 1;

        // dp[r,c,0]: ways to reach (r,c) having just moved right
        // dp[r,c,1]: ways to reach (r,c) having just moved down
        long[,,] dp = new long[n, m, 2];

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < m; c++)
            {
                if (grid[r][c] == '#') continue;

                bool isStart = r == 0 && c == 0;
                long total = isStart ? 1L : (dp[r, c, 0] + dp[r, c, 1]) % MOD;
                if (total == 0) continue;

                bool isMirror = !isStart && (grid[r][c] == '/' || grid[r][c] == '\\');

                if (isMirror)
                {
                    long fromRight = dp[r, c, 0];
                    long fromDown = dp[r, c, 1];

                    if (r + 1 < n && grid[r + 1][c] != '#')
                        dp[r + 1, c, 1] = (dp[r + 1, c, 1] + fromRight) % MOD;

                    if (c + 1 < m && grid[r][c + 1] != '#')
                        dp[r, c + 1, 0] = (dp[r, c + 1, 0] + fromDown) % MOD;
                }
                else
                {
                    if (r + 1 < n && grid[r + 1][c] != '#')
                        dp[r + 1, c, 1] = (dp[r + 1, c, 1] + total) % MOD;

                    if (c + 1 < m && grid[r][c + 1] != '#')
                        dp[r, c + 1, 0] = (dp[r, c + 1, 0] + total) % MOD;
                }
            }
        }

        return (int)((dp[n - 1, m - 1, 0] + dp[n - 1, m - 1, 1]) % MOD);
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
