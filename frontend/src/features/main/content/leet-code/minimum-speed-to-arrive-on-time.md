# 1870. Minimum Speed to Arrive on Time

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given `dist[i]`, the length of the `i`-th of `n` train rides, and a deadline `hour` (a real number), you must travel at a fixed integer speed for every ride. Every ride except the last must finish at an integer hour boundary (you wait for the next hour if it doesn't). Return the minimum integer speed needed to arrive by `hour`, or `-1` if impossible even at unbounded speed.

### Example

```
Input: dist = [1,3,2], hour = 6
Output: 1
```

## Approach

If `hour <= n - 1`, it's impossible even instantaneously (each of the `n-1` non-final rides forces at least a full hour of rounding), so return `-1` immediately. Otherwise, binary search the minimum feasible integer speed in `[1, 10^7]`: for a candidate speed, sum `ceil(dist[i] / speed)` for every ride except the last, plus the exact (unrounded) time for the last ride, and check whether the total is within `hour`. Since feasibility is monotonic in speed, binary search finds the smallest speed that works.

## C# Solution

```csharp
public class Solution
{
    public int MinSpeedOnTime(int[] dist, double hour)
    {
        int n = dist.Length;
        if (hour <= n - 1) return -1;

        int lo = 1, hi = 10_000_000;
        int result = -1;

        while (lo <= hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (IsFeasible(dist, hour, mid))
            {
                result = mid;
                hi = mid - 1;
            }
            else
            {
                lo = mid + 1;
            }
        }

        return result;
    }

    private bool IsFeasible(int[] dist, double hour, int speed)
    {
        double time = 0;
        int n = dist.Length;

        for (int i = 0; i < n - 1; i++)
        {
            time += Math.Ceiling((double)dist[i] / speed);
        }

        time += (double)dist[n - 1] / speed;

        return time <= hour;
    }
}
```

## Complexity

- **Time:** `O(n log(maxSpeed))`.
- **Space:** `O(1)`.
