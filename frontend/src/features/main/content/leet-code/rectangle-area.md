# 223. Rectangle Area

**Difficulty:** Medium
**Category:** Math, Geometry

## Problem

Given the coordinates of two axis-aligned rectangles (each defined by bottom-left and top-right corners), return the total area covered by the two rectangles combined (counting any overlapping region only once).

### Example

```
rect1 = (-3,0,3,4), rect2 = (0,-1,9,2) -> 45
```

## Approach

Total area equals the sum of both rectangles' individual areas minus their overlapping area (to avoid double-counting). The overlap region's width is `max(0, min(right edges) - max(left edges))` and its height is `max(0, min(top edges) - max(bottom edges))` — clamped to zero when the rectangles don't actually intersect on that axis.

## C# Solution

```csharp
public class Solution
{
    public int ComputeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2)
    {
        int area1 = (ax2 - ax1) * (ay2 - ay1);
        int area2 = (bx2 - bx1) * (by2 - by1);

        int overlapWidth = Math.Max(0, Math.Min(ax2, bx2) - Math.Max(ax1, bx1));
        int overlapHeight = Math.Max(0, Math.Min(ay2, by2) - Math.Max(ay1, by1));

        return area1 + area2 - overlapWidth * overlapHeight;
    }
}
```

## Complexity

- **Time:** `O(1)` — constant number of arithmetic operations.
- **Space:** `O(1)`.
