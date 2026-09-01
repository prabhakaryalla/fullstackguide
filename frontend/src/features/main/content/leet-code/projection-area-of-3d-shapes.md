# 883. Projection Area of 3D Shapes

**Difficulty:** Easy
**Category:** Array, Math, Geometry, Matrix

## Problem

Given an `n x n` grid where `grid[i][j]` is the height of a stack of unit cubes at that position, return the total area of the shape's projections onto the xy-plane (top view), yz-plane (side view), and zx-plane (front view).

### Example

```
Input: grid = [[1,2],[3,4]]
Output: 17
```

## Approach

The top-view area is simply the count of non-empty cells (any cell with height `> 0` contributes one unit square). The front-view area, for each row, is the maximum height in that row (the tallest cube blocks the view of shorter ones behind it). Symmetrically, the side-view area, for each column, is the maximum height in that column. Sum all three contributions.

## C# Solution

```csharp
public class Solution
{
    public int ProjectionArea(int[][] grid)
    {
        int n = grid.Length;
        int topArea = 0, frontArea = 0, sideArea = 0;

        for (int r = 0; r < n; r++)
        {
            int rowMax = 0, colMax = 0;

            for (int c = 0; c < n; c++)
            {
                if (grid[r][c] > 0) topArea++;
                rowMax = Math.Max(rowMax, grid[r][c]);
                colMax = Math.Max(colMax, grid[c][r]);
            }

            frontArea += rowMax;
            sideArea += colMax;
        }

        return topArea + frontArea + sideArea;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)` extra.
