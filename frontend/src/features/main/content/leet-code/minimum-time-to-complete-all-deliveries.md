# 3733. Minimum Time to Complete All Deliveries

**Difficulty:** Medium
**Category:** Greedy, Array

## Problem

A delivery truck must visit `n` delivery points, given as one-way distances `times[i]`. For every delivery except the very last one performed, the truck must also return to the depot (costing `times[i]` again), but the last delivery of the day does not require a return trip. Choose the order of deliveries to minimize the total time, and return that minimum time.

### Example

times = [2,5,3] → save the largest distance (5) for last: total = 2*2 + 2*3 + 5 = 15.

## Approach

The total time is always `2 * sum(times)` minus whichever single distance is saved by not returning after the last delivery. To minimize the total, save the largest distance for last, so the answer is `2 * sum(times) - max(times)`.

## C# Solution

```csharp
public class Solution 
{
    public long MinimumTime(int[] times) 
    {
        long sum = 0;
        int max = 0;
        foreach (int t in times) 
        {
            sum += t;
            max = Math.Max(max, t);
        }
        return 2 * sum - max;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
