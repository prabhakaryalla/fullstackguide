# 3625. Count Number of Trapezoids II

**Difficulty:** Hard
**Category:** Array, Hash Table, Math, Geometry

## Problem
You are given a 2D integer array `points` where `points[i] = [x_i, y_i]` are distinct point coordinates. Return the number of unique trapezoids (convex quadrilaterals with at least one pair of parallel sides; two segments are parallel if and only if they have the same slope) that can be formed by choosing any four distinct points.

### Example
Input: `points = [[0,0],[1,0],[0,1],[2,1]]`
Output: `1`

Constraints:
- `4 <= points.length <= 500`
- `-1000 <= x_i, y_i <= 1000`

## Approach
For every pair of points, compute the segment's normalized slope (reduce `dx, dy` by their GCD and fix the sign so equal and opposite directions map to the same key). Group segments by slope. Within a slope group of size `m`, the number of ways to choose two disjoint segments (which do not share an endpoint) is `C(m, 2)` minus, for every point `p` participating in `deg_p` segments of that group, `C(deg_p, 2)` (pairs that share `p`). Summing these over every slope group counts every quadrilateral that has at least one pair of parallel opposite sides, but a true parallelogram (both pairs of opposite sides parallel) gets counted twice, once per parallel pair.

To correct for that, note that two disjoint segments sharing the same midpoint always form a parallelogram with those segments as diagonals. Group **all** segments (regardless of slope) by their midpoint (using `x1 + x2, y1 + y2` to avoid fractions); for each midpoint group of size `c`, `C(c, 2)` counts the extra (duplicate) contributions to subtract.

The final answer is the slope-based total minus the midpoint-based overcount.

## C# Solution

```csharp
public class Solution {
    public long CountTrapezoids(int[][] points) {
        int n = points.Length;
        var slopeGroupSize = new Dictionary<(long, long), long>();
        var pointDegByGroup = new Dictionary<(long, long), Dictionary<int, int>>();
        var midpointGroupSize = new Dictionary<(long, long), long>();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long dx = points[j][0] - points[i][0];
                long dy = points[j][1] - points[i][1];
                long g = Gcd(Math.Abs(dx), Math.Abs(dy));
                long ndx = dx / g, ndy = dy / g;
                if (ndx < 0 || (ndx == 0 && ndy < 0)) {
                    ndx = -ndx;
                    ndy = -ndy;
                }
                var slopeKey = (ndx, ndy);
                slopeGroupSize[slopeKey] = slopeGroupSize.GetValueOrDefault(slopeKey) + 1;

                if (!pointDegByGroup.TryGetValue(slopeKey, out var degMap)) {
                    degMap = new Dictionary<int, int>();
                    pointDegByGroup[slopeKey] = degMap;
                }
                degMap[i] = degMap.GetValueOrDefault(i) + 1;
                degMap[j] = degMap.GetValueOrDefault(j) + 1;

                var midKey = ((long)(points[i][0] + points[j][0]), (long)(points[i][1] + points[j][1]));
                midpointGroupSize[midKey] = midpointGroupSize.GetValueOrDefault(midKey) + 1;
            }
        }

        long total = 0;
        foreach (var kv in slopeGroupSize) {
            long m = kv.Value;
            long pairs = m * (m - 1) / 2;
            foreach (int deg in pointDegByGroup[kv.Key].Values) {
                pairs -= (long)deg * (deg - 1) / 2;
            }
            total += pairs;
        }

        long overcount = 0;
        foreach (long c in midpointGroupSize.Values) {
            overcount += c * (c - 1) / 2;
        }

        return total - overcount;
    }

    private long Gcd(long a, long b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** O(n^2), where n is the number of points.
- **Space:** O(n^2)
