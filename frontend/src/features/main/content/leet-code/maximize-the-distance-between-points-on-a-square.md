# 3464. Maximize the Distance Between Points on a Square

**Difficulty:** Hard
**Category:** Array, Binary Search, Geometry

## Problem
You are given an integer `side` representing the side length of a square whose corners are at `(0, 0)`, `(0, side)`, `(side, side)`, and `(side, 0)`. You are also given a 2D array `points` where each point lies on the boundary of the square. Choose `k` points from `points` such that the minimum pairwise distance (measured along the perimeter of the square) between any two chosen points is maximized. Return that maximum possible minimum distance.

## Approach
Map every point to its 1D position along the perimeter (unrolling the square boundary into a line of total length `4 * side`, walking clockwise starting from `(0,0)`). Sort these perimeter positions. Binary search on the answer `d` (the minimum required distance between any two chosen points along the circular perimeter). For a candidate `d`, greedily check feasibility: try each possible starting point as the first selection (or fix the first selected point and simulate greedily selecting subsequent points at least `d` apart along the circular arrangement), counting how many points can be selected; if at least `k` points can be selected for some starting choice, `d` is feasible. Since the arrangement is circular, iterate the starting point over the first candidate's early positions (or duplicate the array to break circularity) to correctly handle wraparound.

## C# Solution

```csharp
public class Solution 
{
    public int MaxDistance(int side, int[][] points, int k) 
    {
        int n = points.Length;
        long perimeter = 4L * side;
        long[] pos = new long[n];

        for (int i = 0; i < n; i++)
        {
            int x = points[i][0], y = points[i][1];
            long p;
            if (y == 0) p = x;                              // bottom edge, moving right
            else if (x == side) p = side + y;                // right edge, moving up
            else if (y == side) p = 2L * side + (side - x);  // top edge, moving left
            else p = 3L * side + (side - y);                 // left edge, moving down
            pos[i] = p;
        }

        System.Array.Sort(pos);

        // Duplicate the sorted positions shifted by one full perimeter to handle wraparound easily.
        long[] doubled = new long[2 * n];
        for (int i = 0; i < n; i++)
        {
            doubled[i] = pos[i];
            doubled[i + n] = pos[i] + perimeter;
        }

        long lo = 0, hi = perimeter;
        long ans = 0;

        while (lo <= hi)
        {
            long mid = lo + (hi - lo) / 2;
            if (Feasible(doubled, n, perimeter, k, mid))
            {
                ans = mid;
                lo = mid + 1;
            }
            else
            {
                hi = mid - 1;
            }
        }

        return (int)ans;
    }

    // For a fixed spacing d, check if any starting point among the first n allows
    // selecting k points (moving forward through doubled array) all at least d apart,
    // without exceeding one full lap (perimeter) from the start.
    private bool Feasible(long[] doubled, int n, long perimeter, int k, long d)
    {
        if (d == 0) return true;

        for (int start = 0; start < n; start++)
        {
            long limit = doubled[start] + perimeter;
            int count = 1;
            long lastPos = doubled[start];
            int idx = start;

            while (count < k)
            {
                int next = idx + 1;
                if (next >= 2 * n || doubled[next] - lastPos < d) 
                {
                    // linear scan forward for the next valid point (idx increases monotonically overall)
                    next = idx + 1;
                    while (next < 2 * n && doubled[next] - lastPos < d) next++;
                }
                if (next >= 2 * n || doubled[next] > limit) break;

                lastPos = doubled[next];
                idx = next;
                count++;
            }

            if (count >= k) return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(n^2 log(perimeter)) in this straightforward simulation; the standard optimized solution uses a two-pointer sweep so each `Feasible` check runs in O(n), giving O(n log(perimeter)) overall
- **Space:** O(n) for the sorted and doubled perimeter position arrays
