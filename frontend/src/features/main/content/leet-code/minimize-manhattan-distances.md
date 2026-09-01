# 3102. Minimize Manhattan Distances

**Difficulty:** Hard
**Category:** Array, Math, Geometry, Ordered Set, Sorting

## Problem

You are given an array `points` of 2D integer coordinates. Remove exactly one point, then the "cost" of the remaining set is the maximum Manhattan distance between any two of them. Return the minimum possible cost achievable by choosing which single point to remove.

## Approach

The Manhattan distance between two points can be rewritten using the transform `(x + y)` and `(x - y)`: `|x1-x2| + |y1-y2| = max(|(x1+y1)-(x2+y2)|, |(x1-y1)-(x2-y2)|)`. This means the overall maximum Manhattan distance is `max(range of (x+y), range of (x-y))` across all points, and it's always achieved by the pair of points realizing the min/max of whichever of those two ranges is larger. So: find that extremal pair `(i, j)` first (ignoring removals); the answer only changes if we remove one of `i` or `j` (removing anything else can't reduce the global maximum below what it already is, since `i`/`j` remain). Try removing `i` and separately removing `j`, recomputing the maximum Manhattan distance each time (again via the same min/max-of-sum-and-diff trick, this time excluding the removed index), and take the smaller of the two results.

## C# Solution

```csharp
public class Solution {
    public int MinimumDistance(int[][] points) {
        var (i, j) = MaxManhattanDistance(points, -1);
        var (xi, yi) = MaxManhattanDistance(points, i);
        var (xj, yj) = MaxManhattanDistance(points, j);
        return Math.Min(Manhattan(points, xi, yi), Manhattan(points, xj, yj));
    }

    // Returns the pair of indices whose points achieve the maximum Manhattan
    // distance, ignoring the point at excludedIndex (if any).
    private (int, int) MaxManhattanDistance(int[][] points, int excludedIndex) {
        int minSum = int.MaxValue, maxSum = int.MinValue;
        int minDiff = int.MaxValue, maxDiff = int.MinValue;
        int minSumIndex = -1, maxSumIndex = -1;
        int minDiffIndex = -1, maxDiffIndex = -1;

        for (int i = 0; i < points.Length; i++) {
            if (i == excludedIndex)
                continue;
            int x = points[i][0], y = points[i][1];
            int sum = x + y, diff = x - y;
            if (sum < minSum) { minSum = sum; minSumIndex = i; }
            if (sum > maxSum) { maxSum = sum; maxSumIndex = i; }
            if (diff < minDiff) { minDiff = diff; minDiffIndex = i; }
            if (diff > maxDiff) { maxDiff = diff; maxDiffIndex = i; }
        }

        return maxSum - minSum >= maxDiff - minDiff
            ? (minSumIndex, maxSumIndex)
            : (minDiffIndex, maxDiffIndex);
    }

    private int Manhattan(int[][] points, int i, int j) {
        return Math.Abs(points[i][0] - points[j][0]) + Math.Abs(points[i][1] - points[j][1]);
    }
}
```

## Complexity

- Time: O(n) — three linear scans over the points array.
- Space: O(1).
