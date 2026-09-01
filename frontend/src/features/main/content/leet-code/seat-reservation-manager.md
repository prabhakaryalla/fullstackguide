# 1845. Seat Reservation Manager

**Difficulty:** Medium
**Category:** Design, Heap (Priority Queue)

## Problem

Design a `SeatManager` that manages `n` seats numbered `1` to `n`, all initially available. `Reserve()` reserves and returns the smallest-numbered available seat. `Unreserve(seatNumber)` marks a previously reserved seat as available again.

### Example

```
Input: ["SeatManager","reserve","reserve","unreserve","reserve","reserve","reserve","reserve","unreserve"]
       [[5],[],[],[2],[],[],[],[],[5]]
Output: [null,1,2,null,2,3,4,5,null]
```

## Approach

Avoid pre-populating a heap with all `n` seats up front. Instead, keep a min-heap of seats that were reserved and later released, plus a counter for the smallest seat number never yet issued. `Reserve()` returns from the heap if it's non-empty (a previously freed seat is always smaller than any never-used seat, since it was issued earlier), otherwise it issues and increments the counter. `Unreserve(seatNumber)` simply pushes the seat back onto the heap.

## C# Solution

```csharp
public class SeatManager
{
    private readonly PriorityQueue<int, int> _available = new();
    private int _nextNew;

    public SeatManager(int n)
    {
        _nextNew = 1;
    }

    public int Reserve()
    {
        if (_available.Count > 0) return _available.Dequeue();
        return _nextNew++;
    }

    public void Unreserve(int seatNumber)
    {
        _available.Enqueue(seatNumber, seatNumber);
    }
}
```

## Complexity

- **Time:** `O(log n)` per operation.
- **Space:** `O(n)` in the worst case for the heap of released seats.
