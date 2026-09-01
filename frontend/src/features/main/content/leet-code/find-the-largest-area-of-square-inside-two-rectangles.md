# 3047. Find the Largest Area of Square Inside Two Rectangles

**Difficulty:** Medium
**Category:** Array, Math, Geometry

## Problem

You are given two 2D arrays, `bottomLeft` and `topRight`, each of size `n`, describing `n` axis-aligned rectangles by their bottom-left and top-right corners. For every pair of rectangles, consider the largest axis-aligned square that fits entirely within the overlapping region of both rectangles (if they overlap at all). Return the maximum area achievable by such a square over all pairs, or `0` if no two rectangles overlap enough to fit any square.

## Approach

For each pair of rectangles, compute the overlap along the x-axis and the y-axis separately (`min(right edges) - max(left edges)` for each axis; a non-positive result means no overlap along that axis). The largest square that fits in the overlap region has side length equal to the **smaller** of the two overlap extents (since a square needs equal width and height). Track the maximum such side length across all pairs, then square it for the area (using a 64-bit type since areas can be large).

## C# Solution

```csharp
public class Solution {
    public long LargestSquareArea(int[][] bottomLeft, int[][] topRight) {
        int minSide = 0;
        int n = bottomLeft.Length;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int ax1 = bottomLeft[i][0], ay1 = bottomLeft[i][1];
                int ax2 = topRight[i][0], ay2 = topRight[i][1];
                int bx1 = bottomLeft[j][0], by1 = bottomLeft[j][1];
                int bx2 = topRight[j][0], by2 = topRight[j][1];

                int overlapX = Math.Min(ax2, bx2) - Math.Max(ax1, bx1);
                int overlapY = Math.Min(ay2, by2) - Math.Max(ay1, by1);
                minSide = Math.Max(minSide, Math.Min(overlapX, overlapY));
            }
        }

        return (long)minSide * minSide;
    }
}
```

## Complexity

- Time: O(n^2) — every pair of rectangles is checked.
- Space: O(1).
