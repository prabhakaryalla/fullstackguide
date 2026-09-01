# 309. Best Time to Buy and Sell Stock with Cooldown

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an array `prices` where `prices[i]` is the price of a stock on day `i`, find the maximum profit achievable with as many transactions as desired, subject to: you cannot engage in multiple transactions at once (must sell before buying again), and after selling, you cannot buy on the next day (a one-day cooldown).

### Example

```
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: buy, sell, cooldown, buy, sell => 1 + 2 = 3
```

### Constraints

- `1 <= prices.length <= 5000`
- `0 <= prices[i] <= 1000`

## Approach

Track three rolling states while scanning prices: `hold` (max profit while holding a stock), `sold` (max profit on the day right after selling, entering cooldown), and `rest` (max profit while not holding and not in cooldown). Transition each day based on the previous day's states.

## C# Solution

```csharp
public class Solution
{
    public int MaxProfit(int[] prices)
    {
        int n = prices.Length;
        if (n == 0) return 0;

        int hold = -prices[0];
        int sold = 0;
        int rest = 0;

        for (int i = 1; i < n; i++)
        {
            int prevSold = sold;
            sold = hold + prices[i];
            hold = Math.Max(hold, rest - prices[i]);
            rest = Math.Max(rest, prevSold);
        }

        return Math.Max(sold, rest);
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the prices.
- **Space:** `O(1)` — only a few rolling variables.
