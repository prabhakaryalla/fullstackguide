# 901. Online Stock Span

**Difficulty:** Medium
**Category:** Stack, Design, Monotonic Stack, Data Stream

## Problem

Design an algorithm that collects the daily price quotes for a stock and returns the *span* of that stock's price for the current day — the maximum number of consecutive days (starting from today and going backward) for which the price was less than or equal to today's price.

### Example

```
Input: prices = [100,80,60,70,60,75,85]
Output: [1,1,1,2,1,4,6]
```

## Approach

Maintain a stack of `(price, span)` pairs. For each new price, pop every entry whose price is less than or equal to the new price, accumulating their spans, then push the new price with `span = 1 + accumulated span`. The stack stays monotonically decreasing in price, so each entry is pushed and popped at most once.

## C# Solution

```csharp
public class StockSpanner
{
    private readonly Stack<(int price, int span)> stack = new();

    public int Next(int price)
    {
        int span = 1;

        while (stack.Count > 0 && stack.Peek().price <= price)
        {
            span += stack.Pop().span;
        }

        stack.Push((price, span));
        return span;
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per call.
- **Space:** `O(n)` for the stack across all calls.
