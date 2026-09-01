# 1594. Maximum Non Negative Product in a Matrix

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given an `m x n` matrix `grid`, starting at the top-left cell and moving only right or down to reach the bottom-right cell, the product of a path is the product of all values along it. Return the maximum non-negative product achievable, modulo `10^9 + 7`, or `-1` if every path's product is negative.

### Example

```
Input: grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]
Output: -1
```

## Approach

Because the grid can contain negative numbers, the maximum product at a cell might come from multiplying two negative values together, so track both the maximum and minimum possible product reaching each cell. At each cell, the new maximum is the largest of (max-from-above * current, max-from-left * current, min-from-above * current, min-from-left * current), and similarly for the new minimum (taking the smallest of those four candidates). At the final cell, return the maximum product if it's non-negative, else `-1`.

## C# Solution

```csharp
public class Solution
{
    public int MaxProductPath(int[][] grid)
    {
        const int Mod = 1_000_000_007;
        int rows = grid.Length;
        int cols = grid[0].Length;
        long[,] maxProduct = new long[rows, cols];
        long[,] minProduct = new long[rows, cols];

        maxProduct[0, 0] = grid[0][0];
        minProduct[0, 0] = grid[0][0];

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (r == 0 && c == 0)
                {
                    continue;
                }

                long value = grid[r][c];
                long best = long.MinValue;
                long worst = long.MaxValue;

                if (r > 0)
                {
                    best = Math.Max(best, Math.Max(maxProduct[r - 1, c] * value, minProduct[r - 1, c] * value));
                    worst = Math.Min(worst, Math.Min(maxProduct[r - 1, c] * value, minProduct[r - 1, c] * value));
                }

                if (c > 0)
                {
                    best = Math.Max(best, Math.Max(maxProduct[r, c - 1] * value, minProduct[r, c - 1] * value));
                    worst = Math.Min(worst, Math.Min(maxProduct[r, c - 1] * value, minProduct[r, c - 1] * value));
                }

                maxProduct[r, c] = best;
                minProduct[r, c] = worst;
            }
        }

        long result = maxProduct[rows - 1, cols - 1];
        return result < 0 ? -1 : (int)(result % Mod);
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — a single DP pass over the grid.
- **Space:** `O(rows * cols)` for the max/min product tables.
