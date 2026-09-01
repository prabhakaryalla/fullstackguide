# 3588. Find Maximum Area of a Triangle

**Difficulty:** Medium
**Category:** Array, Geometry, Hash Table

## Problem
You are given an array `coords` where `coords[i] = [x, y]` represents a point on the 2D plane. Find the maximum possible area of an **axis-aligned right triangle** — a triangle where one leg is horizontal and the adjacent leg is vertical — formed by choosing three of the given points. Return the maximum area as a floating-point number, or `-1` if no such triangle can be formed.

## Approach
An axis-aligned right triangle is formed by a "corner" point `P = (x, y)`, a point `Q` sharing `P`'s x-coordinate (the vertical leg), and a point `R` sharing `P`'s y-coordinate (the horizontal leg). The area is `0.5 * |verticalLegLength| * |horizontalLegLength|`.

For every distinct x-coordinate, precompute the min and max y among points sharing that x (this gives the longest possible vertical leg anchored at that x). Symmetrically, for every distinct y-coordinate, precompute the min and max x among points sharing that y. Then, treating each given point as the right-angle corner, compute the best achievable area and keep the running maximum.

## C# Solution

```csharp
public class Solution 
{
    public double MaxArea(int[][] coords)
    {
        var byX = new Dictionary<int, (int min, int max)>();
        var byY = new Dictionary<int, (int min, int max)>();

        foreach (var p in coords)
        {
            int x = p[0], y = p[1];
            if (byX.TryGetValue(x, out var ry))
                byX[x] = (Math.Min(ry.min, y), Math.Max(ry.max, y));
            else
                byX[x] = (y, y);

            if (byY.TryGetValue(y, out var rx))
                byY[y] = (Math.Min(rx.min, x), Math.Max(rx.max, x));
            else
                byY[y] = (x, x);
        }

        double best = -1;
        foreach (var p in coords)
        {
            int x = p[0], y = p[1];
            long spanY = byX[x].max - byX[x].min;
            long spanX = byY[y].max - byY[y].min;
            if (spanY == 0 || spanX == 0) continue;
            double area = 0.5 * spanY * spanX;
            best = Math.Max(best, area);
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
