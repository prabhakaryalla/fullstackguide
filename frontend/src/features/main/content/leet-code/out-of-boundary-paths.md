# 576. Out of Boundary Paths

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

Given an `m x n` grid, a ball starts at `(startRow, startColumn)` and can move up, down, left, or right, up to `maxMove` times. Return the number of distinct paths that move the ball out of the grid boundary, modulo `10^9 + 7`.

### Example

```
Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
Output: 6
```

### Constraints

- `1 <= m, n <= 50`
- `0 <= maxMove <= 50`
- `0 <= startRow < m`
- `0 <= startColumn < n`

## Approach

Use dynamic programming over "number of moves used" and "current cell," where `dp[r][c]` at each step holds the number of ways to reach cell `(r, c)` using the moves consumed so far. For each move, distribute each cell's path count to its four neighbors; any move that would land outside the grid instead contributes directly to the answer (an exit), since it counts as one complete out-of-boundary path.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int FindPaths(int m, int n, int maxMove, int startRow, int startColumn)
    {
        var dp = new int[m, n];
        dp[startRow, startColumn] = 1;
        int pathCount = 0;

        for (int move = 0; move < maxMove; move++)
        {
            var next = new int[m, n];

            for (int r = 0; r < m; r++)
            {
                for (int c = 0; c < n; c++)
                {
                    int ways = dp[r, c];
                    if (ways == 0) continue;

                    foreach (var (dr, dc) in new[] { (-1, 0), (1, 0), (0, -1), (0, 1) })
                    {
                        int nr = r + dr, nc = c + dc;

                        if (nr < 0 || nr >= m || nc < 0 || nc >= n)
                            pathCount = (pathCount + ways) % Mod;
                        else
                            next[nr, nc] = (next[nr, nc] + ways) % Mod;
                    }
                }
            }

            dp = next;
        }

        return pathCount;
    }
}
```

## Complexity

- **Time:** `O(maxMove * m * n)`.
- **Space:** `O(m * n)` for the DP grid.
