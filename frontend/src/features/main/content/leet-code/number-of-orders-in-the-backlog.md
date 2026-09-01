# 1801. Number of Orders in the Backlog

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue), Simulation

## Problem

You are given a 2D array `orders`, where `orders[i] = [price, amount, orderType]`. An order of type `0` (buy) is executed against the lowest-priced sell order in the backlog if its price is greater than or equal to that sell price; an order of type `1` (sell) is executed against the highest-priced buy order in the backlog if its price is less than or equal to that buy price. Any unmatched amount is added to the backlog for its side. Return the total amount of orders remaining in the backlog, modulo `1e9 + 7`.

### Example

```
Input: orders = [[10,5,0],[15,2,1],[25,1,1],[30,4,0]]
Output: 6
Explanation: The buy order for 5 at price 10 and the sell orders don't cross (10 < 15), so they stay.
The buy order for 4 at price 30 matches the sell at 15 (2) then the sell at 25 (1), leaving 1 in the backlog.
Backlog: buy 5@10, buy 1@30 -> total 6.
```

## Approach

Maintain two heaps: a max-heap of buy orders keyed by price, and a min-heap of sell orders keyed by price. For each incoming order, repeatedly match it against the opposite heap's best price while both have remaining amount and the price condition holds, reducing amounts in place (mutating the remaining amount doesn't change heap ordering since the key is price). Push any leftover amount onto its own heap. After processing all orders, sum the remaining amounts across both heaps modulo `1e9 + 7`.

## C# Solution

```csharp
public class Solution
{
    public int GetNumberOfBacklogOrders(int[][] orders)
    {
        const int Mod = 1_000_000_007;
        var buy = new PriorityQueue<int[], int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        var sell = new PriorityQueue<int[], int>();

        foreach (var order in orders)
        {
            int price = order[0], amount = order[1], type = order[2];

            if (type == 0)
            {
                while (amount > 0 && sell.Count > 0 && sell.Peek()[0] <= price)
                {
                    var top = sell.Peek();
                    int matched = Math.Min(amount, top[1]);
                    amount -= matched;
                    top[1] -= matched;
                    if (top[1] == 0) sell.Dequeue();
                }
                if (amount > 0) buy.Enqueue(new[] { price, amount }, price);
            }
            else
            {
                while (amount > 0 && buy.Count > 0 && buy.Peek()[0] >= price)
                {
                    var top = buy.Peek();
                    int matched = Math.Min(amount, top[1]);
                    amount -= matched;
                    top[1] -= matched;
                    if (top[1] == 0) buy.Dequeue();
                }
                if (amount > 0) sell.Enqueue(new[] { price, amount }, price);
            }
        }

        long total = 0;
        while (buy.Count > 0) total += buy.Dequeue()[1];
        while (sell.Count > 0) total += sell.Dequeue()[1];

        return (int)(total % Mod);
    }
}
```

## Complexity

- **Time:** `O(n log n)` — each order is pushed/popped from a heap at most once.
- **Space:** `O(n)` for the two heaps.
