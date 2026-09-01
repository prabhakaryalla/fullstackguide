# 1401. Circle and Rectangle Overlapping

**Difficulty:** Medium
**Category:** Math, Geometry

## Problem

Given a circle represented by `(radius, xCenter, yCenter)` and an axis-aligned rectangle represented by its bottom-left `(x1, y1)` and top-right `(x2, y2)` corners, return `true` if the circle and rectangle overlap (touching counts as overlapping).

### Example

```
Input: radius = 1, xCenter = 0, yCenter = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1
Output: true
```

## Approach

Find the point on the rectangle closest to the circle's center by clamping the center's `x` and `y` coordinates to the rectangle's bounds. If the squared distance from the circle's center to that closest point is at most `radius^2`, the shapes overlap.

## C# Solution

```csharp
public class Solution
{
    public bool CheckOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2)
    {
        long closestX = Math.Max(x1, Math.Min(xCenter, x2));
        long closestY = Math.Max(y1, Math.Min(yCenter, y2));

        long dx = xCenter - closestX;
        long dy = yCenter - closestY;

        return dx * dx + dy * dy <= (long)radius * radius;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
