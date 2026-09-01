# 871. Minimum Number of Refueling Stops

**Difficulty:** Hard
**Category:** Array, Greedy, Heap, Dynamic Programming

## Problem

A car starts with `startFuel` and must travel `target` distance, passing gas `stations` (each `[position, fuel]`) along the way, where stopping at a station adds its fuel to the tank. Return the minimum number of refueling stops needed to reach the target, or `-1` if impossible.

### Example

```
Input: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
Output: 2
```

## Approach

Use a greedy strategy with a max-heap: drive forward, and whenever a station becomes reachable with current fuel, add its fuel amount to the heap (without necessarily using it yet). When the current fuel runs out before reaching the target, greedily refuel using the largest available fuel amount from the heap among all passed stations — this defers the refueling decision until it's actually needed, always choosing the most valuable available option. If the heap is empty when fuel is needed, the target is unreachable.

## C# Solution

```csharp
public class Solution
{
    public int MinRefuelStops(int target, int startFuel, int[][] stations)
    {
        var maxHeap = new PriorityQueue<int, int>();
        int stops = 0;
        int i = 0;
        long fuel = startFuel;

        while (fuel < target)
        {
            while (i < stations.Length && stations[i][0] <= fuel)
            {
                maxHeap.Enqueue(stations[i][1], -stations[i][1]);
                i++;
            }

            if (maxHeap.Count == 0) return -1;

            fuel += maxHeap.Dequeue();
            stops++;
        }

        return stops;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the heap.
