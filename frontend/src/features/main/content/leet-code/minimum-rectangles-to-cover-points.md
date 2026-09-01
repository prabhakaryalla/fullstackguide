# 3111. Minimum Rectangles to Cover Points

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You are given a 2D array `points` and an integer `w`. Each rectangle you place has a fixed width `w` (covering an x-range `[x, x + w]` for a chosen `x`) and unbounded height, and must cover every point whose x-coordinate falls in its range (points are covered regardless of their y-coordinate as long as x is in range). Return the minimum number of such rectangles needed to cover every point.

## Approach

Only the x-coordinates matter. Sort them, then greedily sweep left to right: start a new rectangle at the first uncovered point (its x-range extends `w` to the right), and it covers every subsequent point whose x-coordinate falls within that range; once a point exceeds the current rectangle's reach, start a new rectangle there instead.

## C# Solution

```csharp
public class Solution {
    public int MinRectanglesToCoverPoints(int[][] points, int w) {
        int ans = 0;
        int prevX = -w - 1;
        int[] xs = points.Select(p => p[0]).OrderBy(x => x).ToArray();

        foreach (int x in xs) {
            if (x > prevX + w) {
                ans++;
                prevX = x;
            }
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n log n) — dominated by sorting the x-coordinates.
- Space: O(n) — the sorted x-coordinate array.
