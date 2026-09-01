# 729. My Calendar I

**Difficulty:** Medium
**Category:** Design, Segment Tree, Ordered Set (Binary Search)

## Problem

Design a calendar that can add events without double-booking (an event `[start, end)` conflicts with another if they overlap). Implement `Book(start, end)`, returning `true` if the event can be added without a conflict.

### Example

```
Input:
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output:
[null, true, false, true]
```

## Approach

Maintain a list of previously booked intervals. To book a new event, check it against every existing event for overlap (two intervals `[start, end)` and `[existingStart, existingEnd)` overlap exactly when `start < existingEnd` and `existingStart < end`); if none overlap, the new event can be added.

## C# Solution

```csharp
public class MyCalendar
{
    private readonly List<(int Start, int End)> events = new();

    public bool Book(int start, int end)
    {
        foreach (var (existingStart, existingEnd) in events)
        {
            if (start < existingEnd && existingStart < end)
                return false;
        }

        events.Add((start, end));
        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` per `Book` call.
- **Space:** `O(n)` for the stored events.
