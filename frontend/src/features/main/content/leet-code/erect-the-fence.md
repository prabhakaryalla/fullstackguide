# 587. Erect the Fence

**Difficulty:** Hard
**Category:** Array, Math, Geometry, Convex Hull

## Problem

Given the positions of trees in a 2D garden as an array `trees`, return the coordinates of the trees forming the perimeter of the smallest fence enclosing all of them (the convex hull).

### Example

```
Input: trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [[1,1],[2,0],[4,2],[3,3],[2,4]]
```

### Constraints

- `1 <= trees.length <= 3000`
- `-10^7 <= xi, yi <= 10^7`

## Approach

Use Andrew's monotone chain algorithm to compute the convex hull. Sort all points lexicographically, then build the lower hull by scanning left to right, popping the last point from the hull whenever it creates a non-left (clockwise or straight) turn with the next point, since fence points must always turn left to stay on the perimeter (allowing collinear boundary points via a non-strict cross-product check). Repeat symmetrically right to left to build the upper hull, and combine both halves, removing duplicates.

## C# Solution

```csharp
public class Solution
{
    public int[][] OuterTrees(int[][] trees)
    {
        int n = trees.Length;
        if (n < 4) return trees;

        Array.Sort(trees, (a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

        var hull = new List<int[]>();

        for (int i = 0; i < n; i++)
        {
            while (hull.Count >= 2 && CrossProduct(hull[^2], hull[^1], trees[i]) < 0)
                hull.RemoveAt(hull.Count - 1);

            hull.Add(trees[i]);
        }

        int lowerSize = hull.Count + 1;
        for (int i = n - 2; i >= 0; i--)
        {
            while (hull.Count >= lowerSize && CrossProduct(hull[^2], hull[^1], trees[i]) < 0)
                hull.RemoveAt(hull.Count - 1);

            hull.Add(trees[i]);
        }

        return hull.Distinct(new PointComparer()).ToArray();
    }

    private long CrossProduct(int[] o, int[] a, int[] b)
    {
        return (long)(a[0] - o[0]) * (b[1] - o[1]) - (long)(a[1] - o[1]) * (b[0] - o[0]);
    }

    private class PointComparer : IEqualityComparer<int[]>
    {
        public bool Equals(int[] a, int[] b) => a[0] == b[0] && a[1] == b[1];
        public int GetHashCode(int[] p) => HashCode.Combine(p[0], p[1]);
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the initial sort.
- **Space:** `O(n)` for the hull.
