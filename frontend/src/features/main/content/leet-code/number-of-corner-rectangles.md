# 750. Number Of Corner Rectangles

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a binary grid, return the number of "corner rectangles" — 4 distinct `1`s in the grid forming an axis-aligned rectangle, with exactly one `1` at each corner.

### Example

```
Input: grid = [[1,0,0,1,0],[0,0,1,0,1],[0,0,0,1,0],[1,0,1,0,1]]
Output: 1
```

## Approach

For every pair of rows, count how many columns have a `1` in both rows (the "common columns" between them). Any 2 of these common columns, combined with the current pair of rows, form a valid corner rectangle, so the number of rectangles contributed by this row pair is `C(commonColumns, 2) = commonColumns * (commonColumns - 1) / 2`. Sum this over every pair of rows.

## C# Solution

```csharp
public class Solution
{
    public int CountCornerRectangles(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int count = 0;

        for (int r1 = 0; r1 < rows; r1++)
        {
            for (int r2 = r1 + 1; r2 < rows; r2++)
            {
                int commonOnes = 0;

                for (int c = 0; c < cols; c++)
                {
                    if (grid[r1][c] == 1 && grid[r2][c] == 1)
                        commonOnes++;
                }

                count += commonOnes * (commonOnes - 1) / 2;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(rows^2 * cols)`.
- **Space:** `O(1)` extra.
