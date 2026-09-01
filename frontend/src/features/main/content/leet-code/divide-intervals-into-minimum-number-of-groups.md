# 2406. Divide Intervals Into Minimum Number of Groups

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue), Sorting

## Problem

You are given a 2D integer array `intervals` where `intervals[i] = [left_i, right_i]` represents the inclusive interval `[left_i, right_i]`.

You have to divide the intervals into one or more groups such that each interval is in exactly one group, and no two intervals that are in the same group intersect each other.

Return the minimum number of groups you need to make.

### Example

```
Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
Output: 3
Explanation: We can divide the intervals into the following groups:
- Group 1: [1, 5], [6, 8]
- Group 2: [2, 3], [5, 10]
- Group 3: [1, 10]
```

## Approach

This is equivalent to finding the maximum number of overlapping intervals at any point. Use a sweep line algorithm: create events for interval starts and ends, sort them, and track the current count of active intervals. The maximum count is the answer.

## C# Solution

```csharp
public class Solution
{
    public int MinGroups(int[][] intervals)
    {
        var events = new List<(int time, int type)>();
        
        foreach (var interval in intervals)
        {
            events.Add((interval[0], 1));
            events.Add((interval[1] + 1, -1));
        }
        
        events.Sort((a, b) => a.time == b.time ? a.type.CompareTo(b.type) : a.time.CompareTo(b.time));
        
        int maxGroups = 0;
        int currentGroups = 0;
        
        foreach (var e in events)
        {
            currentGroups += e.type;
            maxGroups = Math.Max(maxGroups, currentGroups);
        }
        
        return maxGroups;
    }
}
```

## Complexity

- **Time:** O(n log n) where n is the number of intervals
- **Space:** O(n) for the events list
