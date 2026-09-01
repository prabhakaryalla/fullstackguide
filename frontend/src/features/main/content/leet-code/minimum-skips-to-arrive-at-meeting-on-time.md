# 1883. Minimum Skips to Arrive at Meeting On Time

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given road distances `dist[i]`, a constant `speed`, and a deadline `hoursBefore`, you travel each road at the given speed; you may rest until the next whole hour after any road except the last, or skip that rest to continue immediately. Return the minimum number of rests you must skip to arrive within `hoursBefore`, or `-1` if impossible even skipping every rest.

### Example

```
Input: dist = [1,3,2], speed = 4, hoursBefore = 2
Output: 1
```

## Approach

Let `dp[i][j]` be the minimum arrival time (a real number, in hours, not yet rounded) after completing the first `i` roads having skipped exactly `j` rests so far. Transitioning to road `i`: if this rest is skipped (`j` increases by one relative to `dp[i-1][j-1]`), the road starts immediately at that fractional time; if not skipped, the road starts only after rounding `dp[i-1][j]` up to the next whole hour. Either way, add `dist[i-1] / speed` for the road itself. After filling the table, the answer is the smallest `j` for which `dp[n][j] <= hoursBefore` (the very last arrival needs no further rounding since no more travel follows).

## C# Solution

```csharp
public class Solution
{
    public int MinSkips(int[] dist, int speed, int hoursBefore)
    {
        int n = dist.Length;
        const double Eps = 1e-9;
        var dp = new double[n + 1, n + 1];
        for (int i = 0; i <= n; i++)
            for (int j = 0; j <= n; j++)
                dp[i, j] = double.MaxValue;
        dp[0, 0] = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 0; j <= i; j++)
            {
                if (dp[i - 1, j] != double.MaxValue)
                {
                    double noSkip = Math.Ceiling(dp[i - 1, j] - Eps) + (double)dist[i - 1] / speed;
                    dp[i, j] = Math.Min(dp[i, j], noSkip);
                }

                if (j >= 1 && dp[i - 1, j - 1] != double.MaxValue)
                {
                    double skip = dp[i - 1, j - 1] + (double)dist[i - 1] / speed;
                    dp[i, j] = Math.Min(dp[i, j], skip);
                }
            }
        }

        for (int j = 0; j <= n; j++)
        {
            if (dp[n, j] <= hoursBefore + Eps) return j;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP table.
