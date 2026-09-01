# 1335. Minimum Difficulty of a Job Schedule

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given `jobDifficulty` and an integer `d`, split the jobs (in order) into exactly `d` non-empty contiguous days, where each day's difficulty is the maximum job difficulty that day, and return the minimum possible total difficulty, or `-1` if there are fewer jobs than days.

### Example

```
Input: jobDifficulty = [6,5,4,3,2,1], d = 2
Output: 7
```

## Approach

Use dynamic programming over `dp[day][i]` = the minimum total difficulty to schedule the first `i` jobs across `day` days. For each candidate split point, extend the previous day's boundary by trying every possible last-day start, tracking the running maximum difficulty within that final segment to avoid recomputing it from scratch.

## C# Solution

```csharp
public class Solution
{
    public int MinDifficulty(int[] jobDifficulty, int d)
    {
        int n = jobDifficulty.Length;
        if (n < d) return -1;

        const int INF = int.MaxValue / 2;
        var dp = new int[d + 1, n + 1];
        for (int day = 0; day <= d; day++)
            for (int i = 0; i <= n; i++)
                dp[day, i] = INF;

        dp[0, 0] = 0;

        for (int day = 1; day <= d; day++)
        {
            for (int i = day; i <= n; i++)
            {
                int maxDiff = 0;
                for (int k = i; k >= day; k--)
                {
                    maxDiff = Math.Max(maxDiff, jobDifficulty[k - 1]);
                    if (dp[day - 1, k - 1] + maxDiff < dp[day, i])
                    {
                        dp[day, i] = dp[day - 1, k - 1] + maxDiff;
                    }
                }
            }
        }

        return dp[d, n];
    }
}
```

## Complexity

- **Time:** `O(d * n^2)`.
- **Space:** `O(d * n)` for the DP table.
