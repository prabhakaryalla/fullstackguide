# 774. Minimize Max Distance to Gas Station

**Difficulty:** Hard
**Category:** Array, Binary Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given sorted positions of existing gas `stations` and an integer `k` representing additional gas stations you may add anywhere (not necessarily at integer positions), return the smallest possible value of the maximum distance between adjacent gas stations after adding all `k` new stations.

### Example

```
Input: stations = [1,2,3,4,5,6,7,8,9,10], k = 9
Output: 0.5
```

## Approach

Binary search on the answer (the maximum allowed gap distance). For a candidate distance `d`, the minimum number of new stations needed to ensure every existing gap is at most `d` is the sum, over every adjacent pair of existing stations, of `floor(gap / d)` (the number of stations needed to subdivide that gap into pieces no longer than `d`). Binary search the smallest `d` for which this required count is at most `k`, using enough iterations of floating-point binary search to converge within the required precision.

## C# Solution

```csharp
public class Solution
{
    public double MinmaxGasDist(int[] stations, int k)
    {
        double left = 0, right = 1e8;

        for (int iter = 0; iter < 100; iter++)
        {
            double mid = (left + right) / 2;

            if (CountStationsNeeded(stations, mid) <= k)
                right = mid;
            else
                left = mid;
        }

        return right;
    }

    private int CountStationsNeeded(int[] stations, double dist)
    {
        int count = 0;

        for (int i = 0; i < stations.Length - 1; i++)
        {
            double gap = stations[i + 1] - stations[i];
            count += (int)(gap / dist);
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n * 100)` for the fixed-iteration binary search.
- **Space:** `O(1)` extra.
