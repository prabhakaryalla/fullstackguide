# 463. Island Perimeter

**Difficulty:** Easy
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix

## Problem

Given a grid of `0`s (water) and `1`s (land) representing a single island with no lakes, return the perimeter of the island.

### Example

```
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
```

### Constraints

- `row == grid.length`
- `col == grid[i].length`
- `1 <= row, col <= 100`
- `grid[i][j]` is `0` or `1`.

## Approach

Every land cell contributes 4 sides to the perimeter by default. For each pair of vertically or horizontally adjacent land cells, both shared sides are internal and must be subtracted, so checking only the up and left neighbors (to avoid double-counting) and subtracting 2 for each land neighbor found gives the exact perimeter.

## C# Solution

```csharp
public class Solution
{
    public int IslandPerimeter(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        int perimeter = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (grid[r][c] == 0) continue;

                perimeter += 4;

                if (r > 0 && grid[r - 1][c] == 1) perimeter -= 2;
                if (c > 0 && grid[r][c - 1] == 1) perimeter -= 2;
            }
        }

        return perimeter;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)`.
- **Space:** `O(1)`.
