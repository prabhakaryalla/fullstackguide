# 731. My Calendar II

**Difficulty:** Medium
**Category:** Design, Segment Tree, Ordered Set

## Problem

Design a calendar that allows double bookings but prevents triple bookings (three events overlapping at the same time). Implement `Book(start, end)`, returning `true` if the event can be added without causing a triple booking.

### Example

```
Input:
["MyCalendarTwo", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output:
[null, true, true, true, false, true, true]
```

## Approach

Maintain two lists: all single bookings, and all regions currently double-booked. Before accepting a new event, reject it if it overlaps any existing double-booked region (accepting it would create a triple booking). Otherwise, compute the overlap between the new event and every existing single booking, recording each such overlap as a new double-booked region, then add the new event to the bookings list.

## C# Solution

```csharp
public class MyCalendarTwo
{
    private readonly List<(int Start, int End)> bookings = new();
    private readonly List<(int Start, int End)> overlaps = new();

    public bool Book(int start, int end)
    {
        foreach (var (overlapStart, overlapEnd) in overlaps)
        {
            if (start < overlapEnd && overlapStart < end)
                return false;
        }

        foreach (var (bookedStart, bookedEnd) in bookings)
        {
            int overlapStart = Math.Max(start, bookedStart);
            int overlapEnd = Math.Min(end, bookedEnd);

            if (overlapStart < overlapEnd)
                overlaps.Add((overlapStart, overlapEnd));
        }

        bookings.Add((start, end));
        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` per `Book` call.
- **Space:** `O(n)` for the bookings and overlaps lists.
