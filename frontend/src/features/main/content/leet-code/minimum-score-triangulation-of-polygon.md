# 1039. Minimum Score Triangulation of Polygon

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given the values of a convex polygon's vertices in order as `values`, triangulate it into `values.Length - 2` triangles using non-intersecting diagonals. The score of a triangulation is the sum of each triangle's vertex-value product. Return the smallest possible total score.

### Example

```
Input: values = [1,2,3]
Output: 6
```

## Approach

This is a classic interval DP. Let `dp[i][j]` be the minimum triangulation score for the sub-polygon formed by vertices `i..j`. For every choice of a third vertex `k` strictly between `i` and `j`, the triangle `(i, k, j)` splits the sub-polygon into two smaller ones, `i..k` and `k..j`, whose optimal scores are already known: `dp[i][j] = min over k of dp[i][k] + dp[k][j] + values[i] * values[k] * values[j]`. Filling this table by increasing sub-polygon length yields the answer at `dp[0][n-1]`.

## C# Solution

```csharp
public class Solution
{
    public int MinScoreTriangulation(int[] values)
    {
        int n = values.Length;
        var dp = new int[n, n];

        for (int length = 2; length < n; length++)
        {
            for (int i = 0; i + length < n; i++)
            {
                int j = i + length;
                int best = int.MaxValue;

                for (int k = i + 1; k < j; k++)
                {
                    int score = dp[i, k] + dp[k, j] + values[i] * values[k] * values[j];
                    best = Math.Min(best, score);
                }

                dp[i, j] = best;
            }
        }

        return dp[0, n - 1];
    }
}
```

## Complexity

- **Time:** `O(n^3)` — three nested loops over vertex indices.
- **Space:** `O(n^2)` for the DP table.
