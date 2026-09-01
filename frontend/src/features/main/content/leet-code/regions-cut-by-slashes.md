# 959. Regions Cut By Slashes

**Difficulty:** Medium
**Category:** Union Find, Graph, Array, Depth-First Search, Matrix

## Problem

Given an `n x n` grid of cells each containing `'/'`, `'\\'`, or `' '`, where slashes are diagonal lines drawn inside the cell, return the number of regions the grid is divided into.

### Example

```
Input: grid = [" /","/ "]
Output: 2
```

## Approach

Split every cell into four triangles (top, right, bottom, left). A `'/'` connects the left and bottom triangles and separately the top and right; a `'\\'` connects the top and left, and the bottom and right; a blank cell connects all four together. Additionally, union each cell's right triangle with its right neighbor's left triangle, and each cell's bottom triangle with its below neighbor's top triangle. The final region count is the number of distinct union-find roots among all `4 * n^2` triangles.

## C# Solution

```csharp
public class Solution
{
    public int RegionsBySlashes(string[] grid)
    {
        int n = grid.Length;
        var parent = new int[4 * n * n];
        for (int i = 0; i < parent.Length; i++) parent[i] = i;

        int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));
        void Union(int a, int b)
        {
            int ra = Find(a), rb = Find(b);
            if (ra != rb) parent[ra] = rb;
        }

        for (int r = 0; r < n; r++)
        {
            for (int c = 0; c < n; c++)
            {
                int root = 4 * (r * n + c);
                char ch = grid[r][c];

                if (ch == '/')
                {
                    Union(root + 0, root + 3);
                    Union(root + 1, root + 2);
                }
                else if (ch == '\\')
                {
                    Union(root + 0, root + 1);
                    Union(root + 2, root + 3);
                }
                else
                {
                    Union(root + 0, root + 1);
                    Union(root + 1, root + 2);
                    Union(root + 2, root + 3);
                }

                if (c + 1 < n) Union(root + 1, 4 * (r * n + c + 1) + 3);
                if (r + 1 < n) Union(root + 2, 4 * ((r + 1) * n + c) + 0);
            }
        }

        int count = 0;
        for (int i = 0; i < parent.Length; i++) if (Find(i) == i) count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2 * alpha(n^2))`.
- **Space:** `O(n^2)`.
