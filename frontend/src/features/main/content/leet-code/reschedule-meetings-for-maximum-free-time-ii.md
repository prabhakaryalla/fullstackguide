# 3440. Reschedule Meetings for Maximum Free Time II

**Difficulty:** Medium
**Category:** Array, Greedy, Prefix Sum

## Problem

An event runs from time `0` to `eventTime`. You are given two integer arrays `startTime` and `endTime`, each of length `n`, representing `n` non-overlapping meetings in sorted order. You may reschedule **at most one** meeting by moving its start time while keeping its duration, as long as the relative order of meetings stays the same and they remain non-overlapping. Return the maximum amount of continuous free time possible.

### Example

`eventTime = 5, startTime = [1,3], endTime = [2,4]` → `2`. Moving the meeting `[1,2]` to directly follow `[3,4]` merges the gap before it with the gap between meetings into one block of length 2.

## Approach

Compute the `n + 1` gaps between meetings. For each meeting `i`, the two adjacent gaps `gaps[i]` and `gaps[i+1]` can always be combined for free (simply skip that meeting). Additionally, if there exists some *other* gap (not adjacent to meeting `i`) large enough to hold meeting `i`'s duration, the meeting can be moved there entirely, letting the two adjacent gaps merge with the meeting's own duration into one larger block. Precompute prefix and suffix maximums of the gaps array to answer, in O(1) per meeting, whether such another gap exists.

## C# Solution

```csharp
public class Solution 
{
    public long MaxFreeTime(int eventTime, int[] startTime, int[] endTime) 
    {
        int n = startTime.Length;
        long[] gaps = new long[n + 1];
        gaps[0] = startTime[0];
        for (int i = 1; i < n; i++)
            gaps[i] = startTime[i] - endTime[i - 1];
        gaps[n] = eventTime - endTime[n - 1];

        long[] prefixMax = new long[n + 1];
        prefixMax[0] = gaps[0];
        for (int i = 1; i <= n; i++)
            prefixMax[i] = Math.Max(prefixMax[i - 1], gaps[i]);

        long[] suffixMax = new long[n + 1];
        suffixMax[n] = gaps[n];
        for (int i = n - 1; i >= 0; i--)
            suffixMax[i] = Math.Max(suffixMax[i + 1], gaps[i]);

        long best = 0;
        for (int i = 0; i < n; i++)
        {
            long duration = endTime[i] - startTime[i];
            long merged = gaps[i] + gaps[i + 1];

            bool canMove = (i - 1 >= 0 && prefixMax[i - 1] >= duration) ||
                           (i + 2 <= n && suffixMax[i + 2] >= duration);
            if (canMove)
                merged += duration;

            best = Math.Max(best, merged);
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
