# 469. Convex Polygon

**Difficulty:** Medium
**Category:** Math, Geometry
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a list of points that form a polygon when connected in order, return `true` if the polygon is convex.

### Example

```
Input: points = [[0,0],[0,1],[1,1],[1,0]]
Output: true
```

### Constraints

- `3 <= points.length <= 10^4`

## Approach

A polygon is convex exactly when it always turns in the same rotational direction at every vertex. For each consecutive triple of vertices, compute the cross product of the two edge vectors formed; the sign of this cross product indicates the turn direction (clockwise or counterclockwise). If any nonzero cross product has a sign different from a previously seen nonzero cross product, the polygon has a concave turn and is not convex.

## C# Solution

```csharp
public class Solution
{
    public bool IsConvex(IList<IList<int>> points)
    {
        int n = points.Count;
        long previousCross = 0;

        for (int i = 0; i < n; i++)
        {
            var a = points[i];
            var b = points[(i + 1) % n];
            var c = points[(i + 2) % n];

            long dx1 = b[0] - a[0], dy1 = b[1] - a[1];
            long dx2 = c[0] - b[0], dy2 = c[1] - b[1];
            long cross = dx1 * dy2 - dy1 * dx2;

            if (cross != 0)
            {
                if (previousCross != 0 && Math.Sign(cross) != Math.Sign(previousCross))
                    return false;

                previousCross = cross;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
