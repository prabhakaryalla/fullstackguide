# 64. Minimum Path Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given a `m x n` grid filled with non-negative numbers, find a path from top-left to bottom-right, which minimizes the sum of all numbers along its path. You can only move either down or right at any point in time.

### Example 1

```
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.
```

```mermaid
graph LR
    A["1"] --> B["3"] --> C["1"]
    C --> F["1"]
    F --> I["1"]
    style A fill:#4caf50,color:#fff
    style C fill:#4caf50,color:#fff
    style F fill:#4caf50,color:#fff
    style I fill:#4caf50,color:#fff
```

### Example 2

```
Input: grid = [[1,2,3],[4,5,6]]
Output: 12
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 200`

## Approach

`dp[col]` holds the minimum path sum to reach the current row's column. For each cell, the minimum cost to arrive is `grid[row][col] + min(dp[col] /* from above */, dp[col-1] /* from left */)`. The first row/column are seeded by simple prefix sums since there's only one way to reach them.

## C# Solution

```csharp
public class Solution
{
    public int MinPathSum(int[][] grid)
    {
        int m = grid.Length, n = grid[0].Length;
        var dp = new int[n];
        dp[0] = grid[0][0];

        for (int col = 1; col < n; col++)
        {
            dp[col] = dp[col - 1] + grid[0][col];
        }

        for (int row = 1; row < m; row++)
        {
            dp[0] += grid[row][0];

            for (int col = 1; col < n; col++)
            {
                dp[col] = grid[row][col] + Math.Min(dp[col], dp[col - 1]);
            }
        }

        return dp[n - 1];
    }
}
```

## Complexity

- **Time:** `O(m * n)` — fills the DP table once.
- **Space:** `O(n)` — a single row of the DP table.
