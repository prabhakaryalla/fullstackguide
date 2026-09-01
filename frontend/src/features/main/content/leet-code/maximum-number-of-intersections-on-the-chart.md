# 3009. Maximum Number of Intersections on the Chart

**Difficulty:** Hard
**Category:** Array, Math, Geometry, Sorting

## Problem

A chart is drawn by plotting `n` points at integer x-coordinates `0, 1, ..., n - 1` with corresponding heights given by the 0-indexed array `y`. Consecutive points `(i - 1, y[i-1])` and `(i, y[i])` are connected by a path that always moves through the half-integer x-coordinate `i - 0.5`, forming a small peak or valley there instead of a straight diagonal line — except at the very first and last points, which are drawn as sharp corners. Return the maximum number of chart segments that any single horizontal line can intersect.

## Approach

Doubling every y-coordinate turns the "half-integer peak" geometry into pure integers: each connecting path between consecutive points spans an integer interval of doubled-y values, with a `+/-1` end-point nudge depending on whether it is an interior peak/valley or the boundary segments. Once every segment is represented as an integer half-open interval `[lo, hi]` on the (doubled) y-axis, this becomes the classic **maximum overlap of intervals** problem:

1. For each pair of consecutive points, compute the interval it spans on the doubled y-axis.
2. Use a difference-array / sweep technique keyed by y-value: `+1` at the start of an interval, `-1` just after its end.
3. Sweep the y-values in sorted order, accumulating the running overlap count and tracking the maximum.

## C# Solution

```csharp
public class Solution {
    public int MaxIntersectionCount(int[] y) {
        int n = y.Length;
        var delta = new SortedDictionary<int, int>();

        for (int i = 1; i < n; i++) {
            int start = 2 * y[i - 1];
            // Interior connections dip to one side; the very last connection is a sharp corner (no nudge).
            int end = 2 * y[i] + (i == n - 1 ? 0 : (y[i] > y[i - 1] ? -1 : 1));
            int lo = Math.Min(start, end);
            int hi = Math.Max(start, end);

            delta[lo] = delta.GetValueOrDefault(lo) + 1;
            delta[hi + 1] = delta.GetValueOrDefault(hi + 1) - 1;
        }

        int ans = 0, running = 0;
        foreach (int change in delta.Values) {
            running += change;
            ans = Math.Max(ans, running);
        }
        return ans;
    }
}
```

## Complexity

- Time: O(n log n) — sorting the O(n) interval boundaries via the sorted dictionary.
- Space: O(n) — one entry per interval boundary.
