# 1266. Minimum Time Visiting All Points

**Difficulty:** Easy
**Category:** Array, Math, Geometry

## Problem

Given an array of 2D points, a "step" may move one unit horizontally, vertically, or diagonally in one second. Return the minimum number of seconds needed to visit all points in the given order.

### Example

```
Input: points = [[1,1],[3,4],[-1,0]]
Output: 7
```

## Approach

Between any two consecutive points, diagonal moves cover both an x-step and a y-step simultaneously, so the fastest route between them takes exactly `max(|dx|, |dy|)` seconds (the Chebyshev distance) — move diagonally until one coordinate aligns, then finish with straight moves along the remaining axis. Sum this Chebyshev distance across every consecutive pair of points.

## C# Solution

```csharp
public class Solution
{
    public int MinTimeToVisitAllPoints(int[][] points)
    {
        int time = 0;

        for (int i = 1; i < points.Length; i++)
        {
            int dx = Math.Abs(points[i][0] - points[i - 1][0]);
            int dy = Math.Abs(points[i][1] - points[i - 1][1]);
            time += Math.Max(dx, dy);
        }

        return time;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of points.
- **Space:** `O(1)`.
