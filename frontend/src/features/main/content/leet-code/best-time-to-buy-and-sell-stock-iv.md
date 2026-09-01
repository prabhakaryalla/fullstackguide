# 188. Best Time to Buy and Sell Stock IV

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

Given an array `prices` and an integer `k`, find the maximum profit achievable using at most `k` transactions (generalizing Best Time to Buy and Sell Stock III from 2 transactions to `k`).

### Example

```
k = 2, prices = [3,2,6,5,0,3] -> 7
```

## Approach

Generalize the four-variable trick from the "at most 2 transactions" version into arrays of size `k`: `buy[t]` is the best profit after the `t`-th buy, `sell[t]` is the best profit after the `t`-th sell. A single forward pass updates all `2k` values; when `k` is large enough to exceed half the days, it's equivalent to unlimited transactions (handled as a shortcut for efficiency).

## C# Solution

```csharp
public class Solution
{
    public int MaxProfit(int k, int[] prices)
    {
        int n = prices.Length;
        if (n == 0 || k == 0) return 0;

        if (k >= n / 2) // unlimited-transactions shortcut
        {
            int profit = 0;
            for (int i = 1; i < n; i++)
            {
                if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
            }
            return profit;
        }

        var buy = new int[k + 1];
        var sell = new int[k + 1];
        Array.Fill(buy, int.MinValue);

        foreach (int price in prices)
        {
            for (int t = 1; t <= k; t++)
            {
                buy[t] = Math.Max(buy[t], sell[t - 1] - price);
                sell[t] = Math.Max(sell[t], buy[t] + price);
            }
        }

        return sell[k];
    }
}
```

## Complexity

- **Time:** `O(n * k)` — a nested loop over days and transaction counts.
- **Space:** `O(k)` — for the buy/sell arrays.
