# 1094. Car Pooling

**Difficulty:** Medium
**Category:** Array, Sorting, Prefix Sum, Simulation, Heap (Priority Queue)

## Problem

A car has a given `capacity` and drives along a route only in one direction (increasing location). Given `trips` where `trips[i] = [numPassengers, from, to]`, return `true` if it's possible to pick up and drop off all passengers without ever exceeding `capacity`.

### Example

```
Input: trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
```

## Approach

Use a difference array indexed by location (bounded by the problem's constraint of at most `1000`): add `numPassengers` at the `from` location and subtract it at the `to` location, since that's where passengers exit. Scanning the difference array left to right while accumulating a running total reconstructs the number of passengers in the car at each location; if that running total ever exceeds `capacity`, the trips can't all be satisfied.

## C# Solution

```csharp
public class Solution
{
    public bool CarPooling(int[][] trips, int capacity)
    {
        int[] changes = new int[1001];

        foreach (var trip in trips)
        {
            int passengers = trip[0], from = trip[1], to = trip[2];
            changes[from] += passengers;
            changes[to] -= passengers;
        }

        int current = 0;
        foreach (var change in changes)
        {
            current += change;
            if (current > capacity) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(trips.Length + maxLocation)`.
- **Space:** `O(maxLocation)` for the difference array.
