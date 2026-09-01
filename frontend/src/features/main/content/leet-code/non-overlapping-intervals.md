# 435. Non-overlapping Intervals

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of intervals that need to be removed to make the rest of the intervals non-overlapping.

### Example

```
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
```

### Constraints

- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `-5 * 10^4 <= starti < endi <= 5 * 10^4`

## Approach

Sort intervals by end time. Greedily keep the interval with the earliest end time whenever a conflict arises, since it leaves the most room for subsequent intervals. Track the end time of the last kept interval, and whenever the next interval's start is before that end time, it must be removed (count it); otherwise, keep it and update the tracked end time.

## C# Solution

```csharp
public class Solution
{
    public int EraseOverlapIntervals(int[][] intervals)
    {
        if (intervals.Length == 0) return 0;

        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));

        int count = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.Length; i++)
        {
            if (intervals[i][0] < prevEnd)
            {
                count++;
            }
            else
            {
                prevEnd = intervals[i][1];
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
