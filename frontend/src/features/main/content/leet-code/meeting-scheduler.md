# 1229. Meeting Scheduler

**Difficulty:** Medium
**Category:** Array, Two Pointers, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two lists of busy-time intervals for two people (`slots1` and `slots2`) and a meeting `duration`, return the earliest time slot of length `duration` that fits in both people's schedules, or an empty array if none exists.

### Example

```
Input: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 8
Output: [60,68]
```

## Approach

Sort both interval lists by start time, then walk them with two pointers, computing the overlap of the current pair of intervals as `[max(start1,start2), min(end1,end2)]`. If that overlap is at least `duration` long, it's a valid meeting window (and since both lists are sorted and scanned in order, it's guaranteed to be the earliest one). Otherwise, advance the pointer belonging to whichever interval ends first, since that interval can no longer contribute a later, larger overlap.

## C# Solution

```csharp
public class Solution
{
    public IList<int> MinAvailableDuration(int[][] slots1, int[][] slots2, int duration)
    {
        Array.Sort(slots1, (a, b) => a[0] - b[0]);
        Array.Sort(slots2, (a, b) => a[0] - b[0]);

        int i = 0, j = 0;

        while (i < slots1.Length && j < slots2.Length)
        {
            int start = Math.Max(slots1[i][0], slots2[j][0]);
            int end = Math.Min(slots1[i][1], slots2[j][1]);

            if (end - start >= duration)
                return new List<int> { start, start + duration };

            if (slots1[i][1] < slots2[j][1]) i++;
            else j++;
        }

        return new List<int>();
    }
}
```

## Complexity

- **Time:** `O(n log n + m log m)` for sorting, where `n` and `m` are the two list lengths.
- **Space:** `O(1)` extra beyond sorting.
