# 2371. Minimize Maximum Value in a Grid

**Difficulty:** Hard
**Category:** Array, Matrix, Union Find, Sorting, Topological Sort
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an `m x n` matrix `grid` containing distinct positive integers. Replace every integer with a new positive integer such that the relative order of any two elements that share a row or column is preserved, and the maximum value used across the whole grid is as small as possible. Return the resulting matrix.

### Example

`grid = [[3,1],[2,5]]` → row 0 needs `label(1) < label(3)`, row 1 needs `label(2) < label(5)`, column 0 needs `label(3) < label(2)`... after processing cells in increasing original value (1, 2, 3, 5), the algorithm produces the matrix `[[2,1],[1,2]]`, whose maximum label is 2 — the smallest possible.

## Approach

Because all values in the original grid are distinct, there is no need to handle ties: process every cell in increasing order of its original value. Maintain `rowMax[i]` and `colMax[j]`, the largest new label assigned so far in row `i` / column `j`. When processing a cell `(i, j)`, its new label must be strictly greater than every previously processed cell sharing its row or column, so assign `max(rowMax[i], colMax[j]) + 1`, then update both `rowMax[i]` and `colMax[j]` to that new value. Processing strictly by increasing original value guarantees the relative order constraint holds automatically and that labels grow as slowly as possible.

## C# Solution

```csharp
public class Solution 
{
    public int[][] MinScore(int[][] grid) 
    {
        int m = grid.Length, n = grid[0].Length;
        var ans = new int[m][];
        for (int i = 0; i < m; i++)
            ans[i] = new int[n];

        var cells = new List<(int val, int i, int j)>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                cells.Add((grid[i][j], i, j));

        cells.Sort((a, b) => a.val.CompareTo(b.val));

        int[] rowMax = new int[m];
        int[] colMax = new int[n];

        foreach (var (_, i, j) in cells)
        {
            int nextAvailable = Math.Max(rowMax[i], colMax[j]) + 1;
            ans[i][j] = nextAvailable;
            rowMax[i] = nextAvailable;
            colMax[j] = nextAvailable;
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(m * n * log(m * n))
- **Space:** O(m * n)
