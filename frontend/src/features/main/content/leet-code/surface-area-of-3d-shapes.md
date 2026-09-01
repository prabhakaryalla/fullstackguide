# 892. Surface Area of 3D Shapes

**Difficulty:** Easy
**Category:** Array, Math, Geometry, Matrix

## Problem

Given an `n x n` grid where `grid[i][j]` is the height of a tower of unit cubes at that position (with towers of adjacent cells touching), return the total surface area of the resulting 3D shape.

### Example

```
Input: grid = [[1,2],[3,4]]
Output: 34
```

## Approach

For each non-empty tower, it contributes a top face, a bottom face, and `4 * height` side faces before considering neighbors. When two adjacent towers touch, their shared contact area is hidden from view on both sides, equal to twice the minimum of their two heights — subtract this for every pair of adjacent towers (checking only the up and left neighbors while scanning avoids double-counting each pair).

## C# Solution

```csharp
public class Solution
{
    public int SurfaceArea(int[][] grid)
    {
        int n = grid.Length;
        int area = 0;

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                if (grid[r][c] == 0) continue;

                area += 2;
                area += 4 * grid[r][c];

                if (r > 0) area -= 2 * Math.Min(grid[r][c], grid[r - 1][c]);
                if (c > 0) area -= 2 * Math.Min(grid[r][c], grid[r][c - 1]);
            }
        }

        return area;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)` extra.
