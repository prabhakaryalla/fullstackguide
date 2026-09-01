# 812. Largest Triangle Area

**Difficulty:** Easy
**Category:** Array, Math, Geometry

## Problem

Given an array of 2D `points`, return the largest area of a triangle formed by any three of them.

### Example

```
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2.00000
```

## Approach

Since the number of points is small, try every combination of three distinct points and compute the triangle's area using the shoelace formula, tracking the maximum area found.

## C# Solution

```csharp
public class Solution
{
    public double LargestTriangleArea(int[][] points)
    {
        double maxArea = 0;
        int n = points.Length;

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                for (int k = j + 1; k < n; k++)
                {
                    double area = Area(points[i], points[j], points[k]);
                    maxArea = Math.Max(maxArea, area);
                }
            }
        }

        return maxArea;
    }

    private double Area(int[] a, int[] b, int[] c)
    {
        return Math.Abs(
            a[0] * (b[1] - c[1]) +
            b[0] * (c[1] - a[1]) +
            c[0] * (a[1] - b[1])
        ) / 2.0;
    }
}
```

## Complexity

- **Time:** `O(n^3)`.
- **Space:** `O(1)` extra.
