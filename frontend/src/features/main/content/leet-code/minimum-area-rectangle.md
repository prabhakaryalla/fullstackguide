# 939. Minimum Area Rectangle

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Sorting

## Problem

Given a set of points on an axis-aligned plane, return the minimum area of a rectangle formed from four of these points with sides parallel to the axes. Return `0` if no such rectangle exists.

### Example

```
Input: points = [[1,1],[1,3],[3,1],[3,3],[2,2]]
Output: 4
```

## Approach

Put every point into a hash set for `O(1)` lookup. For every pair of points that could be opposite corners of an axis-aligned rectangle (different `x` and different `y`), check whether the other two corners `(x1, y2)` and `(x2, y1)` also exist; if so, compute the area and track the minimum.

## C# Solution

```csharp
public class Solution
{
    public int MinAreaRect(int[][] points)
    {
        var pointSet = new HashSet<(int, int)>();
        foreach (var p in points) pointSet.Add((p[0], p[1]));

        int minArea = int.MaxValue;

        for (int i = 0; i < points.Length; i++)
        {
            for (int j = i + 1; j < points.Length; j++)
            {
                int x1 = points[i][0], y1 = points[i][1];
                int x2 = points[j][0], y2 = points[j][1];
                if (x1 == x2 || y1 == y2) continue;

                if (pointSet.Contains((x1, y2)) && pointSet.Contains((x2, y1)))
                {
                    minArea = Math.Min(minArea, Math.Abs(x2 - x1) * Math.Abs(y2 - y1));
                }
            }
        }

        return minArea == int.MaxValue ? 0 : minArea;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)`.
