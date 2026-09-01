# 1599. Maximum Profit of Operating a Centennial Wheel

**Difficulty:** Medium
**Category:** Array, Simulation

## Problem

A Ferris wheel has 4 gondolas, each holding up to 4 people, rotating once per run. Given `customers[i]` (people arriving before the `i`-th rotation) along with `boardingCost` (revenue per boarded customer) and `runningCost` (cost per rotation), waiting customers may board (up to 4 per rotation) or wait for a later rotation. Return the rotation count that maximizes profit, or `-1` if no rotation count yields a positive profit.

### Example

```
Input: customers = [8,3], boardingCost = 5, runningCost = 6
Output: 3
```

## Approach

Simulate rotation by rotation: maintain a `waiting` count, adding new arrivals (or `0` once `customers` is exhausted) before each rotation. Each rotation boards up to 4 people (whichever is smaller between `waiting` and `4`), reduces `waiting` accordingly, and updates the running profit by `boarded * boardingCost - runningCost`. Track the best profit seen and the rotation count that achieved it (using strict improvement to prefer the earliest such rotation on ties). Stop once there are no more arriving customers and the waiting queue is empty.

## C# Solution

```csharp
public class Solution
{
    public int MinOperationsMaxProfit(int[] customers, int boardingCost, int runningCost)
    {
        int waiting = 0;
        long profit = 0;
        long bestProfit = 0;
        int bestRotation = -1;
        int rotation = 0;
        int i = 0;

        while (i < customers.Length || waiting > 0)
        {
            if (i < customers.Length)
            {
                waiting += customers[i];
                i++;
            }

            int boarding = Math.Min(4, waiting);
            waiting -= boarding;
            rotation++;
            profit += (long)boarding * boardingCost - runningCost;

            if (profit > bestProfit)
            {
                bestProfit = profit;
                bestRotation = rotation;
            }
        }

        return bestRotation;
    }
}
```

## Complexity

- **Time:** `O(n)` — one rotation per group of arriving customers (plus rotations needed to clear the remaining queue).
- **Space:** `O(1)`.
