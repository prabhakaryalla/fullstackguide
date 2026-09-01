# 3651. Minimum Cost Path With Teleportations

**Difficulty:** Hard
**Category:** Dynamic Programming, Matrix, Graph

## Problem
You are given an `m x n` grid of non-negative integers representing costs, and an integer `k` representing the number of teleportations you may use. Starting at the top-left cell, you want to reach the bottom-right cell. At each step you may move right or down, paying the cost of the cell you move into, or you may use one of your `k` teleportations to instantly jump from your current cell to any other cell that has a value strictly less than the current cell's value, paying no additional movement cost. You want to minimize the total cost of the cells visited (excluding the starting cell, or as defined by the source) while reaching the destination, using at most `k` teleportations. Return the minimum total cost.

## Approach
Model this as a layered shortest-path/DP problem: `dp[t][r][c]` = minimum cost to reach cell `(r, c)` having used exactly `t` teleportations. Transitions from normal moves: `dp[t][r][c] = min(dp[t][r-1][c], dp[t][r][c-1]) + grid[r][c]`. For teleportation transitions, from any cell `(r', c')` with `grid[r'][c'] > grid[r][c]`, you can move to `(r,c)` using one teleport, i.e., `dp[t][r][c] = min(dp[t][r][c], min over all (r',c') with grid[r'][c'] > grid[r][c] of dp[t-1][r'][c'])`. To make this efficient, precompute, for each teleportation layer, the minimum dp value grouped/sorted by grid value, and use a prefix-minimum over cells sorted by value descending so that for a target cell we can quickly look up the best source with a strictly greater value. Finally answer is `min over t = 0..k of dp[t][m-1][n-1]`.

## C# Solution

```csharp
public class Solution 
{
    public int MinCostPath(int[][] grid, int k) 
    {
        int m = grid.Length, n = grid[0].Length;
        const long INF = long.MaxValue / 4;

        // Layer 0: no teleports, plain grid DP.
        long[,] dp = new long[m, n];
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                dp[r, c] = INF;
        dp[0, 0] = grid[0][0];
        for (int r = 0; r < m; r++)
        {
            for (int c = 0; c < n; c++)
            {
                if (r == 0 && c == 0) continue;
                long best = INF;
                if (r > 0 && dp[r - 1, c] < INF) best = Math.Min(best, dp[r - 1, c] + grid[r][c]);
                if (c > 0 && dp[r, c - 1] < INF) best = Math.Min(best, dp[r, c - 1] + grid[r][c]);
                dp[r, c] = best;
            }
        }

        long answer = dp[m - 1, n - 1];

        for (int t = 1; t <= k; t++)
        {
            // Build teleport lookup: best dp value (previous layer) among cells with
            // grid value strictly greater than the destination's grid value.
            var cells = new List<(int val, int r, int c)>();
            for (int r = 0; r < m; r++)
                for (int c = 0; c < n; c++)
                    cells.Add((grid[r][c], r, c));
            cells.Sort((a, b) => b.val.CompareTo(a.val));

            long[,] teleportBest = new long[m, n];
            for (int r = 0; r < m; r++)
                for (int c = 0; c < n; c++)
                    teleportBest[r, c] = INF;

            long runningMin = INF;
            int idx = 0;
            while (idx < cells.Count)
            {
                int j = idx;
                int curVal = cells[idx].val;
                while (j < cells.Count && cells[j].val == curVal) j++;

                for (int p = idx; p < j; p++)
                    teleportBest[cells[p].r, cells[p].c] = runningMin;

                for (int p = idx; p < j; p++)
                    runningMin = Math.Min(runningMin, dp[cells[p].r, cells[p].c]);

                idx = j;
            }

            long[,] cur = new long[m, n];
            for (int r = 0; r < m; r++)
            {
                for (int c = 0; c < n; c++)
                {
                    long best = INF;
                    if (teleportBest[r, c] < INF) best = Math.Min(best, teleportBest[r, c] + grid[r][c]);
                    if (r > 0 && cur[r - 1, c] < INF) best = Math.Min(best, cur[r - 1, c] + grid[r][c]);
                    if (c > 0 && cur[r, c - 1] < INF) best = Math.Min(best, cur[r, c - 1] + grid[r][c]);
                    cur[r, c] = best;
                }
            }

            dp = cur;
            answer = Math.Min(answer, dp[m - 1, n - 1]);
        }

        return (int)answer;
    }
}
```

## Complexity

- **Time:** O(k * m * n * log(m * n))
- **Space:** O(m * n)
