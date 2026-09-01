# 714. Best Time to Buy and Sell Stock with Transaction Fee

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy

## Problem

Given an array `prices` where `prices[i]` is the stock price on day `i`, and an integer `fee` representing a transaction fee, return the maximum profit achievable with unlimited transactions, where each completed transaction (a buy followed by a sell) incurs the fee once.

### Example

```
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
```

## Approach

Track two rolling states while scanning prices: `cash`, the maximum profit when not currently holding a stock, and `hold`, the maximum profit when currently holding one. Each day, `cash` can either stay the same or come from selling a held stock (subtracting the fee), and `hold` can either stay the same or come from buying using previously available cash.

## C# Solution

```csharp
public class Solution
{
    public int MaxProfit(int[] prices, int fee)
    {
        int cash = 0, hold = -prices[0];

        for (int i = 1; i < prices.Length; i++)
        {
            cash = Math.Max(cash, hold + prices[i] - fee);
            hold = Math.Max(hold, cash - prices[i]);
        }

        return cash;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
