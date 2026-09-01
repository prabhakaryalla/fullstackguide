# 391. Perfect Rectangle

**Difficulty:** Hard
**Category:** Array, Sweep Line

## Problem

Given an array `rectangles` where `rectangles[i] = [x1, y1, x2, y2]` represents the bottom-left and top-right corners of an axis-aligned rectangle, return `true` if all the rectangles together exactly cover a rectangular region without gaps or overlaps.

### Example

```
Input: rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
Output: true
```

### Constraints

- `1 <= rectangles.length <= 2 * 10^4`
- `rectangles[i].length == 4`
- `-10^5 <= x1 < x2 <= 10^5`
- `-10^5 <= y1 < y2 <= 10^5`

## Approach

A perfect tiling must satisfy two conditions: the sum of all rectangle areas equals the area of the bounding box, and every corner point cancels out except the four bounding-box corners. Track each corner in a hash set, toggling membership every time it's seen (a corner shared by two rectangles cancels), and verify the area sum plus the remaining four corners exactly match the bounding box.

## C# Solution

```csharp
public class Solution
{
    public bool IsRectangleCover(int[][] rectangles)
    {
        long area = 0;
        int minX = int.MaxValue, minY = int.MaxValue, maxX = int.MinValue, maxY = int.MinValue;
        var corners = new HashSet<(int, int)>();

        foreach (var rect in rectangles)
        {
            int x1 = rect[0], y1 = rect[1], x2 = rect[2], y2 = rect[3];
            area += (long)(x2 - x1) * (y2 - y1);

            minX = Math.Min(minX, x1);
            minY = Math.Min(minY, y1);
            maxX = Math.Max(maxX, x2);
            maxY = Math.Max(maxY, y2);

            var points = new[] { (x1, y1), (x1, y2), (x2, y1), (x2, y2) };
            foreach (var point in points)
            {
                if (!corners.Remove(point))
                    corners.Add(point);
            }
        }

        long expectedArea = (long)(maxX - minX) * (maxY - minY);
        if (area != expectedArea) return false;

        if (corners.Count != 4) return false;

        return corners.Contains((minX, minY)) && corners.Contains((minX, maxY))
            && corners.Contains((maxX, minY)) && corners.Contains((maxX, maxY));
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the rectangles.
- **Space:** `O(n)` for the corner set.
