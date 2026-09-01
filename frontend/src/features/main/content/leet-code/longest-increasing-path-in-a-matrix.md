# 329. Longest Increasing Path in a Matrix

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Depth-First Search, Graph, Topological Sort, Memoization, Matrix

## Problem

Given an `m x n` integer matrix, return the length of the longest increasing path, where you can move in four directions (up, down, left, right); you may not move diagonally or move outside the boundary.

### Example

```
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].
```

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `0 <= matrix[i][j] <= 2^31 - 1`

## Approach

Run a depth-first search from every cell, following only moves to strictly larger neighbors, and memoize the longest increasing path starting at each cell so it is computed only once. The overall answer is the maximum memoized value across all cells.

## C# Solution

```csharp
public class Solution
{
    private static readonly int[][] Directions = { new[] { 1, 0 }, new[] { -1, 0 }, new[] { 0, 1 }, new[] { 0, -1 } };

    public int LongestIncreasingPath(int[][] matrix)
    {
        int rows = matrix.Length, cols = matrix[0].Length;
        var memo = new int[rows, cols];
        int longest = 0;

        for (int r = 0; r < rows; r++)
        {
            for (int c = 0; c < cols; c++)
            {
                longest = Math.Max(longest, Dfs(matrix, r, c, memo));
            }
        }

        return longest;
    }

    private int Dfs(int[][] matrix, int r, int c, int[,] memo)
    {
        if (memo[r, c] != 0) return memo[r, c];

        int rows = matrix.Length, cols = matrix[0].Length;
        int best = 1;

        foreach (var dir in Directions)
        {
            int nr = r + dir[0], nc = c + dir[1];
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            if (matrix[nr][nc] <= matrix[r][c]) continue;

            best = Math.Max(best, 1 + Dfs(matrix, nr, nc, memo));
        }

        memo[r, c] = best;
        return best;
    }
}
```

## Complexity

- **Time:** `O(rows * cols)` — each cell's longest path is computed once and memoized.
- **Space:** `O(rows * cols)` for the memoization table and recursion stack.
