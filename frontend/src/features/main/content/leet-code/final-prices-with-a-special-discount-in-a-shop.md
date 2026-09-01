# 1475. Final Prices With a Special Discount in a Shop

**Difficulty:** Easy
**Category:** Array, Stack, Monotonic Stack

## Problem

Given an array `prices`, for each item `i`, find the first later item `j > i` such that `prices[j] <= prices[i]`; the discounted price of item `i` becomes `prices[i] - prices[j]`. If no such `j` exists, the price stays unchanged. Return the final prices.

### Example

```
Input: prices = [8,4,6,2,3]
Output: [4,2,4,2,3]
```

## Approach

Use a monotonic stack of indices with non-decreasing prices. For each new price, pop any stacked index whose price is greater than or equal to the current price — that popped item just found its discount, equal to the current price. Push the current index onto the stack afterward. Any indices remaining on the stack at the end never found a discount and keep their original price.

## C# Solution

```csharp
public class Solution
{
    public int[] FinalPrices(int[] prices)
    {
        int n = prices.Length;
        var result = (int[])prices.Clone();
        var stack = new Stack<int>();

        for (int i = 0; i < n; i++)
        {
            while (stack.Count > 0 && prices[stack.Peek()] >= prices[i])
            {
                int idx = stack.Pop();
                result[idx] = prices[idx] - prices[i];
            }

            stack.Push(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the stack.
