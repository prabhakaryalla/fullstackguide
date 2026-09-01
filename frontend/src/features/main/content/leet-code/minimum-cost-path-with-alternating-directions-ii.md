# 3603. Minimum Cost Path with Alternating Directions II

**Difficulty:** Hard
**Category:** Dynamic Programming, Matrix

## Problem
You are given two integers `m` and `n` representing a grid with `m` rows and `n` columns (0-indexed), and a 2D array `blocked` where `blocked[i] = [r, c]` marks a cell that cannot be visited. Starting at `(0, 0)` and ending at `(m - 1, n - 1)`, movement alternates by step parity: on odd-numbered steps you may only move right, and on even-numbered steps you may only move down. The cost of visiting cell `(i, j)` is `1` if `(i + j)` is even, and `-1` if `(i + j)` is odd. Return the minimum total cost of a valid path from `(0, 0)` to `(m - 1, n - 1)` that avoids every blocked cell, or `-1` if no such path exists.

## Approach
This extends the base alternating-direction path problem by adding obstacles. Use the same DP formulation, `dp[i][j]` = minimum cost to reach cell `(i, j)`, but mark blocked cells as unreachable (`INF`) up front, and skip them when computing costs or transitions. As before, an incoming move to `(i, j)` from the left (a "right" move) is only legal when `(i + j)` is odd, and an incoming move from above (a "down" move) is only legal when `(i + j)` is even, since that parity is fixed by the total step count `i + j`. Fill the DP table row by row, taking the minimum of the two legal, non-blocked, reachable predecessors and adding the current cell's cost. The starting cell must also not be blocked, otherwise the path is immediately impossible.

## C# Solution

```csharp
public class Solution 
{
    public int MinCost(int m, int n, int[][] blocked) 
    {
        const int INF = int.MaxValue / 2;
        var blockedSet = new HashSet<(int, int)>();
        foreach (var b in blocked)
            blockedSet.Add((b[0], b[1]));

        if (blockedSet.Contains((0, 0)) || blockedSet.Contains((m - 1, n - 1)))
            return -1;

        int[,] dp = new int[m, n];
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dp[i, j] = INF;

        dp[0, 0] = Cost(0, 0);

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (i == 0 && j == 0)
                    continue;
                if (blockedSet.Contains((i, j)))
                    continue;

                int best = INF;

                if (j > 0 && dp[i, j - 1] < INF && (i + j) % 2 == 1)
                    best = Math.Min(best, dp[i, j - 1]);

                if (i > 0 && dp[i - 1, j] < INF && (i + j) % 2 == 0)
                    best = Math.Min(best, dp[i - 1, j]);

                if (best < INF)
                    dp[i, j] = best + Cost(i, j);
            }
        }

        return dp[m - 1, n - 1] >= INF ? -1 : dp[m - 1, n - 1];
    }

    private int Cost(int i, int j) => (i + j) % 2 == 0 ? 1 : -1;
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(m * n)
