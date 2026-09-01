# 123. Best Time to Buy and Sell Stock III

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given an array `prices` where `prices[i]` is the price of a stock on day `i`. Find the maximum profit achievable using **at most two** transactions (you must sell before buying again).

### Example 1

```
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: buy on day 4 (price 0), sell on day 6 (price 3), profit 3; buy on day 7 (price 1), sell on day 8 (price 4), profit 3; total 6.
```

### Example 2

```
Input: prices = [1,2,3,4,5]
Output: 4
```

### Constraints

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^5`

## Approach

Track four running values as you scan once: `buy1` (max profit after first buy, i.e. negative cost), `sell1` (max profit after first sell), `buy2` (max profit after second buy, reusing profit from the first sell), and `sell2` (max profit after second sell). Each value only ever improves (gets less negative / larger), so a single forward pass suffices.

## C# Solution

```csharp
public class Solution
{
    public int MaxProfit(int[] prices)
    {
        int buy1 = int.MinValue, sell1 = 0;
        int buy2 = int.MinValue, sell2 = 0;

        foreach (int price in prices)
        {
            buy1 = Math.Max(buy1, -price);
            sell1 = Math.Max(sell1, buy1 + price);
            buy2 = Math.Max(buy2, sell1 - price);
            sell2 = Math.Max(sell2, buy2 + price);
        }

        return sell2;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
