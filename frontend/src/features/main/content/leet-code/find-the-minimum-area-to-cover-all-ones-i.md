# 3195. Find the Minimum Area to Cover All Ones I

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem
Given a binary matrix, find the smallest possible area of an axis-aligned rectangle that fully contains every cell with value 1.

## Approach
Scan the entire matrix to find the minimum and maximum row indices, and the minimum and maximum column indices, among all cells with value 1. The bounding rectangle spans from the minimum to maximum row and minimum to maximum column; its area is `(maxRow - minRow + 1) * (maxCol - minCol + 1)`.

## C# Solution
```csharp
public class Solution {
    public int MinimumArea(int[][] grid) {
        int x1 = int.MaxValue, y1 = int.MaxValue;
        int x2 = 0, y2 = 0;

        for (int i = 0; i < grid.Length; i++)
            for (int j = 0; j < grid[0].Length; j++)
                if (grid[i][j] == 1) {
                    x1 = Math.Min(x1, i);
                    y1 = Math.Min(y1, j);
                    x2 = Math.Max(x2, i);
                    y2 = Math.Max(y2, j);
                }

        return (x2 - x1 + 1) * (y2 - y1 + 1);
    }
}
```

## Complexity
- Time: O(m * n)
- Space: O(1)
