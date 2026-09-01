# 1463. Cherry Pickup II

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given a `rows x cols` `grid` of cherry counts, two robots start at the top row — one at column `0`, the other at column `cols - 1`. Each move, both robots simultaneously advance one row down, each choosing to move to the same column, or one column left/right. Both robots collect the cherries in the cells they land on (a cell visited by both counts only once). Return the maximum cherries collectible by the time both robots reach the bottom row.

### Example

```
Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output: 24
```

## Approach

Use memoized recursion on `(row, col1, col2)` representing the two robots' current columns at a given row. At each step, collect the cherries in both cells (once, if they coincide), then recurse into all `3 x 3 = 9` combinations of moves for the next row, taking the best result. The base case is the last row, where no further moves are possible.

## C# Solution

```csharp
public class Solution
{
    public int CherryPickup(int[][] grid)
    {
        int rows = grid.Length, cols = grid[0].Length;
        var memo = new int[rows, cols, cols];
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                for (int k = 0; k < cols; k++)
                    memo[i, j, k] = int.MinValue;

        return Dfs(0, 0, cols - 1, grid, memo);
    }

    private int Dfs(int row, int col1, int col2, int[][] grid, int[,,] memo)
    {
        int rows = grid.Length, cols = grid[0].Length;
        if (col1 < 0 || col1 >= cols || col2 < 0 || col2 >= cols) return int.MinValue / 2;
        if (memo[row, col1, col2] != int.MinValue) return memo[row, col1, col2];

        int cherries = grid[row][col1];
        if (col1 != col2) cherries += grid[row][col2];

        if (row == rows - 1)
        {
            memo[row, col1, col2] = cherries;
            return cherries;
        }

        int best = int.MinValue / 2;
        for (int d1 = -1; d1 <= 1; d1++)
            for (int d2 = -1; d2 <= 1; d2++)
                best = Math.Max(best, Dfs(row + 1, col1 + d1, col2 + d2, grid, memo));

        cherries += best;
        memo[row, col1, col2] = cherries;
        return cherries;
    }
}
```

## Complexity

- **Time:** `O(rows * cols^2 * 9)`.
- **Space:** `O(rows * cols^2)` for the memo table.
