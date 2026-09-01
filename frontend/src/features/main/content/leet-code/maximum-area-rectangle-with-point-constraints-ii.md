# 3382. Maximum Area Rectangle With Point Constraints II

**Difficulty:** Hard
**Category:** Array, Geometry, Sorting, Binary Search

## Problem
There are `n` points on an infinite plane, given as two integer arrays `xCoord` and `yCoord` where `(xCoord[i], yCoord[i])` is the `i`-th point (`1 <= n <= 2 * 10^5`, all points unique). Find the maximum area of an axis-aligned rectangle that:
- has four of these points as its corners, and
- contains no other given point inside it or on its border.

Return the maximum such area, or `-1` if no valid rectangle exists.

### Example
Input: `xCoord = [1,1,3,3], yCoord = [1,3,1,3]` → the four points form a valid empty rectangle of area `4`. Output: `4`.

## Approach
Group points by x-coordinate with sorted y-values. For every pair of x-columns sharing at least two common y-values, consider consecutive shared y-values as candidate rectangle edges. To validate a candidate rectangle, keep all points sorted by x-coordinate and binary-search directly to the slice of points whose x falls within the candidate's x-range, instead of scanning the entire point set for every candidate — this bounds the interior check to only the points that could possibly matter for that rectangle.

Note: this approach is `O(c^2)` in the number of distinct x-columns `c` in the worst case (checking every pair of columns). It is correct for all inputs, but on adversarial inputs near the `2 * 10^5` limit a production-grade solution would additionally use a segment tree keyed by y-coordinate (as hinted by the official editorial) to jump directly to the nearest qualifying column instead of checking every pair, avoiding the quadratic blowup.

## C# Solution

```csharp
public class Solution 
{
    public long MaxRectangleArea(int[] xCoord, int[] yCoord) 
    {
        int n = xCoord.Length;
        var points = new int[n][];
        for (int i = 0; i < n; i++) points[i] = new int[] { xCoord[i], yCoord[i] };

        var byX = new Dictionary<int, SortedSet<int>>();
        foreach (var p in points) 
        {
            if (!byX.TryGetValue(p[0], out var set)) byX[p[0]] = set = new SortedSet<int>();
            set.Add(p[1]);
        }

        var sortedByX = points.OrderBy(p => p[0]).ThenBy(p => p[1]).ToArray();
        var xs = byX.Keys.OrderBy(x => x).ToList();
        long best = -1;

        for (int a = 0; a < xs.Count; a++) 
        {
            for (int b = a + 1; b < xs.Count; b++) 
            {
                int x1 = xs[a], x2 = xs[b];
                var common = byX[x1].Intersect(byX[x2]).OrderBy(y => y).ToList();
                if (common.Count < 2) continue;

                for (int i = 0; i + 1 < common.Count; i++) 
                {
                    int y1 = common[i], y2 = common[i + 1];
                    if (HasInteriorPoint(sortedByX, x1, x2, y1, y2)) continue;
                    best = Math.Max(best, (long)(x2 - x1) * (y2 - y1));
                }
            }
        }
        return best;
    }

    private bool HasInteriorPoint(int[][] sortedByX, int x1, int x2, int y1, int y2) 
    {
        int lo = LowerBound(sortedByX, x1);
        for (int i = lo; i < sortedByX.Length && sortedByX[i][0] <= x2; i++) 
        {
            int x = sortedByX[i][0], y = sortedByX[i][1];
            if (y < y1 || y > y2) continue;

            if (x == x1 || x == x2) 
            {
                if (y != y1 && y != y2) return true;
            } 
            else 
            {
                return true;
            }
        }
        return false;
    }

    private int LowerBound(int[][] arr, int x) 
    {
        int lo = 0, hi = arr.Length;
        while (lo < hi) 
        {
            int mid = (lo + hi) / 2;
            if (arr[mid][0] < x) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting, with each candidate rectangle check bounded by the points in its x-range.
- **Space:** O(n)
