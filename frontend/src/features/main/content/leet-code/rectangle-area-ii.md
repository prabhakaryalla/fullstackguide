# 850. Rectangle Area II

**Difficulty:** Hard
**Category:** Array, Line Sweep, Segment Tree

## Problem

Given an array of axis-aligned `rectangles`, each `[x1, y1, x2, y2]`, return the total area covered by their union, modulo `10^9 + 7`.

### Example

```
Input: rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
Output: 6
```

## Approach

Use a vertical line sweep: collect all distinct x-coordinates that appear as rectangle edges and sort them, dividing the plane into vertical strips between consecutive x-coordinates. For each strip, determine which rectangles fully span it, collect their y-intervals, merge overlapping y-intervals, and sum the merged interval lengths to get the covered height for that strip. Multiply each strip's width by its covered height and accumulate the total area (taking the modulo at each addition).

## C# Solution

```csharp
public class Solution
{
    public int RectangleArea(int[][] rectangles)
    {
        const int MOD = 1_000_000_007;

        var xs = new SortedSet<int>();
        foreach (var rect in rectangles)
        {
            xs.Add(rect[0]);
            xs.Add(rect[2]);
        }

        var xList = xs.ToList();
        long totalArea = 0;

        for (int i = 0; i < xList.Count - 1; i++)
        {
            int x1 = xList[i], x2 = xList[i + 1];
            long width = x2 - x1;

            var intervals = new List<(int Start, int End)>();

            foreach (var rect in rectangles)
            {
                if (rect[0] <= x1 && x2 <= rect[2])
                    intervals.Add((rect[1], rect[3]));
            }

            intervals.Sort((a, b) => a.Start != b.Start ? a.Start - b.Start : a.End - b.End);

            long height = 0;
            int curStart = -1, curEnd = -1;

            foreach (var (start, end) in intervals)
            {
                if (start > curEnd)
                {
                    height += curEnd - curStart > 0 ? curEnd - curStart : 0;
                    curStart = start;
                    curEnd = end;
                }
                else
                {
                    curEnd = Math.Max(curEnd, end);
                }
            }

            height += curEnd - curStart > 0 ? curEnd - curStart : 0;

            totalArea = (totalArea + width * height) % MOD;
        }

        return (int)totalArea;
    }
}
```

## Complexity

- **Time:** `O(n^2 log n)`.
- **Space:** `O(n)` for the intervals and x-coordinate list.
