# 2054. Two Best Non-Overlapping Events

**Difficulty:** Medium
**Category:** Array, Binary Search, Dynamic Programming, Sorting

## Problem

You are given a 0-indexed 2D array `events`, where `events[i] = [startTime, endTime, value]` denotes an event occupying the closed interval `[startTime, endTime]` with the given value. You may attend at most **two non-overlapping** events (an event ending at time `t` and another starting at time `t` are considered overlapping). Return *the maximum sum of values from attending at most two events*.

## Approach

Sort events by start time. Build a `suffixMax` array where `suffixMax[i]` is the maximum value among `events[i..n-1]` — this lets us quickly find the best possible second event chosen from any suffix of the sorted list.

For each event `i` (as the "first" event attended), binary search among the sorted start times for the first event `j` whose `startTime` is strictly greater than `events[i].endTime`. If such a `j` exists, `events[i].value + suffixMax[j]` is a candidate for attending two events. Also consider attending just a single event (`events[i].value` alone). Track the overall maximum across all these candidates.

## C# Solution

```csharp
public class Solution
{
    public int MaxTwoEvents(int[][] events)
    {
        int n = events.Length;
        Array.Sort(events, (a, b) => a[0].CompareTo(b[0]));

        var suffixMax = new int[n];
        suffixMax[n - 1] = events[n - 1][2];
        for (int i = n - 2; i >= 0; i--)
            suffixMax[i] = Math.Max(suffixMax[i + 1], events[i][2]);

        int best = 0;
        var starts = new int[n];
        for (int i = 0; i < n; i++) starts[i] = events[i][0];

        for (int i = 0; i < n; i++)
        {
            best = Math.Max(best, events[i][2]);

            int j = UpperBound(starts, events[i][1]);
            if (j < n)
                best = Math.Max(best, events[i][2] + suffixMax[j]);
        }

        return best;
    }

    private int UpperBound(int[] starts, int endTime)
    {
        int lo = 0, hi = starts.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (starts[mid] <= endTime) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the suffix-max and start-time arrays.
