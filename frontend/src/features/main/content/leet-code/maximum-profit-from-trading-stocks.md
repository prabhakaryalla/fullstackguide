# 2291. Maximum Profit From Trading Stocks

**Difficulty:** Medium
**Category:** Array, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer `budget`, and arrays `present` and `future` where `present[i]` is the current price of stock `i` and `future[i]` is its price tomorrow. You may buy any subset of stocks today as long as their total cost does not exceed `budget` (each stock bought at most once), sell every bought stock tomorrow at its future price, and keep the rest of your budget unspent. Return the maximum amount of money you can end up with tomorrow.

### Example

`present = [5,4,6,2,3], future = [8,5,4,3,5], budget = 10` → buying stocks 0 and 3 costs `5+2=7 <= 10`, yields future value `8+3=11`, plus the unspent `3` gives `14`, which is optimal for this input.

## Approach

Only stocks with `future[i] > present[i]` are worth buying (buying a stock that doesn't gain value can only be replaced by not buying it, keeping the cash instead). This reduces to a classic 0/1 knapsack: for each profitable stock, its "weight" is `present[i]` and its "value" is the profit `future[i] - present[i]`. Compute the maximum total profit achievable within `budget` using a 1D knapsack DP, then the final answer is `budget + maxProfit` (unspent budget plus profit from bought stocks, since money spent on stocks is exactly recovered plus profit when sold).

## C# Solution

```csharp
public class Solution 
{
    public int MaximumProfit(int[] present, int[] future, int budget) 
    {
        int[] dp = new int[budget + 1];

        for (int i = 0; i < present.Length; i++)
        {
            int cost = present[i];
            int profit = future[i] - present[i];
            if (profit <= 0)
                continue;

            for (int b = budget; b >= cost; b--)
                dp[b] = Math.Max(dp[b], dp[b - cost] + profit);
        }

        return budget + dp[budget];
    }
}
```

## Complexity

- **Time:** O(n * budget)
- **Space:** O(budget)
