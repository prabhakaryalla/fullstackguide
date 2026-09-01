# 3025. Find the Number of Ways to Place People I

**Difficulty:** Medium
**Category:** Array, Enumeration, Geometry, Math, Sorting

## Problem

You are given a 0-indexed 2D array `points` of distinct integer coordinates. Count the number of ways to choose two points, `A` and `B` (where `A` is the top-left corner and `B` is the bottom-right corner of an axis-aligned rectangle, allowing `A` and `B` to share an x or y coordinate so the rectangle can be degenerate), such that no other point from `points` lies strictly inside or on the boundary of the rectangle formed by `A` and `B` (points can coincide with `A` or `B` themselves, just not lie inside/on the rectangle otherwise).

## Approach

Sort points by x ascending, breaking ties by y descending — this ordering guarantees that for a fixed left point `A`, only points appearing later in the sorted order can be valid right points `B` (their x is `>= A.x`).

For each `A` (fixed at index `i`), scan every later point `B` (index `j > i`) that has `y <= A.y`. Track the best `y` seen so far among valid candidates (`maxY`); a candidate `B` only counts as a *new* valid pair if its `y` is strictly greater than every other valid `B` found so far but still `<= A.y` — this guarantees no earlier-accepted point sits inside the new rectangle. Each time a new, strictly higher `maxY` is found, count one valid placement.

## C# Solution

```csharp
public class Solution {
    public int NumberOfPairs(int[][] points) {
        Array.Sort(points, (a, b) => a[0] != b[0] ? a[0].CompareTo(b[0]) : b[1].CompareTo(a[1]));

        int ans = 0;
        for (int i = 0; i < points.Length; i++) {
            int maxY = int.MinValue;
            for (int j = i + 1; j < points.Length; j++) {
                if (points[i][1] >= points[j][1] && points[j][1] > maxY) {
                    ans++;
                    maxY = points[j][1];
                }
            }
        }
        return ans;
    }
}
```

## Complexity

- Time: O(n^2) — a nested scan over all pairs after sorting.
- Space: O(sort) — space used by the sort.
