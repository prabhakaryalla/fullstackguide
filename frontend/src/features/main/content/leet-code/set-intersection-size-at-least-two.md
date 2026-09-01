# 757. Set Intersection Size At Least Two

**Difficulty:** Hard
**Category:** Greedy, Array, Sorting

## Problem

Given a list of integer intervals, find the minimum size of a set of integers such that every interval contains at least two integers from the set.

### Example

```
Input: intervals = [[1,3],[3,7],[8,9]]
Output: 5
```

## Approach

Sort intervals by ending point ascending (breaking ties by starting point descending, so shorter/contained intervals are processed appropriately). Greedily maintain the two largest chosen integers so far. For each interval, if neither of the two most-recently chosen integers falls within it, add two new points at the very end of the interval (maximizing their usefulness for future intervals); if only one of them falls within it, add one more point at the interval's end. This greedy strategy minimizes total points because always picking the latest possible points keeps them useful for as many future overlapping intervals as possible.

## C# Solution

```csharp
public class Solution
{
    public int IntersectionSizeTwo(int[][] intervals)
    {
        Array.Sort(intervals, (a, b) => a[1] != b[1] ? a[1] - b[1] : b[0] - a[0]);

        int count = 0;
        int secondLast = -1, last = -1;

        foreach (var interval in intervals)
        {
            int start = interval[0], end = interval[1];

            if (start > last)
            {
                secondLast = end - 1;
                last = end;
                count += 2;
            }
            else if (start > secondLast)
            {
                secondLast = last;
                last = end;
                count += 1;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` extra (excluding sort).
