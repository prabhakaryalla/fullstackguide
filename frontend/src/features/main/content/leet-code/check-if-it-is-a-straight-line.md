# 1232. Check If It Is a Straight Line

**Difficulty:** Easy
**Category:** Array, Math, Geometry

## Problem

Given an array of coordinate pairs, return `true` if all the points lie on a single straight line.

### Example

```
Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
Output: true
```

## Approach

Compute the direction vector `(dx, dy)` from the first point to the second. Every other point must produce a direction vector from the first point that is parallel to `(dx, dy)`; two vectors are parallel exactly when their cross product is zero, so check `dx * cy == dy * cx` for each subsequent point's vector `(cx, cy)`. Using the cross-product comparison instead of dividing avoids issues with zero denominators (vertical lines).

## C# Solution

```csharp
public class Solution
{
    public bool CheckStraightLine(int[][] coordinates)
    {
        int x0 = coordinates[0][0], y0 = coordinates[0][1];
        int dx = coordinates[1][0] - x0, dy = coordinates[1][1] - y0;

        for (int i = 2; i < coordinates.Length; i++)
        {
            int cx = coordinates[i][0] - x0, cy = coordinates[i][1] - y0;
            if (dx * cy != dy * cx) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of points.
- **Space:** `O(1)`.
