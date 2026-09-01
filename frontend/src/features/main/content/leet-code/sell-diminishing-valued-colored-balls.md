# 1648. Sell Diminishing-Valued Colored Balls

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Sorting, Heap (Priority Queue)

## Problem

Given `inventory[i]` balls of the `i`-th color, each sale gives money equal to the current count of that color, after which the count decreases by 1. Given a number of `orders` to fulfill (maximizing total money), return the maximum profit modulo `10^9 + 7`.

### Example

```
Input: inventory = [2,5], orders = 4
Output: 14
```

## Approach

Binary search for the smallest "water level" `T` such that fully selling every ball whose count exceeds `T` down to exactly `T` uses at most `orders` balls (`CountAbove(T) <= orders`); this maximizes the number of balls sold at the highest possible prices. For every color above `T`, the revenue is the arithmetic sum from `T+1` to that color's original count (`Sum(value) - Sum(T)` using the triangular-number formula). Any leftover orders (`orders - CountAbove(T)`) are then sold at exactly price `T` each.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;
    private const long InverseTwo = 500000004L;

    public int MaxProfit(int[] inventory, int orders)
    {
        long left = 0;
        long right = inventory.Max();

        while (left < right)
        {
            long mid = left + (right - left) / 2;

            if (CountAbove(inventory, mid) <= orders)
            {
                right = mid;
            }
            else
            {
                left = mid + 1;
            }
        }

        long threshold = left;
        long soldAboveThreshold = CountAbove(inventory, threshold);
        long remaining = orders - soldAboveThreshold;
        long profit = 0;

        foreach (int value in inventory)
        {
            if (value > threshold)
            {
                profit = (profit + Sum(value) - Sum(threshold) + Mod) % Mod;
            }
        }

        profit = (profit + (threshold % Mod) * (remaining % Mod)) % Mod;

        return (int)profit;
    }

    private long CountAbove(int[] inventory, long threshold)
    {
        long count = 0;

        foreach (int value in inventory)
        {
            if (value > threshold)
            {
                count += value - threshold;
            }
        }

        return count;
    }

    private long Sum(long x)
    {
        return x % Mod * ((x + 1) % Mod) % Mod * InverseTwo % Mod;
    }
}
```

## Complexity

- **Time:** `O(n log(max(inventory)))`.
- **Space:** `O(1)`.
