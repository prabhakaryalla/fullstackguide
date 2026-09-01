# 3027. Find the Number of Ways to Place People II

**Difficulty:** Hard
**Category:** Array, Math, Geometry, Sorting

## Problem

This is the larger-constraints version of [Find the Number of Ways to Place People I](find-the-number-of-ways-to-place-people-i.md): given a 0-indexed 2D array `points` of distinct integer coordinates (now up to `10^5` points), count the number of valid `(A, B)` rectangle placements where `A` is the top-left corner, `B` is the bottom-right corner, and no other point lies strictly inside or on the rectangle's boundary.

## Approach

The same sort-then-scan idea from Part I still applies: sort by x ascending (ties broken by y descending), then for each candidate top-left point `A`, scan later points for the best (highest, but not exceeding `A`'s y) candidate bottom-right point `B`, counting a valid placement each time a strictly better `y` is found. The reference solution keeps the straightforward O(n^2) approach, which is efficient enough in practice for this variant's constraints.

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
