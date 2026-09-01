# 3380. Maximum Area Rectangle With Point Constraints I

**Difficulty:** Medium
**Category:** Array, Geometry, Sorting

## Problem

Given points on a plane, find the maximum area of an axis-aligned rectangle whose 4 corners are all points from the given set, such that no other given point lies inside or on the boundary of the rectangle (other than the 4 corners themselves). Return `0` if no such rectangle exists.

### Example

Four points forming a rectangle with no fifth point inside or on its edges yields that rectangle's area as a candidate.

## Approach

Group points by x-coordinate with sorted y-lists. For every pair of x-columns that share at least two common y-values, consider consecutive common y-values as candidate rectangle edges, then verify no other point lies strictly inside or along the rectangle's boundary before accepting the area.

## C# Solution

```csharp
public class Solution 
{
    public long MaxRectangleArea(int[][] points) 
    {
        var byX = new Dictionary<int, SortedSet<int>>();
        foreach (var p in points) 
        {
            if (!byX.TryGetValue(p[0], out var set)) byX[p[0]] = set = new SortedSet<int>();
            set.Add(p[1]);
        }

        var xs = new List<int>(byX.Keys);
        xs.Sort();
        long best = -1;

        for (int a = 0; a < xs.Count; a++) 
        {
            for (int b = a + 1; b < xs.Count; b++) 
            {
                int x1 = xs[a], x2 = xs[b];
                var common = new List<int>();
                foreach (int y in byX[x1])
                    if (byX[x2].Contains(y)) common.Add(y);
                if (common.Count < 2) continue;

                for (int i = 0; i + 1 < common.Count; i++) 
                {
                    int y1 = common[i], y2 = common[i + 1];
                    if (HasInteriorPoint(points, x1, x2, y1, y2)) continue;
                    long area = (long)(x2 - x1) * (y2 - y1);
                    best = Math.Max(best, area);
                }
            }
        }
        return best;
    }

    private bool HasInteriorPoint(int[][] points, int x1, int x2, int y1, int y2) 
    {
        foreach (var p in points) 
        {
            int x = p[0], y = p[1];
            if (x < x1 || x > x2 || y < y1 || y > y2) continue;
            bool isCorner = (x == x1 || x == x2) && (y == y1 || y == y2);
            if (!isCorner) return true;
        }
        return false;
    }
}
```

## Complexity

- **Time:** O(n^3) worst case
- **Space:** O(n)
