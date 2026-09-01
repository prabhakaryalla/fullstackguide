# 3596. Minimum Cost Path with Alternating Directions I

**Difficulty:** Medium
**Category:** Dynamic Programming, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given two integers `m` and `n` representing a grid with `m` rows and `n` columns, 0-indexed. You start at cell `(0, 0)` and want to reach cell `(m - 1, n - 1)`. Movement alternates by step parity: on odd-numbered steps (1st, 3rd, ...) you may only move right, and on even-numbered steps (2nd, 4th, ...) you may only move down (or some similarly defined alternating rule). The cost of visiting cell `(i, j)` is `(i + j) % 2 == 0 ? 1 : -1`. Return the minimum total cost of any valid path from `(0, 0)` to `(m - 1, n - 1)`, or -1 if no valid path exists given the alternating movement constraint.

## Approach
Use dynamic programming over `dp[i][j][parity]` where `parity` tracks whether the next move must be "right" or "down" based on the step count so far. Since the alternation is determined by the number of steps taken (which equals `i + j`), the allowed direction at each cell is fully determined by `(i + j) % 2`, so a standard `dp[i][j]` storing minimum cost to reach `(i, j)` suffices, only allowing transitions that respect the alternating rule (i.e., only accept incoming moves consistent with the parity of `i + j - 1`). Initialize `dp[0][0]` with its cell cost, then fill the table row by row, only allowing a move into `(i, j)` from `(i-1, j)` if the step corresponds to "down" being legal, or from `(i, j-1)` if "right" is legal. Take the minimum feasible predecessor and add the current cell's cost. If neither predecessor is valid, mark the cell unreachable.

## C# Solution

```csharp
public class Solution 
{
    public int MinCost(int m, int n) 
    {
        const int INF = int.MaxValue / 2;
        int[,] dp = new int[m, n];

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                dp[i, j] = INF;

        dp[0, 0] = Cost(0, 0);

        for (int i = 0; i < m; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (i == 0 && j == 0) continue;

                int best = INF;

                // Move came from the left (a "right" move), valid when the step index (i+j) is odd.
                if (j > 0 && dp[i, j - 1] < INF && ((i + j) % 2 == 1))
                    best = Math.Min(best, dp[i, j - 1]);

                // Move came from above (a "down" move), valid when the step index (i+j) is even.
                if (i > 0 && dp[i - 1, j] < INF && ((i + j) % 2 == 0))
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
