# 3128. Right Triangles

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Combinatorics, Counting

## Problem

Given a 2D binary `grid`, a "right triangle" is formed by three cells all containing `1`, where one cell shares its row with a second cell and its column with a third cell (the classic "L-shaped" right angle configuration, axis-aligned). Return the number of such right triangles.

## Approach

Precompute, for every row and every column, how many `1`s it contains (`rows[i]` and `cols[j]`). For each cell that holds a `1` and could serve as the right-angle vertex, the number of triangles anchored there equals `(rows[i] - 1) * (cols[j] - 1)` — choosing any other `1` in the same row (excluding itself) paired with any other `1` in the same column (excluding itself). Sum this over every `1`-cell in the grid.

## C# Solution

```csharp
public class Solution {
    public long NumberOfRightTriangles(int[][] grid) {
        long count = 0;
        int m = grid.Length, n = grid[0].Length;
        int[] rows = new int[m];
        int[] cols = new int[n];

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) {
                    rows[i]++;
                    cols[j]++;
                }

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1)
                    count += (long)(rows[i] - 1) * (cols[j] - 1);

        return count;
    }
}
```

## Complexity

- Time: O(m * n) — two passes over the grid.
- Space: O(m + n) — the row and column count arrays.
