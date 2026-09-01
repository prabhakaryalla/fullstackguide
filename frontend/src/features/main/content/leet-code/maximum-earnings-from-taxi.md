# 2008. Maximum Earnings From Taxi

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Dynamic Programming, Sorting

## Problem

There are `n` points on a road numbered `1` to `n`. You are driving a taxi and are given a 2D array `rides`, where `rides[i] = [starti, endi, tipi]` means a passenger wants to go from `starti` to `endi` and will pay `endi - starti + tipi` dollars. You can only carry one passenger at a time, and cannot pick up a new passenger until the current ride has ended (a ride ending at point `p` and another starting at point `p` are compatible). Return *the maximum amount of money you can earn*.

## Approach

This is a weighted interval scheduling problem solved with dynamic programming over positions `1..n`. Group rides by their `end` point. Let `dp[i]` be the maximum earnings achievable using only positions up to `i`. Then:

```
dp[i] = max(dp[i - 1], max over rides ending at i of dp[start] + (end - start + tip))
```

`dp[0] = 0`, and the answer is `dp[n]`.

## C# Solution

```csharp
public class Solution
{
    public long MaxTaxiEarnings(int n, int[][] rides)
    {
        var ridesByEnd = new List<(int start, int tip)>[n + 1];
        for (int i = 0; i <= n; i++) ridesByEnd[i] = new List<(int, int)>();

        foreach (var ride in rides)
            ridesByEnd[ride[1]].Add((ride[0], ride[2]));

        var dp = new long[n + 1];
        for (int i = 1; i <= n; i++)
        {
            dp[i] = dp[i - 1];
            foreach (var (start, tip) in ridesByEnd[i])
                dp[i] = Math.Max(dp[i], dp[start] + (i - start) + tip);
        }

        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n + rides.Length)`.
- **Space:** `O(n + rides.Length)` for the bucketed rides and `dp` array.
