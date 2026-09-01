# 732. My Calendar III

**Difficulty:** Hard
**Category:** Design, Segment Tree, Binary Indexed Tree, Ordered Set

## Problem

Design a calendar that tracks the maximum number of overlapping events (the "k-booking") at any point in time. Implement `Book(start, end)`, returning the maximum number of events that have ever overlapped at a single point after adding the new event.

### Example

```
Input:
["MyCalendarThree", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40]]
Output:
[null, 1, 1, 2]
```

## Approach

Use a sweep-line technique with a sorted map of "delta" values at event boundaries: booking `[start, end)` increments the delta at `start` by 1 and decrements it at `end` by 1. After each new booking, sweep through the sorted delta map in order, maintaining a running sum that represents the number of currently overlapping events at each boundary point, and track the maximum running sum seen — that maximum is the current k-booking level.

## C# Solution

```csharp
public class MyCalendarThree
{
    private readonly SortedDictionary<int, int> delta = new();

    public int Book(int start, int end)
    {
        delta[start] = delta.GetValueOrDefault(start) + 1;
        delta[end] = delta.GetValueOrDefault(end) - 1;

        int maxOverlap = 0, current = 0;

        foreach (var pair in delta)
        {
            current += pair.Value;
            maxOverlap = Math.Max(maxOverlap, current);
        }

        return maxOverlap;
    }
}
```

## Complexity

- **Time:** `O(n)` per `Book` call, due to the full sweep.
- **Space:** `O(n)` for the delta map.
