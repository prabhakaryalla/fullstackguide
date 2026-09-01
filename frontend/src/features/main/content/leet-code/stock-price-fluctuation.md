# 2034. Stock Price Fluctuation

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Ordered Set, Heap (Priority Queue)

## Problem

Design a data structure to record stock prices at various timestamps and support querying the current, maximum, and minimum prices. Implement the `StockPrice` class:

- `Update(int timestamp, int price)` — updates the stock price at the given `timestamp` (a previously recorded timestamp's price may be corrected by calling this again).
- `Current()` — returns the stock price at the most recent timestamp seen so far.
- `Maximum()` — returns the highest recorded price so far (using the latest correction for each timestamp).
- `Minimum()` — returns the lowest recorded price so far (using the latest correction for each timestamp).

## Approach

Keep a dictionary mapping `timestamp -> price` so corrections can find and remove the old value. Keep a second dictionary mapping `price -> count of timestamps currently holding that price`, and a `SortedSet<int>` of distinct prices currently in use (added when a price's count becomes `1`, removed when it drops to `0`). On `Update`, if the timestamp already has a recorded price, decrement that old price's count (removing it from the sorted set if it hits zero) before recording the new price. Track the largest timestamp seen so `Current()` can look it up directly. `Maximum()` and `Minimum()` simply read the largest/smallest element of the sorted set.

## C# Solution

```csharp
public class StockPrice
{
    private readonly Dictionary<int, int> priceAt = new();
    private readonly Dictionary<int, int> priceCounts = new();
    private readonly SortedSet<int> distinctPrices = new();
    private int latestTimestamp = 0;

    public void Update(int timestamp, int price)
    {
        if (priceAt.TryGetValue(timestamp, out var oldPrice))
        {
            priceCounts[oldPrice]--;
            if (priceCounts[oldPrice] == 0)
            {
                priceCounts.Remove(oldPrice);
                distinctPrices.Remove(oldPrice);
            }
        }

        priceAt[timestamp] = price;
        priceCounts[price] = priceCounts.GetValueOrDefault(price) + 1;
        distinctPrices.Add(price);
        latestTimestamp = Math.Max(latestTimestamp, timestamp);
    }

    public int Current() => priceAt[latestTimestamp];

    public int Maximum() => distinctPrices.Max;

    public int Minimum() => distinctPrices.Min;
}
```

## Complexity

- **Time:** `O(log n)` per operation, due to the sorted set.
- **Space:** `O(n)` for the timestamp and price maps.
