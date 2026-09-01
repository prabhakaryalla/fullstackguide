# 741. Cherry Pickup

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given an `n x n` grid where `1` represents a cherry, `0` is empty, and `-1` is a blocked thorn cell, collect the maximum number of cherries possible by walking from `(0, 0)` to `(n-1, n-1)` (only moving right or down) and then back to `(0, 0)` (only moving left or up). A cell's cherry can only be collected once.

### Example

```
Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
Output: 5
```

## Approach

Model the round trip as two people walking simultaneously from `(0,0)` to `(n-1,n-1)`, since a path there and back is equivalent to two forward paths. Track both people's positions with the invariant that they've taken the same number of steps (`r1 + c1 == r2 + c2`), reducing the state to three coordinates instead of four. At each state, collect the cherry at both people's current cells (counted once if they coincide), then recursively try all 4 combinations of each person moving right or down, memoizing results to avoid recomputation. Any state landing on a blocked cell is invalid and contributes negative infinity.

## C# Solution

```csharp
public class Solution
{
    public int CherryPickup(int[][] grid)
    {
        int n = grid.Length;
        var dp = new int[n, n, n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                for (int k = 0; k < n; k++)
                    dp[i, j, k] = int.MinValue;

        int result = Dfs(grid, 0, 0, 0, dp, n);
        return Math.Max(result, 0);
    }

    private int Dfs(int[][] grid, int r1, int c1, int r2, int[,,] dp, int n)
    {
        int c2 = r1 + c1 - r2;

        if (r1 >= n || c1 >= n || r2 >= n || c2 >= n || grid[r1][c1] == -1 || grid[r2][c2] == -1)
            return int.MinValue;

        if (r1 == n - 1 && c1 == n - 1)
            return grid[r1][c1];

        if (dp[r1, c1, r2] != int.MinValue)
            return dp[r1, c1, r2];

        int cherries = grid[r1][c1];
        if (r1 != r2) cherries += grid[r2][c2];

        int best = int.MinValue;
        best = Math.Max(best, Dfs(grid, r1 + 1, c1, r2 + 1, dp, n));
        best = Math.Max(best, Dfs(grid, r1 + 1, c1, r2, dp, n));
        best = Math.Max(best, Dfs(grid, r1, c1 + 1, r2 + 1, dp, n));
        best = Math.Max(best, Dfs(grid, r1, c1 + 1, r2, dp, n));

        if (best == int.MinValue)
        {
            dp[r1, c1, r2] = int.MinValue;
            return int.MinValue;
        }

        dp[r1, c1, r2] = cherries + best;
        return dp[r1, c1, r2];
    }
}
```

## Complexity

- **Time:** `O(n^3)`.
- **Space:** `O(n^3)` for the memoization table.
