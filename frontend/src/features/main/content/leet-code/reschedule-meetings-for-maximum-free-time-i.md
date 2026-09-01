# 3439. Reschedule Meetings for Maximum Free Time I

**Difficulty:** Medium
**Category:** Array, Sliding Window, Prefix Sum

## Problem

An event runs from time `0` to `eventTime`. You are given two integer arrays `startTime` and `endTime`, each of length `n`, representing `n` non-overlapping meetings that occur during `[startTime[i], endTime[i]]`, given in sorted order. You may reschedule at most `k` of the meetings by moving their start time while keeping the same duration, as long as the relative order of the meetings stays the same and they remain non-overlapping. Return the maximum amount of continuous free time possible after rescheduling.

### Example

`eventTime = 5, k = 1, startTime = [1,3], endTime = [2,4]` → `2`. Moving the meeting `[1,2]` right after `[3,4]` merges the two small gaps (before the first meeting and between the meetings) into one continuous free block of length 2.

## Approach

Compute the `n + 1` gaps between consecutive meetings (including the gap before the first meeting and after the last one). Removing `k` meetings and rescheduling them next to each other lets you merge any `k + 1` consecutive gaps together with the durations of the `k` meetings that separated them, forming one continuous free block. Use prefix sums over the gaps and over the meeting durations, then slide a window of `k + 1` gaps across the array and take the maximum of `sum(gaps in window) + sum(durations of meetings inside window)`.

## C# Solution

```csharp
public class Solution 
{
    public long MaxFreeTime(int eventTime, int k, int[] startTime, int[] endTime) 
    {
        int n = startTime.Length;
        long[] gaps = new long[n + 1];
        gaps[0] = startTime[0];
        for (int i = 1; i < n; i++)
            gaps[i] = startTime[i] - endTime[i - 1];
        gaps[n] = eventTime - endTime[n - 1];

        long[] gapPrefix = new long[n + 2];
        for (int i = 0; i <= n; i++)
            gapPrefix[i + 1] = gapPrefix[i] + gaps[i];

        long[] durPrefix = new long[n + 1];
        for (int i = 0; i < n; i++)
            durPrefix[i + 1] = durPrefix[i] + (endTime[i] - startTime[i]);

        long best = 0;
        for (int i = 0; i + k <= n; i++)
        {
            long gapSum = gapPrefix[i + k + 1] - gapPrefix[i];
            long durSum = durPrefix[i + k] - durPrefix[i];
            best = Math.Max(best, gapSum + durSum);
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
