# 688. Knight Probability in Chessboard

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

Given an `n x n` chessboard, a knight starting at `(row, column)`, and `k` moves, where the knight picks one of its 8 possible moves uniformly at random each time (even if that move would take it off the board, ending its journey), return the probability that the knight remains on the board after exactly `k` moves.

### Example

```
Input: n = 3, k = 2, row = 0, column = 0
Output: 0.0625
```

## Approach

Use dynamic programming where `dp[r][c]` holds the probability of the knight currently being on the board at `(r, c)` after the moves processed so far. For each step, distribute each cell's probability equally (1/8 each) across its 8 knight-move destinations, only keeping contributions that land within the board bounds — moves off the board simply don't contribute to any cell, naturally reducing the total remaining probability. After `k` steps, sum all remaining probabilities across the board.

## C# Solution

```csharp
public class Solution
{
    private static readonly int[][] Moves =
    {
        new[] { 1, 2 }, new[] { 1, -2 }, new[] { -1, 2 }, new[] { -1, -2 },
        new[] { 2, 1 }, new[] { 2, -1 }, new[] { -2, 1 }, new[] { -2, -1 }
    };

    public double KnightProbability(int n, int k, int row, int column)
    {
        var dp = new double[n, n];
        dp[row, column] = 1.0;

        for (int step = 0; step < k; step++)
        {
            var next = new double[n, n];

            for (int r = 0; r < n; r++)
            {
                for (int c = 0; c < n; c++)
                {
                    if (dp[r, c] == 0) continue;

                    foreach (var move in Moves)
                    {
                        int nr = r + move[0], nc = c + move[1];
                        if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;

                        next[nr, nc] += dp[r, c] / 8.0;
                    }
                }
            }

            dp = next;
        }

        double probability = 0;
        for (int r = 0; r < n; r++)
            for (int c = 0; c < n; c++)
                probability += dp[r, c];

        return probability;
    }
}
```

## Complexity

- **Time:** `O(k * n^2)`.
- **Space:** `O(n^2)` for the DP grid.
