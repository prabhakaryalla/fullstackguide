# 1453. Maximum Number of Darts Inside of a Circular Dartboard

**Difficulty:** Hard
**Category:** Array, Math, Geometry

## Problem

Given the positions of darts on a 2D plane and a fixed dartboard radius `r`, find the maximum number of darts that can be enclosed by a circle of radius `r` placed anywhere on the plane.

### Example

```
Input: points = [[-2,0],[2,0],[0,2],[0,-2]], r = 2
Output: 4
```

## Approach

The optimal circle's boundary always passes through at least two of the given points (or just one, if no better placement exists). For every pair of points within distance `2r` of each other, there are up to two circles of radius `r` passing through both — compute their centers using the perpendicular bisector of the segment joining the points, and for each candidate center, count how many darts fall within radius `r`. Track the best count across all pairs (and the trivial single-point case).

## C# Solution

```csharp
public class Solution
{
    public int NumPoints(int[][] points, int r)
    {
        int n = points.Length;
        int best = 1;
        double eps = 1e-6;

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                double dx = points[j][0] - points[i][0];
                double dy = points[j][1] - points[i][1];
                double d = Math.Sqrt(dx * dx + dy * dy);
                if (d > 2.0 * r) continue;

                double midX = (points[i][0] + points[j][0]) / 2.0;
                double midY = (points[i][1] + points[j][1]) / 2.0;
                double h = Math.Sqrt(Math.Max(0, (double)r * r - (d / 2) * (d / 2)));
                double ux = -dy / d, uy = dx / d;

                for (int sign = -1; sign <= 1; sign += 2)
                {
                    double cx = midX + sign * h * ux;
                    double cy = midY + sign * h * uy;
                    int count = 0;

                    foreach (var p in points)
                    {
                        double ddx = p[0] - cx, ddy = p[1] - cy;
                        if (ddx * ddx + ddy * ddy <= (double)r * r + eps) count++;
                    }

                    best = Math.Max(best, count);
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^3)` — for each of the `O(n^2)` point pairs, count enclosed points in `O(n)`.
- **Space:** `O(1)`.
