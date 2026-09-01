# 3573. Best Time to Buy and Sell Stock V

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given an integer array `prices` where `prices[i]` is the price of a stock on day `i`. You may perform any number of transactions, where each transaction is either a **long** position (buy the stock, then later sell it, gaining `sellPrice - buyPrice`) or a **short** position (sell the stock first, then later buy it back, gaining `sellPrice - buyPrice` where `sellPrice` is the price when you opened the short). At any time you may hold at most one open position, and you must close your current position before opening a new one (closing and opening can happen on the same day). Return the maximum total profit achievable.

### Example

`prices = [1,4,2]`. Open a long on day `0` at price `1` and close it on day `1` at price `4`, for a profit of `3`. Then open a short on day `1` at price `4` and close it on day `2` at price `2`, for a profit of `2`. Total profit: `3 + 2 = 5`.

## Approach

Use dynamic programming with three running states as we scan the prices from left to right: `noPosition` (no open position), `longPosition` (currently holding a long), and `shortPosition` (currently holding a short). For each day's price, compute the new value of each state from the previous day's values (using temporary variables so all three updates see the same "previous day" snapshot):
- `noPosition` can come from staying with no position, closing a long (add price), or closing a short (subtract price).
- `longPosition` can come from staying long, or opening a new long from `noPosition` (subtract price).
- `shortPosition` can come from staying short, or opening a new short from `noPosition` (add price).

Initialize `noPosition = 0` and the other two states to a very small number (impossible), then return `noPosition` after processing every day.

## C# Solution

```csharp
public class Solution 
{
    public long MaximizeProfit(int[] prices) 
    {
        long noPosition = 0;
        long longPosition = long.MinValue / 2;
        long shortPosition = long.MinValue / 2;

        foreach (int price in prices)
        {
            long newNoPosition = Math.Max(noPosition, Math.Max(longPosition + price, shortPosition - price));
            long newLongPosition = Math.Max(longPosition, noPosition - price);
            long newShortPosition = Math.Max(shortPosition, noPosition + price);

            noPosition = newNoPosition;
            longPosition = newLongPosition;
            shortPosition = newShortPosition;
        }

        return noPosition;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
