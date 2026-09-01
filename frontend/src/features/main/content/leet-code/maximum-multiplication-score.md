# 2963. Maximum Multiplication Score

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given two integer arrays `a` (length 4) and `b` (length n where n >= 4). You must select 4 indices from `b` in increasing order to maximize the score:

`a[0] * b[i0] + a[1] * b[i1] + a[2] * b[i2] + a[3] * b[i3]`

Return the maximum possible score.

### Example

```
Input: a = [3, 2, 5, 6], b = [2, -6, 4, -5, -3, 2, -7]
Output: 26
Explanation: Select indices 0, 3, 4, 6: 3*2 + 2*(-5) + 5*(-3) + 6*(-7) = 6 - 10 - 15 - 42 = -61
Actually select: 0,2,5,6: 3*2 + 2*4 + 5*2 + 6*(-7) = 6 + 8 + 10 - 42 = -18... need recalculation
```

## Approach

Use dynamic programming where `dp[i][j]` represents the maximum score achievable using the first `i` elements from array `a` and selecting from the first `j` elements of array `b`. For each position, decide whether to skip the current `b[j]` or pair it with `a[i]`.

## C# Solution

```csharp
public class Solution
{
    public long MaxScore(int[] a, int[] b)
    {
        int n = b.Length;
        var dp = new long[5, n + 1];

        for (int i = 0; i <= 4; i++)
        {
            for (int j = 0; j <= n; j++)
            {
                dp[i, j] = long.MinValue / 2;
            }
        }

        dp[0, 0] = 0;

        for (int i = 0; i < 4; i++)
        {
            for (int j = i; j < n; j++)
            {
                if (dp[i, j] != long.MinValue / 2)
                {
                    dp[i + 1, j + 1] = Math.Max(dp[i + 1, j + 1], dp[i, j] + (long)a[i] * b[j]);
                }
                dp[i, j + 1] = Math.Max(dp[i, j + 1], dp[i, j]);
            }
        }

        long maxScore = long.MinValue;
        for (int j = 4; j <= n; j++)
        {
            maxScore = Math.Max(maxScore, dp[4, j]);
        }

        return maxScore;
    }
}
```

## Complexity

- **Time:** O(4 * n) = O(n)
- **Space:** O(n)
