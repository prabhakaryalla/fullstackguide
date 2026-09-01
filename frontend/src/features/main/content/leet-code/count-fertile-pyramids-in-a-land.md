# 2088. Count Fertile Pyramids in a Land

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem

You are given a 0-indexed binary matrix `grid`, where `1` represents fertile land and `0` represents barren land. A **fertile pyramid** (of height `>= 2`) is a triangular region where the apex row has a single fertile cell, and each row moving away from the apex is exactly two cells wider (all cells within the triangle fertile), fully contained in the grid. Pyramids can point either "up" (apex at top) or "down" (apex at bottom, i.e. an inverse pyramid). Return *the total number of fertile pyramids of both orientations*.

## Approach

For upward-pointing pyramids (apex at the top, widening going down), compute `dp[i][j]` = the height of the tallest such pyramid with its apex exactly at `(i, j)`, processing rows from the **bottom** upward (since the recurrence looks at the row below): if `grid[i][j] == 0`, `dp[i][j] = 0`. If `(i, j)` is on the last row or at a column edge, `dp[i][j] = 1` (can't expand further). Otherwise, `dp[i][j] = 1 + min(dp[i+1][j-1], dp[i+1][j], dp[i+1][j+1])` — the pyramid can only grow as wide as the narrowest of the three supporting cells below allows. Every apex with `dp[i][j] = h` contributes `h - 1` valid pyramids (heights `2` through `h`, since every smaller sub-pyramid sharing the same apex is also valid), so summing `max(0, dp[i][j] - 1)` over all cells counts all upward pyramids.

For downward-pointing pyramids, simply flip the grid vertically (reverse the row order) and reuse the exact same counting logic — a downward pyramid in the original grid becomes an upward pyramid in the flipped grid. Sum both counts for the final answer.

## C# Solution

```csharp
public class Solution
{
    public int CountPyramids(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int total = CountUpward(grid, rows, cols);

        var flipped = new int[rows][];
        for (int i = 0; i < rows; i++)
            flipped[i] = grid[rows - 1 - i];

        total += CountUpward(flipped, rows, cols);

        return total;
    }

    private int CountUpward(int[][] grid, int rows, int cols)
    {
        var dp = new int[rows][];
        for (int i = 0; i < rows; i++) dp[i] = new int[cols];

        int total = 0;

        for (int i = rows - 1; i >= 0; i--)
        {
            for (int j = 0; j < cols; j++)
            {
                if (grid[i][j] == 0)
                {
                    dp[i][j] = 0;
                    continue;
                }

                if (i == rows - 1 || j == 0 || j == cols - 1)
                {
                    dp[i][j] = 1;
                }
                else
                {
                    dp[i][j] = 1 + Math.Min(dp[i + 1][j - 1], Math.Min(dp[i + 1][j], dp[i + 1][j + 1]));
                }

                total += dp[i][j] - 1;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(rows * cols)` for the dp table.
