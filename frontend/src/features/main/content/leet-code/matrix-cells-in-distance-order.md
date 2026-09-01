# 1030. Matrix Cells in Distance Order

**Difficulty:** Easy
**Category:** Array, Math, Sorting, Matrix, Geometry, Bucket Sort

## Problem

Given grid dimensions `rows` x `cols` and a center cell `(rCenter, cCenter)`, return all cell coordinates sorted by their Manhattan distance from the center (ties can be in any order).

### Example

```
Input: rows = 2, cols = 2, rCenter = 0, cCenter = 1
Output: [[0,1],[0,0],[1,1],[1,0]]
```

## Approach

Generate every cell coordinate in the grid, then sort the full list by Manhattan distance to `(rCenter, cCenter)` — `|r - rCenter| + |c - cCenter|`. A comparator-based sort is simple and correct; for very large grids a bucket sort keyed by distance (which is bounded by `rows + cols`) would avoid the `log n` factor, but isn't necessary for correctness.

## C# Solution

```csharp
public class Solution
{
    public int[][] AllCellsDistOrder(int rows, int cols, int rCenter, int cCenter)
    {
        var cells = new int[rows * cols][];
        int index = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                cells[index++] = new[] { r, c };
            }
        }

        Array.Sort(cells, (a, b) =>
            (Math.Abs(a[0] - rCenter) + Math.Abs(a[1] - cCenter))
                .CompareTo(Math.Abs(b[0] - rCenter) + Math.Abs(b[1] - cCenter)));

        return cells;
    }
}
```

## Complexity

- **Time:** `O(rows * cols * log(rows * cols))` for the sort.
- **Space:** `O(rows * cols)` for the output.
