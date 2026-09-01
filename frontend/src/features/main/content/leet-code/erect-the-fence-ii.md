# 1924. Erect the Fence II

**Difficulty:** Hard
**Category:** Array, Geometry
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the positions of trees on a 2D plane as `trees[i] = [xi, yi]`, find the smallest possible circle that contains every tree (either strictly inside or on the boundary), and return it as `[x, y, r]` representing the circle's center and radius, with an error tolerance of `10^-5`.

### Example

```
Input: trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [2.00000,2.00000,2.00000]
Explanation: The minimum enclosing circle is centered at (2,2) with radius 2.
```

### Constraints

- `1 <= trees.length <= 3000`
- `trees[i].length == 2`
- `0 <= xi, yi <= 3000`

## Approach

This is the classic minimum enclosing circle problem, solvable in expected `O(n)` with Welzl's randomized incremental algorithm: shuffle the points, then incrementally build a circle that must pass through 0, 1, 2, or 3 of the points processed so far, re-deriving the circle whenever a newly added point lies outside the current circle (recursively fixing which points are on the boundary).

## C# Solution

```csharp
public class Solution
{
    public double[] OuterTrees(int[][] trees)
    {
        var points = trees.Select(t => ((double)t[0], (double)t[1])).ToList();
        var rnd = new Random(12345);
        for (int i = points.Count - 1; i > 0; i--)
        {
            int j = rnd.Next(i + 1);
            (points[i], points[j]) = (points[j], points[i]);
        }

        var circle = (cx: 0.0, cy: 0.0, r: 0.0);
        for (int i = 0; i < points.Count; i++)
        {
            if (!InCircle(circle, points[i]))
            {
                circle = (points[i].Item1, points[i].Item2, 0.0);
                for (int j = 0; j < i; j++)
                {
                    if (!InCircle(circle, points[j]))
                    {
                        circle = CircleFromTwo(points[i], points[j]);
                        for (int k = 0; k < j; k++)
                        {
                            if (!InCircle(circle, points[k]))
                            {
                                circle = CircleFromThree(points[i], points[j], points[k]);
                            }
                        }
                    }
                }
            }
        }

        return new double[] { circle.cx, circle.cy, circle.r };
    }

    private bool InCircle((double cx, double cy, double r) c, (double, double) p)
    {
        double dx = p.Item1 - c.cx, dy = p.Item2 - c.cy;
        return dx * dx + dy * dy <= c.r * c.r + 1e-7;
    }

    private (double cx, double cy, double r) CircleFromTwo((double, double) a, (double, double) b)
    {
        double cx = (a.Item1 + b.Item1) / 2.0;
        double cy = (a.Item2 + b.Item2) / 2.0;
        double r = Math.Sqrt(Math.Pow(a.Item1 - cx, 2) + Math.Pow(a.Item2 - cy, 2));
        return (cx, cy, r);
    }

    private (double cx, double cy, double r) CircleFromThree((double, double) a, (double, double) b, (double, double) c)
    {
        double ax = a.Item1, ay = a.Item2, bx = b.Item1, by = b.Item2, cx0 = c.Item1, cy0 = c.Item2;
        double d = 2 * (ax * (by - cy0) + bx * (cy0 - ay) + cx0 * (ay - by));

        if (Math.Abs(d) < 1e-9)
        {
            // Collinear points: fall back to the two farthest-apart points.
            var candidates = new[] { (a, b), (a, c), (b, c) };
            return candidates
                .Select(pair => CircleFromTwo(pair.Item1, pair.Item2))
                .OrderByDescending(circ => circ.r)
                .First();
        }

        double ux = ((ax * ax + ay * ay) * (by - cy0) + (bx * bx + by * by) * (cy0 - ay) + (cx0 * cx0 + cy0 * cy0) * (ay - by)) / d;
        double uy = ((ax * ax + ay * ay) * (cx0 - bx) + (bx * bx + by * by) * (ax - cx0) + (cx0 * cx0 + cy0 * cy0) * (bx - ax)) / d;
        double r = Math.Sqrt(Math.Pow(ax - ux, 2) + Math.Pow(ay - uy, 2));
        return (ux, uy, r);
    }
}
```

## Complexity

- **Time:** `O(n)` expected — Welzl's randomized incremental algorithm.
- **Space:** `O(n)` for the shuffled point list.
