# 1301. Number of Paths with Max Score

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given a square `board` of digits `'0'`-`'9'`, `'X'` (blocked), `'S'` (start, bottom-right), and `'E'` (end, top-left), a token starts at `'S'` and moves up, left, or up-left toward `'E'`. Return the maximum sum of digits collected and the number of paths achieving that maximum, modulo `10^9 + 7`, as `[maxSum, ways]`, or `[0, 0]` if no path exists.

### Example

```
Input: board = ["E23","2X2","12S"]
Output: [7,1]
```

## Approach

Process cells from the start (bottom-right) toward the end (top-left) with dynamic programming. For each cell, look at the three predecessor cells (below, right, below-right) that could reach it; take the maximum achievable sum among reachable predecessors and sum the number of ways tied for that maximum. Skip blocked cells, and treat `'E'` as contributing `0` to the sum.

## C# Solution

```csharp
public class Solution
{
    public int[] PathsWithMaxScore(IList<string> board)
    {
        int n = board.Count;
        const int MOD = 1_000_000_007;
        long[,] dp = new long[n, n];
        long[,] ways = new long[n, n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                dp[i, j] = -1;

        dp[n - 1, n - 1] = 0;
        ways[n - 1, n - 1] = 1;
        int[][] dirs = { new[] { 1, 0 }, new[] { 0, 1 }, new[] { 1, 1 } };

        for (int i = n - 1; i >= 0; i--)
        {
            for (int j = n - 1; j >= 0; j--)
            {
                if ((i == n - 1 && j == n - 1) || board[i][j] == 'X') continue;

                long best = -1, bestWays = 0;
                foreach (var d in dirs)
                {
                    int pi = i + d[0], pj = j + d[1];
                    if (pi >= n || pj >= n || dp[pi, pj] < 0) continue;

                    if (dp[pi, pj] > best)
                    {
                        best = dp[pi, pj];
                        bestWays = ways[pi, pj];
                    }
                    else if (dp[pi, pj] == best)
                    {
                        bestWays = (bestWays + ways[pi, pj]) % MOD;
                    }
                }

                if (best >= 0)
                {
                    int digit = board[i][j] == 'E' ? 0 : board[i][j] - '0';
                    dp[i, j] = best + digit;
                    ways[i, j] = bestWays;
                }
            }
        }

        return dp[0, 0] < 0 ? new[] { 0, 0 } : new[] { (int)dp[0, 0], (int)ways[0, 0] };
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP tables.
