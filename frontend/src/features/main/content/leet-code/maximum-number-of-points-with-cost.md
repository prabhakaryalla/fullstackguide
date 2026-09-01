# 1937. Maximum Number of Points with Cost

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

Given an `m x n` integer matrix `points`, you pick exactly one cell per row to maximize the total score. Picking cell `(r, c)` after having picked `(r-1, prevCol)` in the previous row scores `points[r][c] - abs(c - prevCol)` (a penalty for horizontal distance between consecutive picks); the first row's picks have no penalty. Return the maximum total score.

### Example

```
Input: points = [[1,2,3],[1,5,1],[3,1,1]]
Output: 9
Explanation: Choose points[0][2]=3, points[1][1]=5 (penalty 1), points[2][0]=3 (penalty 1) -> 3 + (5-1) + (3-1) = 9.
```

### Constraints

- `m == points.length`
- `n == points[r].length`
- `1 <= m, n <= 10^5`
- `1 <= m * n <= 10^5`
- `0 <= points[r][c] <= 10^5`

## Approach

Naively this is `O(m * n^2)`, too slow. Instead, note `dp[r][c] = points[r][c] + max over prevCol of (dp[r-1][prevCol] - |c - prevCol|)`. Split the absolute value into two cases: for `prevCol <= c`, the term is `dp[r-1][prevCol] - c + prevCol`, so track a running prefix maximum of `dp[r-1][prevCol] + prevCol` while scanning left to right; for `prevCol >= c`, the term is `dp[r-1][prevCol] + c - prevCol`, tracked via a running suffix maximum of `dp[r-1][prevCol] - prevCol` while scanning right to left. Combine both passes per row to get `dp[r][c]` in `O(n)` per row, `O(m * n)` overall.

## C# Solution

```csharp
public class Solution
{
    public long MaxPoints(int[][] points)
    {
        int m = points.Length, n = points[0].Length;
        long[] dp = new long[n];
        for (int c = 0; c < n; c++) dp[c] = points[0][c];

        for (int r = 1; r < m; r++)
        {
            long[] leftPass = new long[n];
            long best = long.MinValue;
            for (int c = 0; c < n; c++)
            {
                best = Math.Max(best, dp[c] + c);
                leftPass[c] = best - c;
            }

            long[] rightPass = new long[n];
            best = long.MinValue;
            for (int c = n - 1; c >= 0; c--)
            {
                best = Math.Max(best, dp[c] - c);
                rightPass[c] = best + c;
            }

            long[] newDp = new long[n];
            for (int c = 0; c < n; c++)
            {
                newDp[c] = points[r][c] + Math.Max(leftPass[c], rightPass[c]);
            }

            dp = newDp;
        }

        long answer = long.MinValue;
        foreach (long v in dp) answer = Math.Max(answer, v);
        return answer;
    }
}
```

## Complexity

- **Time:** `O(m * n)` — two linear passes per row.
- **Space:** `O(n)` for the dp arrays.
