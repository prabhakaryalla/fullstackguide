# 1353. Maximum Number of Events That Can Be Attended

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

Given a list of events `[startDay, endDay]`, where you can attend at most one event per day, return the maximum number of events you can attend.

### Example

```
Input: events = [[1,2],[2,2],[3,3],[3,4],[3,4]]
Output: 4
```

## Approach

Sort events by start day. Walk through each day from the earliest start to the latest end; each day, push every event starting that day into a min-heap keyed by end day, discard events from the heap whose end day has already passed, and if any event remains available, attend the one ending soonest (greedy, since it's the most time-constrained).

## C# Solution

```csharp
public class Solution
{
    public int MaxEvents(int[][] events)
    {
        Array.Sort(events, (a, b) => a[0] - b[0]);
        var minHeap = new PriorityQueue<int, int>();

        int n = events.Length, idx = 0, attended = 0;
        int maxDay = events.Max(e => e[1]);

        for (int day = 1; day <= maxDay; day++)
        {
            while (idx < n && events[idx][0] == day)
            {
                minHeap.Enqueue(events[idx][1], events[idx][1]);
                idx++;
            }

            while (minHeap.Count > 0 && minHeap.Peek() < day)
            {
                minHeap.Dequeue();
            }

            if (minHeap.Count > 0)
            {
                minHeap.Dequeue();
                attended++;
            }

            if (idx >= n && minHeap.Count == 0) break;
        }

        return attended;
    }
}
```

## Complexity

- **Time:** `O((n + maxDay) log n)`.
- **Space:** `O(n)` for the heap.
