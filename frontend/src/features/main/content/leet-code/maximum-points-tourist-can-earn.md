# 3332. Maximum Points Tourist Can Earn

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Matrix

## Problem

You are given integers `n` and `k`, and 2D arrays `stayScore` and `travelScore`. A tourist visits a country with `n` fully-connected cities over exactly `k` days, starting from any city.

Each day, the tourist either:
- Stays in the current city `curr`, earning `stayScore[i][curr]` on day `i`, or
- Moves to another city `dest`, earning `travelScore[curr][dest]`.

Return the maximum total points the tourist can earn.

### Example

Input: `n = 2, k = 1, stayScore = [[2,3]], travelScore = [[0,2],[1,0]]`

Output: `3`

Explanation: Starting in city 1 and staying earns 3 points.

## Approach

Dynamic programming over days: let `dp[city]` be the best score achievable ending in `city` after the days processed so far, initialized to 0 for all cities (any starting city is free). For each day, compute a new `dp` array where, from every `curr` with a known best score, we can:
- Stay: contributes to `ndp[curr]`.
- Move to any `dest != curr`: contributes to `ndp[dest]`.

Take the max over all cities in `dp` after processing all `k` days.

## C# Solution

```csharp
public class Solution 
{
    public int MaxScore(int n, int k, int[][] stayScore, int[][] travelScore) 
    {
        long[] dp = new long[n];

        for (int day = 0; day < k; day++)
        {
            long[] ndp = new long[n];
            for (int j = 0; j < n; j++) ndp[j] = long.MinValue;

            for (int curr = 0; curr < n; curr++)
            {
                long cur = dp[curr];
                long stay = cur + stayScore[day][curr];
                if (stay > ndp[curr]) ndp[curr] = stay;

                for (int dest = 0; dest < n; dest++)
                {
                    if (dest == curr) continue;
                    long mv = cur + travelScore[curr][dest];
                    if (mv > ndp[dest]) ndp[dest] = mv;
                }
            }

            dp = ndp;
        }

        long ans = 0;
        foreach (long v in dp)
        {
            if (v > ans) ans = v;
        }
        return (int)ans;
    }
}
```

## Complexity

- **Time:** O(k * n^2).
- **Space:** O(n) for the DP arrays.
