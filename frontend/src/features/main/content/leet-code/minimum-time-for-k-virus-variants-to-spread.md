# 1956. Minimum Time For K Virus Variants to Spread

**Difficulty:** Hard
**Category:** Array, Math, String, Combinatorics, Number Theory
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `points`, the integer coordinates where `k` different virus variants currently exist, a variant spreads to all 8-directionally adjacent (Chebyshev distance 1) points each minute, potentially infinitely in all directions. Find the minimum number of minutes needed until there exists at least one point that has been reached by every one of the `k` variants.

### Example

```
Input: points = [[1,1],[6,1]]
Output: 2
Explanation: After 2 minutes both variants (spreading in a square/Chebyshev radius of 2) can reach a common point, e.g. around x=3 or x=4.
```

### Constraints

- `2 <= k <= 100`
- `points[i].length == 2`
- `1 <= xi, yi <= 100`

## Approach

Binary search on the answer `t` (minutes). For a fixed `t`, a candidate meeting point `(x, y)` must be within Chebyshev distance `t` of every source point, i.e. `max(|x - xi|, |y - yi|) <= t` for all `i`. This constrains `x` to the intersection of ranges `[xi - t, xi + t]` (so `x` must be in `[max(xi) - t, min(xi) + t]`) and similarly for `y`. Check feasibility by testing whether those intersected ranges for `x` and `y` are both non-empty; if so, `t` minutes suffice.

## C# Solution

```csharp
public class Solution
{
    public int MinimumTime(int[][] points)
    {
        int lo = 0, hi = 200;

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (CanMeet(points, mid))
            {
                hi = mid;
            }
            else
            {
                lo = mid + 1;
            }
        }

        return lo;
    }

    private bool CanMeet(int[][] points, int t)
    {
        int xLow = int.MinValue, xHigh = int.MaxValue;
        int yLow = int.MinValue, yHigh = int.MaxValue;

        foreach (var p in points)
        {
            xLow = Math.Max(xLow, p[0] - t);
            xHigh = Math.Min(xHigh, p[0] + t);
            yLow = Math.Max(yLow, p[1] - t);
            yHigh = Math.Min(yHigh, p[1] + t);
        }

        return xLow <= xHigh && yLow <= yHigh;
    }
}
```

## Complexity

- **Time:** `O(k * log(maxCoord))` — a linear scan of the points per binary search step.
- **Space:** `O(1)`.
