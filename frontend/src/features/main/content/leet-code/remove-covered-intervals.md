# 1288. Remove Covered Intervals

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

Given a list of intervals, remove every interval that is entirely covered by another interval in the list (interval `[a, b]` covers `[c, d]` if `a <= c` and `d <= b`), and return the number of intervals remaining.

### Example

```
Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
```

## Approach

Sort intervals by start ascending, breaking ties by end descending. This ordering guarantees that whenever a later interval shares the same start as an earlier one, the earlier one (with the larger end) is processed first and cannot be covered by it. Then scan the sorted intervals while tracking the maximum end seen so far: an interval is *not* covered exactly when its end exceeds that running maximum, in which case it becomes the new "frontier" and is counted; otherwise it's covered by a previous interval and skipped.

## C# Solution

```csharp
public class Solution
{
    public int RemoveCoveredIntervals(int[][] intervals)
    {
        Array.Sort(intervals, (a, b) => a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);

        int count = 0, maxEnd = int.MinValue;

        foreach (var interval in intervals)
        {
            if (interval[1] > maxEnd)
            {
                count++;
                maxEnd = interval[1];
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra beyond sorting.
