# 1444. Number of Ways of Cutting a Pizza

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Matrix, Prefix Sum

## Problem

Given a rectangular `pizza` grid (rows of `'A'` for apple and `'.'` for empty) and an integer `k`, cut the pizza into `k` pieces using a sequence of horizontal or vertical straight cuts. Each cut removes a piece (the top rows or left columns) which must contain at least one apple, given to one person; the remaining piece keeps the rest for further cuts, and the final remaining piece must also contain at least one apple. Return the number of ways to perform the cuts, modulo `10^9 + 7`.

### Example

```
Input: pizza = ["A..","AAA","..."], k = 3
Output: 3
```

## Approach

Precompute a 2D suffix sum `apples[i][j]`, the number of apples in the region from row `i`, column `j` to the bottom-right corner. Define `dp[c][i][j]` as the number of ways to cut the remaining region starting at `(i, j)` into `c` pieces. The base case `dp[0][i][j]` is `1` if that whole remaining region has at least one apple (a valid final piece). For `c` pieces, try every horizontal cut point `i2 > i` and vertical cut point `j2 > j`: the sliced-off piece is valid (has an apple) exactly when the suffix apple count of the remaining region minus the suffix count starting at the cut point is positive; when valid, add `dp[c-1][i2][j]` (or `dp[c-1][i][j2]`) to the current count. The answer is `dp[k-1][0][0]`.

## C# Solution

```csharp
public class Solution
{
    public int Ways(string[] pizza, int k)
    {
        const int MOD = 1_000_000_007;
        int rows = pizza.Length, cols = pizza[0].Length;

        var apples = new int[rows + 1, cols + 1];
        for (int i = rows - 1; i >= 0; i--)
        {
            for (int j = cols - 1; j >= 0; j--)
            {
                apples[i, j] = (pizza[i][j] == 'A' ? 1 : 0)
                    + apples[i + 1, j] + apples[i, j + 1] - apples[i + 1, j + 1];
            }
        }

        var dp = new long[k, rows, cols];
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                dp[0, i, j] = apples[i, j] > 0 ? 1 : 0;

        for (int c = 1; c < k; c++)
        {
            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    long ways = 0;

                    for (int i2 = i + 1; i2 < rows; i2++)
                        if (apples[i, j] - apples[i2, j] > 0)
                            ways = (ways + dp[c - 1, i2, j]) % MOD;

                    for (int j2 = j + 1; j2 < cols; j2++)
                        if (apples[i, j] - apples[i, j2] > 0)
                            ways = (ways + dp[c - 1, i, j2]) % MOD;

                    dp[c, i, j] = ways;
                }
            }
        }

        return (int)dp[k - 1, 0, 0];
    }
}
```

## Complexity

- **Time:** `O(k * rows * cols * (rows + cols))`.
- **Space:** `O(k * rows * cols)` for the DP table.
