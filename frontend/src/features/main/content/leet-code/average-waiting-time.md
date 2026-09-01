# 1701. Average Waiting Time

**Difficulty:** Medium
**Category:** Array, Simulation

## Problem

There is a restaurant with a single chef. You are given an array `customers` where `customers[i] = [arrivali, timei]`. The chef serves customers one at a time in arrival order; if the chef is busy, the next customer waits until the chef is free, then takes `timei` to prepare their order. Return the average waiting time of all customers (time between arrival and receiving their order).

### Example

```
Input: customers = [[1,2],[2,5],[4,3]]
Output: 5.00000
Explanation: Customer 1 waits (2-1)+2=... finish times: 3, 8, 11; waits: 2, 6, 7 -> average 5.
```

## Approach

Track the time the chef becomes free (`current`). For each customer, the chef starts cooking at `max(current, arrival)` and finishes `time` later; the waiting time is `finish - arrival`. Accumulate the waits and divide by the customer count.

## C# Solution

```csharp
public class Solution
{
    public double AverageWaitingTime(int[][] customers)
    {
        long current = 0;
        long totalWait = 0;

        foreach (var c in customers)
        {
            long arrival = c[0], time = c[1];
            current = Math.Max(current, arrival) + time;
            totalWait += current - arrival;
        }

        return (double)totalWait / customers.Length;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
