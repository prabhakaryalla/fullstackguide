# 963. Minimum Area Rectangle II

**Difficulty:** Medium
**Category:** Array, Math, Geometry
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a set of points on a plane, return the minimum area of any rectangle (not necessarily axis-aligned) formed from four of these points. Return `0` if no rectangle can be formed.

### Example

```
Input: points = [[1,2],[2,1],[1,0],[0,1]]
Output: 2.00000
```

## Approach

A rectangle's diagonals bisect each other and are equal in length. For every pair of points, compute their midpoint and squared distance, and group pairs sharing the same `(midpoint, squaredDistance)` key — any two pairs in the same group form the four corners of a rectangle. For each such combination, compute the two side lengths from a shared vertex to the other diagonal's endpoints and multiply them for the area, tracking the minimum positive area found.

## C# Solution

```csharp
public class Solution
{
    public double MinAreaFreeRect(int[][] points)
    {
        int n = points.Length;
        var groups = new Dictionary<(double, double, double), List<(int, int)>>();

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                double cx = (points[i][0] + points[j][0]) / 2.0;
                double cy = (points[i][1] + points[j][1]) / 2.0;
                double distSq = Math.Pow(points[i][0] - points[j][0], 2) + Math.Pow(points[i][1] - points[j][1], 2);
                var key = (cx, cy, distSq);

                if (!groups.TryGetValue(key, out var list)) groups[key] = list = new List<(int, int)>();
                list.Add((i, j));
            }
        }

        double minArea = double.MaxValue;

        foreach (var pairs in groups.Values)
        {
            for (int a = 0; a < pairs.Count; a++)
            {
                for (int b = a + 1; b < pairs.Count; b++)
                {
                    var (p1, _) = pairs[a];
                    var (p3, p4) = pairs[b];

                    double dx1 = points[p1][0] - points[p3][0];
                    double dy1 = points[p1][1] - points[p3][1];
                    double dx2 = points[p1][0] - points[p4][0];
                    double dy2 = points[p1][1] - points[p4][1];

                    double side1 = Math.Sqrt(dx1 * dx1 + dy1 * dy1);
                    double side2 = Math.Sqrt(dx2 * dx2 + dy2 * dy2);
                    double area = side1 * side2;

                    if (area > 0) minArea = Math.Min(minArea, area);
                }
            }
        }

        return minArea == double.MaxValue ? 0 : minArea;
    }
}
```

## Complexity

- **Time:** `O(n^2)` pairs grouped, plus quadratic combination checks within shared groups.
- **Space:** `O(n^2)`.
