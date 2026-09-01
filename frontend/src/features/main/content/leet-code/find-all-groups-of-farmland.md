# 1992. Find All Groups of Farmland

**Difficulty:** Medium
**Category:** Array, Depth-First Search, Breadth-First Search, Matrix

## Problem

Given an `m x n` binary matrix `land` where `1` represents farmland, all farmland forms axis-aligned rectangular groups that never touch each other (each maximal connected rectangle of `1`s is isolated from every other). Return an array of `[row1, col1, row2, col2]` for each rectangular group, where `(row1, col1)` is the top-left and `(row2, col2)` is the bottom-right corner.

### Example

```
Input: land = [[1,0,0],[0,1,1],[0,1,1]]
Output: [[0,0,0,0],[1,1,2,2]]
Explanation: Two rectangular farmland groups: a single cell at (0,0) and a 2x2 block from (1,1) to (2,2).
```

### Constraints

- `m == land.length`
- `n == land[i].length`
- `1 <= m, n <= 300`
- `land[i][j]` is `0` or `1`.
- Groups are always rectangular and isolated from each other.

## Approach

Because every group is guaranteed to be a solid rectangle isolated from others, no flood-fill is even necessary: scan for a cell that is `1` and is the top-left corner of its rectangle (i.e., the cell above it, if any, and the cell to its left, if any, are both `0` or out of bounds). From that corner, extend right while cells are `1` to find `col2`, and extend down while cells are `1` to find `row2`. Record the rectangle.

## C# Solution

```csharp
public class Solution
{
    public int[][] FindFarmland(int[][] land)
    {
        int rows = land.Length, cols = land[0].Length;
        var result = new List<int[]>();

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                if (land[r][c] == 0) continue;
                bool isTopLeft = (r == 0 || land[r - 1][c] == 0) && (c == 0 || land[r][c - 1] == 0);
                if (!isTopLeft) continue;

                int r2 = r;
                while (r2 + 1 < rows && land[r2 + 1][c] == 1) r2++;

                int c2 = c;
                while (c2 + 1 < cols && land[r][c2 + 1] == 1) c2++;

                result.Add(new int[] { r, c, r2, c2 });
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(m * n)` — every cell is examined a constant number of times.
- **Space:** `O(k)` for the output, where `k` is the number of farmland groups.
