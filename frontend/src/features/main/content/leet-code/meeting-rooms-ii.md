# 253. Meeting Rooms II

**Difficulty:** Medium
**Category:** Array, Two Pointers, Greedy, Sorting, Heap (Priority Queue)

## Problem

Given an array of meeting time intervals `intervals`, return the minimum number of conference rooms required to hold all the meetings.

### Example

```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
```

### Constraints

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`

## Approach

Separate start times and end times into two sorted arrays. Walk through the start times in order using a pointer into the sorted end times: whenever the current start is greater than or equal to the earliest unmatched end time, a room is freed up (advance the end pointer) instead of allocating a new one; otherwise a new room is required. The maximum number of simultaneously "open" rooms is the answer.

## C# Solution

```csharp
public class Solution
{
    public int MinMeetingRooms(int[][] intervals)
    {
        int n = intervals.Length;
        var starts = new int[n];
        var ends = new int[n];

        for (int i = 0; i < n; i++)
        {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }

        Array.Sort(starts);
        Array.Sort(ends);

        int rooms = 0, maxRooms = 0, endPointer = 0;
        for (int i = 0; i < n; i++)
        {
            if (starts[i] < ends[endPointer])
            {
                rooms++;
            }
            else
            {
                endPointer++;
            }

            maxRooms = Math.Max(maxRooms, rooms);
        }

        return maxRooms;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting the start and end arrays.
- **Space:** `O(n)` — for the separated start/end arrays.
