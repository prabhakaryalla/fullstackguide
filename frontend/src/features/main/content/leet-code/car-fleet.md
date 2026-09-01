# 853. Car Fleet

**Difficulty:** Medium
**Category:** Array, Stack, Sorting, Monotonic Stack

## Problem

Given `n` cars heading to the same `target` position on a one-lane road, each with a starting `position` and constant `speed` (a faster car can never pass a slower car ahead of it — it just catches up and they travel together as a "fleet"), return the number of distinct car fleets that will arrive at the destination.

### Example

```
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
```

## Approach

Compute the time each car would take to reach the target if unobstructed, then process cars in order from closest to the target to farthest. A car forms a new fleet only if its arrival time is strictly greater than the arrival time of the fleet immediately ahead of it (meaning it would still be behind when that fleet arrives); otherwise, it catches up and merges into that fleet, adopting its (later) arrival time.

## C# Solution

```csharp
public class Solution
{
    public int CarFleet(int target, int[] position, int[] speed)
    {
        int n = position.Length;
        var cars = new (int Position, double Time)[n];

        for (int i = 0; i < n; i++)
            cars[i] = (position[i], (double)(target - position[i]) / speed[i]);

        Array.Sort(cars, (a, b) => b.Position - a.Position);

        int fleets = 0;
        double lastTime = 0;

        foreach (var (pos, time) in cars)
        {
            if (time > lastTime)
            {
                fleets++;
                lastTime = time;
            }
        }

        return fleets;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the sorted cars array.
