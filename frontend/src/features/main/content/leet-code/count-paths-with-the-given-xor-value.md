# 3393. Count Paths With the Given XOR Value

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix, Bit Manipulation

## Problem

Given an `m x n` grid and integer `k`, count the number of paths from the top-left to the bottom-right cell (moving only right or down) such that the XOR of all values along the path equals `k`. Return the count modulo $10^9+7$.

### Example

Input: `grid = [[2,1],[1,2]]`, `k = 2`
Output: number of down/right paths whose cumulative XOR equals 2.

## Approach

Use DP where `dp[i][j]` is a dictionary mapping an XOR value to the number of paths reaching cell `(i, j)` with that cumulative XOR. Transition from the cell above and the cell to the left, XOR-ing in `grid[i][j]`, merging counts. The answer is `dp[m-1][n-1][k]`.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1000000007;

    public int CountPathsWithXorValue(int[][] grid, int k) 
    {
        int m = grid.Length, n = grid[0].Length;
        var dp = new Dictionary<int, long>[m, n];

        for (int i = 0; i < m; i++) 
        {
            for (int j = 0; j < n; j++) 
            {
                dp[i, j] = new Dictionary<int, long>();
                int val = grid[i][j];

                if (i == 0 && j == 0) 
                {
                    dp[i, j][val] = 1;
                    continue;
                }

                if (i > 0) 
                {
                    foreach (var kvp in dp[i - 1, j]) 
                    {
                        int x = kvp.Key ^ val;
                        dp[i, j][x] = (dp[i, j].GetValueOrDefault(x, 0) + kvp.Value) % MOD;
                    }
                }
                if (j > 0) 
                {
                    foreach (var kvp in dp[i, j - 1]) 
                    {
                        int x = kvp.Key ^ val;
                        dp[i, j][x] = (dp[i, j].GetValueOrDefault(x, 0) + kvp.Value) % MOD;
                    }
                }
            }
        }

        return (int)dp[m - 1, n - 1].GetValueOrDefault(k, 0);
    }
}
```

## Complexity

- **Time:** O(m * n * maxXorStates)
- **Space:** O(m * n * maxXorStates)
