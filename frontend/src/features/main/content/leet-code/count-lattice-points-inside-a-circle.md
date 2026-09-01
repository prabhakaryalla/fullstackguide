# 2249. Count Lattice Points Inside a Circle

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Geometry, Enumeration

## Problem

Given a 2D integer array `circles` where `circles[i] = [xi, yi, ri]` represents a circle with center `(xi, yi)` and radius `ri`, return the number of lattice points (points with integer coordinates) that are inside or on the boundary of at least one circle.

### Example

```
Input: circles = [[2,2,1]]
Output: 5
Explanation: Points (1,2), (2,1), (2,2), (2,3), (3,2) are inside or on the circle
```

## Approach

For each circle, enumerate all lattice points within its bounding box and check if they satisfy the distance condition. Use a hash set to avoid counting the same point multiple times across different circles.

## C# Solution

```csharp
public class Solution
{
    public int CountLatticePoints(int[][] circles)
    {
        var points = new HashSet<(int, int)>();
        
        foreach (var circle in circles)
        {
            int x = circle[0], y = circle[1], r = circle[2];
            
            for (int i = x - r; i <= x + r; i++)
            {
                for (int j = y - r; j <= y + r; j++)
                {
                    if ((i - x) * (i - x) + (j - y) * (j - y) <= r * r)
                    {
                        points.Add((i, j));
                    }
                }
            }
        }
        
        return points.Count;
    }
}
```

## Complexity

- **Time:** O(n * r²) where n is the number of circles and r is the average radius
- **Space:** O(n * r²)
