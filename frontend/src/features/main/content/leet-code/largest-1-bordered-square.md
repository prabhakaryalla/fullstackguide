# 1139. Largest 1-Bordered Square

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given a binary matrix `grid`, return the area of the largest square subgrid whose entire border consists of `1`s (the interior can contain any values). Return `0` if no such square exists.

### Example

```
Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: 9
```

## Approach

Precompute, for every cell, the number of consecutive `1`s extending left (`left[i][j]`) and upward (`top[i][j]`), including the cell itself. For each cell treated as the bottom-right corner of a candidate square, the largest possible side is bounded by `min(left[i][j], top[i][j])`. Starting from that bound and shrinking, check whether a square of that side actually has full `1` borders by verifying the corresponding `top` and `left` run-lengths at the opposite corners; the first side length that satisfies both checks is valid for that cell.

## C# Solution

```csharp
public class Solution
{
    public int Largest1BorderedSquare(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int[,] left = new int[rows, cols];
        int[,] top = new int[rows, cols];

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                if (grid[i][j] == 1)
                {
                    left[i, j] = (j == 0 ? 0 : left[i, j - 1]) + 1;
                    top[i, j] = (i == 0 ? 0 : top[i - 1, j]) + 1;
                }
            }
        }

        int maxSide = 0;

        for (int i = rows - 1; i >= 0; i--)
        {
            for (int j = cols - 1; j >= 0; j--)
            {
                int smallSide = Math.Min(left[i, j], top[i, j]);

                while (smallSide > maxSide)
                {
                    if (top[i, j - smallSide + 1] >= smallSide &&
                        left[i - smallSide + 1, j] >= smallSide)
                    {
                        maxSide = smallSide;
                        break;
                    }
                    smallSide--;
                }
            }
        }

        return maxSide * maxSide;
    }
}
```

## Complexity

- **Time:** `O(R·C·min(R,C))` worst case.
- **Space:** `O(R·C)` for the two DP tables.
