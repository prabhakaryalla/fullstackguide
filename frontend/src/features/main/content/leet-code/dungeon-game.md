# 174. Dungeon Game

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem

A knight starts in the top-left cell of a dungeon grid and must reach the bottom-right cell, only moving right or down. Each cell adds to or subtracts from the knight's health (`dungeon[i][j]`); health must stay above 0 at all times. Return the minimum initial health needed to guarantee rescuing the princess.

### Example

```
dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]] -> 7
```

## Approach

Work backward from the bottom-right cell, since the minimum health needed at a cell depends on the minimum health needed at the cells reachable *after* it, not before. `dp[i][j]` is the minimum health required entering cell `(i, j)` to survive the rest of the path; it equals `max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])` — health can never be allowed to drop to 0 or below, hence the `max(1, ...)`.

## C# Solution

```csharp
public class Solution
{
    public int CalculateMinimumHP(int[][] dungeon)
    {
        int rows = dungeon.Length, cols = dungeon[0].Length;
        var dp = new int[rows + 1, cols + 1];

        for (int i = 0; i <= rows; i++) dp[i, cols] = int.MaxValue;
        for (int j = 0; j <= cols; j++) dp[rows, j] = int.MaxValue;
        dp[rows, cols - 1] = 1;
        dp[rows - 1, cols] = 1;

        for (int i = rows - 1; i >= 0; i--)
        {
            for (int j = cols - 1; j >= 0; j--)
            {
                int needed = Math.Min(dp[i + 1, j], dp[i, j + 1]) - dungeon[i][j];
                dp[i, j] = Math.Max(1, needed);
            }
        }

        return dp[0, 0];
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — fills the DP table once.
- **Space:** `O(rows * cols)` — for the DP table (reducible to `O(cols)`).
