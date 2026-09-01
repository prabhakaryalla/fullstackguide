# 1518. Water Bottles

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

Given `numBottles` full water bottles and the fact that `numExchange` empty bottles can be traded for one full bottle, return the maximum number of bottles of water you can drink.

### Example

```
Input: numBottles = 9, numExchange = 3
Output: 13
```

## Approach

Simulate the process: drink all full bottles (adding to the total and to the empty pile), then repeatedly exchange as many empty bottles as possible for new full ones, drinking those too, until there aren't enough empty bottles left to exchange.

## C# Solution

```csharp
public class Solution
{
    public int NumWaterBottles(int numBottles, int numExchange)
    {
        int total = numBottles;
        int empty = numBottles;

        while (empty >= numExchange)
        {
            int newBottles = empty / numExchange;
            total += newBottles;
            empty = empty % numExchange + newBottles;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(log numBottles)` — the number of empty bottles shrinks roughly geometrically each round.
- **Space:** `O(1)`.
