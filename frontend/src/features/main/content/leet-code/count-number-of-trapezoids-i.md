# 3623. Count Number of Trapezoids I

**Difficulty:** Medium
**Category:** Geometry, Hash Table, Combinatorics

## Problem

Given an array of 2D points, count the number of trapezoids that can be formed by choosing 4 of the points such that one pair of sides is parallel to the x-axis. Return the count modulo $10^9 + 7$.

### Example

Points `(0,0),(2,0),(1,2),(3,2)` form one trapezoid since the pair at `y=0` and the pair at `y=2` are both horizontal segments.

## Approach

Group points by their y-coordinate; each group of size `c` contributes `C(c,2)` horizontal segments. Any two segments from *different* groups form a trapezoid, while two segments from the *same* group are collinear and invalid. So the answer is `C(totalSegments, 2)` minus the sum of `C(segmentsInGroup, 2)` over all groups.

## C# Solution

```csharp
public class Solution 
{
    public int CountTrapezoids(int[][] points) 
    {
        var byY = new Dictionary<int, long>();
        foreach (var p in points) 
        {
            byY[p[1]] = byY.GetValueOrDefault(p[1], 0) + 1;
        }

        long totalSegments = 0;
        long sameGroupPairs = 0;
        foreach (var count in byY.Values) 
        {
            long segs = count * (count - 1) / 2;
            totalSegments += segs;
            sameGroupPairs += segs * (segs - 1) / 2;
        }

        long totalPairs = totalSegments * (totalSegments - 1) / 2;
        const long MOD = 1_000_000_007;
        return (int)((totalPairs - sameGroupPairs) % MOD);
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of points
- **Space:** O(n)
