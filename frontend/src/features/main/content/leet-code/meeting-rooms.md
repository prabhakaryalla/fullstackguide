# 252. Meeting Rooms

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings (i.e., no two intervals overlap).

### Example 1

```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
```

### Example 2

```
Input: intervals = [[7,10],[2,4]]
Output: true
```

### Constraints

- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`

## Approach

Sort the intervals by start time. Then scan consecutive pairs: if the next interval's start is before the previous interval's end, the meetings overlap and the person cannot attend all of them.

## C# Solution

```csharp
public class Solution
{
    public bool CanAttendMeetings(int[][] intervals)
    {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));

        for (int i = 1; i < intervals.Length; i++)
        {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by the sort.
- **Space:** `O(log n)` — sort's internal recursion (ignoring input storage).
