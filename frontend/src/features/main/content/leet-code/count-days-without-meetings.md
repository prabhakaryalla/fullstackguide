# 3169. Count Days Without Meetings

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem
You are given the total number of days in an event, and a list of meeting intervals (each with a start and end day, inclusive), where meetings may overlap. Return the number of days during the event where no meeting is scheduled.

## Approach
Sort the meetings by start day. Then sweep through them, tracking the end of the furthest-reaching meeting seen so far (`prevEnd`). Whenever the next meeting's start day is strictly greater than `prevEnd + 1`, the days strictly between them are free, so add that gap to the free-day count. After processing all meetings, also add any remaining free days after the last meeting ends through the last day of the event.

## C# Solution
```csharp
public class Solution {
    public int CountDays(int days, int[][] meetings) {
        int freeDays = 0;
        int prevEnd = 0;

        Array.Sort(meetings, (a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

        foreach (int[] meeting in meetings) {
            int start = meeting[0];
            int end = meeting[1];
            if (start > prevEnd)
                freeDays += start - prevEnd - 1;
            prevEnd = Math.Max(prevEnd, end);
        }

        return freeDays + Math.Max(0, days - prevEnd);
    }
}
```

## Complexity
- Time: O(n log n)
- Space: O(1) extra (ignoring sort's internal space)
