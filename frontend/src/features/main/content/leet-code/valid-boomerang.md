# 1037. Valid Boomerang

**Difficulty:** Easy
**Category:** Array, Math, Geometry

## Problem

Given three points as an array `points` where `points[i] = [xi, yi]`, return `true` if these points make a valid "boomerang" — meaning they are not all collinear and not all the same point.

### Example

```
Input: points = [[1,1],[2,3],[3,2]]
Output: true
```

## Approach

Three points are collinear exactly when the cross product of the vectors from the first point to the other two is zero: `(x2 - x1)(y3 - y1) - (y2 - y1)(x3 - x1) == 0`. This same check also naturally rejects duplicate points, since repeating any point makes one of the vectors zero, forcing the cross product to zero as well.

## C# Solution

```csharp
public class Solution
{
    public bool IsBoomerang(int[][] points)
    {
        int x1 = points[0][0], y1 = points[0][1];
        int x2 = points[1][0], y2 = points[1][1];
        int x3 = points[2][0], y3 = points[2][1];

        long cross = (long)(x2 - x1) * (y3 - y1) - (long)(y2 - y1) * (x3 - x1);

        return cross != 0;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
