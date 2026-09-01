# 2494. Merge Overlapping Events in the Same Hall

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 2D array `events` where `events[i] = [start_i, end_i, hall_i]` represents an event that starts at `start_i` and ends at `end_i` in hall `hall_i`.

Merge overlapping events in the same hall. Two events overlap if they share at least one common day and are in the same hall.

Return the number of events after merging.

### Example

```
Input: events = [[1,3,1],[2,5,1],[6,8,1],[1,5,2]]
Output: 3
Explanation: Events in hall 1: [1,3] and [2,5] merge to [1,5], then [6,8] stays separate
Events in hall 2: [1,5] stays as is
Total: 3 events
```

## Approach

Group events by hall, then for each hall:
1. Sort events by start time
2. Merge overlapping intervals
3. Count total merged events across all halls

## C# Solution

```csharp
public class Solution
{
    public int MinMeetingRooms(int[][] events)
    {
        var hallEvents = new Dictionary<int, List<int[]>>();
        
        foreach (var evt in events)
        {
            int hall = evt[2];
            if (!hallEvents.ContainsKey(hall))
            {
                hallEvents[hall] = new List<int[]>();
            }
            hallEvents[hall].Add(new int[] { evt[0], evt[1] });
        }
        
        int totalEvents = 0;
        
        foreach (var pair in hallEvents)
        {
            var intervals = pair.Value;
            intervals.Sort((a, b) => a[0].CompareTo(b[0]));
            
            int mergedCount = 1;
            int currentEnd = intervals[0][1];
            
            for (int i = 1; i < intervals.Count; i++)
            {
                if (intervals[i][0] <= currentEnd)
                {
                    currentEnd = Math.Max(currentEnd, intervals[i][1]);
                }
                else
                {
                    mergedCount++;
                    currentEnd = intervals[i][1];
                }
            }
            
            totalEvents += mergedCount;
        }
        
        return totalEvents;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting events
- **Space:** O(n) for grouping by hall
