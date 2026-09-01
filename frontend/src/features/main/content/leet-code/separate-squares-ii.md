# 3454. Separate Squares II

**Difficulty:** Hard
**Category:** Array, Binary Search, Geometry, Line Sweep, Segment Tree

## Problem
You are given a 2D array `squares` where `squares[i] = [x, y, length]` describes an axis-aligned square with bottom-left corner `(x, y)` and side length `length`. Squares may overlap. Find a horizontal line `y = k` such that the total area covered (union of all squares, not double-counting overlaps) above the line equals the total area covered below the line. Return `k`. Answers within `1e-5` are accepted.

## Approach
Because squares can overlap, area must be computed as a union, not a simple sum. Use coordinate compression on the y-coordinates of square edges to build a sorted list of candidate breakpoints. Precompute, for each horizontal strip between consecutive distinct y-breakpoints, the total covered width (union of x-intervals of squares that span that strip) using a sweep over intervals (sort by x, merge overlapping intervals). Then the union area below any y-breakpoint can be computed as a prefix sum over strips (strip height * strip covered width). Binary search over the sorted breakpoints (and interpolate linearly within the strip containing the target) to find the line where cumulative area equals half of the total union area.

## C# Solution

```csharp
public class Solution 
{
    public double SeparateSquares(int[][] squares) 
    {
        int n = squares.Length;
        var ys = new System.Collections.Generic.SortedSet<long>();
        foreach (var sq in squares)
        {
            ys.Add(sq[1]);
            ys.Add(sq[1] + sq[2]);
        }

        long[] yArr = new long[ys.Count];
        ys.CopyTo(yArr);

        int m = yArr.Length;
        double[] stripWidth = new double[m - 1]; // covered x-width for strip [yArr[i], yArr[i+1]]

        for (int i = 0; i < m - 1; i++)
        {
            long stripLo = yArr[i];
            long stripHi = yArr[i + 1];
            var intervals = new System.Collections.Generic.List<(long l, long r)>();

            foreach (var sq in squares)
            {
                long sy = sq[1];
                long len = sq[2];
                long sHi = sy + len;
                if (sy <= stripLo && sHi >= stripHi)
                {
                    intervals.Add((sq[0], sq[0] + len));
                }
            }

            stripWidth[i] = MergedWidth(intervals);
        }

        double[] stripArea = new double[m - 1];
        double totalArea = 0;
        for (int i = 0; i < m - 1; i++)
        {
            stripArea[i] = stripWidth[i] * (yArr[i + 1] - yArr[i]);
            totalArea += stripArea[i];
        }

        double target = totalArea / 2.0;
        double cumulative = 0;

        for (int i = 0; i < m - 1; i++)
        {
            if (cumulative + stripArea[i] >= target)
            {
                double remaining = target - cumulative;
                if (stripWidth[i] == 0) return yArr[i + 1];
                double fraction = remaining / stripArea[i];
                return yArr[i] + fraction * (yArr[i + 1] - yArr[i]);
            }
            cumulative += stripArea[i];
        }

        return yArr[m - 1];
    }

    private double MergedWidth(System.Collections.Generic.List<(long l, long r)> intervals)
    {
        if (intervals.Count == 0) return 0;
        intervals.Sort((a, b) => a.l.CompareTo(b.l));

        double total = 0;
        long curL = intervals[0].l;
        long curR = intervals[0].r;

        for (int i = 1; i < intervals.Count; i++)
        {
            var (l, r) = intervals[i];
            if (l > curR)
            {
                total += curR - curL;
                curL = l;
                curR = r;
            }
            else
            {
                curR = System.Math.Max(curR, r);
            }
        }
        total += curR - curL;

        return total;
    }
}
```

## Complexity

- **Time:** O(n^2 log n) due to recomputation of intervals per strip; can be optimized to O(n log n) with a sweep-line and segment tree tracking covered width
- **Space:** O(n) for breakpoints and interval lists
