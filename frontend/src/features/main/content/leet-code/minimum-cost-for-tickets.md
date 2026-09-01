# 983. Minimum Cost For Tickets

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given a sorted list of `days` you need to travel within a year and ticket `costs` for 1-day, 7-day, and 30-day passes, return the minimum total cost to cover all travel days.

### Example

```
Input: days = [1,4,6,7,8,20], costs = [2,7,15]
Output: 11
```

## Approach

Build a DP over every calendar day from `1` to the last travel day. Non-travel days simply copy the previous day's cost. For a travel day, the cheapest option is the minimum of: buying a 1-day pass (`dp[day-1] + costs[0]`), a 7-day pass covering the last 7 days (`dp[day-7] + costs[1]`), or a 30-day pass (`dp[day-30] + costs[2]`), clamping negative day indices to `0`.

## C# Solution

```csharp
public class Solution
{
    public int MincostTickets(int[] days, int[] costs)
    {
        var travelDays = new HashSet<int>(days);
        int lastDay = days[days.Length - 1];
        var dp = new int[lastDay + 1];

        for (int day = 1; day <= lastDay; day++)
        {
            if (!travelDays.Contains(day)) { dp[day] = dp[day - 1]; continue; }

            int cost1 = dp[day - 1] + costs[0];
            int cost7 = dp[Math.Max(0, day - 7)] + costs[1];
            int cost30 = dp[Math.Max(0, day - 30)] + costs[2];

            dp[day] = Math.Min(cost1, Math.Min(cost7, cost30));
        }

        return dp[lastDay];
    }
}
```

## Complexity

- **Time:** `O(lastDay)`.
- **Space:** `O(lastDay)`.
