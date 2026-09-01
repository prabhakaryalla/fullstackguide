# 427. Construct Quad Tree

**Difficulty:** Medium
**Category:** Array, Tree, Divide and Conquer, Matrix

## Problem

Given an `n x n` binary matrix `grid` where `n` is a power of two, construct a quad-tree representation where each leaf node represents a region of uniform value (all `0`s or all `1`s), and internal nodes split their region into four equal quadrants.

### Example

```
Input: grid = [[0,1],[1,0]]
Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
```

### Constraints

- `n == grid.length == grid[i].length`
- `n == 2^x` where `0 <= x <= 6`

## Approach

Recursively check whether the current square region is entirely one value. If so, create a leaf node for it. Otherwise, split the region into four equal quadrants, recursively build a subtree for each, and combine them under an internal node.

## C# Solution

```csharp
public class Solution
{
    public Node Construct(int[][] grid)
    {
        return Build(grid, 0, 0, grid.Length);
    }

    private Node Build(int[][] grid, int row, int col, int size)
    {
        bool allSame = true;
        int first = grid[row][col];

        for (int r = row; r < row + size && allSame; r++)
        {
            for (int c = col; c < col + size; c++)
            {
                if (grid[r][c] != first)
                {
                    allSame = false;
                    break;
                }
            }
        }

        if (allSame)
            return new Node(first == 1, true);

        int half = size / 2;
        var topLeft = Build(grid, row, col, half);
        var topRight = Build(grid, row, col + half, half);
        var bottomLeft = Build(grid, row + half, col, half);
        var bottomRight = Build(grid, row + half, col + half, half);

        return new Node(true, false, topLeft, topRight, bottomLeft, bottomRight);
    }
}
```

## Complexity

- **Time:** `O(n^2 log n)` — each level of recursion scans its region to check uniformity.
- **Space:** `O(log n)` for the recursion stack, plus the output tree.
