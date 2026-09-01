# 1914. Cyclically Rotating a Grid

**Difficulty:** Medium
**Category:** Array, Math, Matrix, Simulation

## Problem

Given an `m x n` grid (both even) divided into concentric rectangular layers, and an integer `k`, cyclically rotate the elements of each layer counter-clockwise by `k` positions (each layer rotates independently) and return the resulting grid.

### Example

```
Input: grid = [[40,10],[30,20]], k = 1
Output: [[10,20],[40,30]]
Explanation: The single layer [40,10,20,30] (traced counter-clockwise) rotates by 1 to [10,20,30,40], placed back in the same cells.
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `2 <= m, n <= 50`
- Both `m` and `n` are even.
- `1 <= grid[i][j] <= 5000`
- `1 <= k <= 10^9`

## Approach

For each concentric layer (from outermost to innermost), collect its elements in counter-clockwise order into a flat list, rotate that list left by `k mod length`, then write the rotated values back into the same cells in the same traversal order. The traversal for a layer goes down the left edge, across the bottom edge, up the right edge, and back across the top edge.

## C# Solution

```csharp
public class Solution
{
    public int[][] RotateGrid(int[][] grid, int k)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int layers = Math.Min(rows, cols) / 2;

        for (int layer = 0; layer < layers; layer++)
        {
            int top = layer, bottom = rows - 1 - layer;
            int left = layer, right = cols - 1 - layer;

            var elements = new List<int>();
            for (int r = top; r <= bottom; r++) elements.Add(grid[r][left]);
            for (int c = left + 1; c <= right; c++) elements.Add(grid[bottom][c]);
            for (int r = bottom - 1; r >= top; r--) elements.Add(grid[r][right]);
            for (int c = right - 1; c > left; c--) elements.Add(grid[top][c]);

            int len = elements.Count;
            int shift = k % len;

            var rotated = new int[len];
            for (int i = 0; i < len; i++)
            {
                rotated[i] = elements[(i + shift) % len];
            }

            int idx = 0;
            for (int r = top; r <= bottom; r++) grid[r][left] = rotated[idx++];
            for (int c = left + 1; c <= right; c++) grid[bottom][c] = rotated[idx++];
            for (int r = bottom - 1; r >= top; r--) grid[r][right] = rotated[idx++];
            for (int c = right - 1; c > left; c--) grid[top][c] = rotated[idx++];
        }

        return grid;
    }
}
```

## Complexity

- **Time:** `O(m * n)` — every cell belongs to exactly one layer and is processed a constant number of times.
- **Space:** `O(m * n)` in the worst case for the largest layer's element list.
