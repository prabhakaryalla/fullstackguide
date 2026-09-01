# 568. Maximum Vacation Days

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `flights` connectivity matrix between `n` cities, a `days` matrix where `days[i][j]` is the vacation days available in city `i` during week `j`, and starting in city `0`, return the maximum vacation days achievable over all weeks, where you may fly to a directly connected city at the start of each week (or stay in your current city) and spend that week's available vacation days there.

### Example

```
Input: flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[1,3,1],[6,0,3],[3,3,3]]
Output: 12
```

## Approach

Use dynamic programming where `dp[city]` after processing week `w` is the maximum vacation days accumulated if you are currently in `city`. For each week, transition from every city with a known best total to every reachable city (itself, or any city with a direct flight), adding that destination's vacation days for the week, and keep the best total for each destination across all possible sources. The answer is the maximum value across all cities after processing every week.

## C# Solution

```csharp
public class Solution
{
    public int MaxVacationDays(int[][] flights, int[][] days)
    {
        int n = flights.Length;
        int weeks = days[0].Length;

        var dp = new int[n];
        Array.Fill(dp, int.MinValue);
        dp[0] = days[0][0];

        for (int week = 1; week < weeks; week++)
        {
            var next = new int[n];
            Array.Fill(next, int.MinValue);

            for (int city = 0; city < n; city++)
            {
                if (dp[city] == int.MinValue) continue;

                for (int dest = 0; dest < n; dest++)
                {
                    if (dest != city && flights[city][dest] == 0) continue;

                    int total = dp[city] + days[dest][week];
                    next[dest] = Math.Max(next[dest], total);
                }
            }

            dp = next;
        }

        return dp.Max();
    }
}
```

## Complexity

- **Time:** `O(weeks * n^2)`.
- **Space:** `O(n)` for the DP arrays.
