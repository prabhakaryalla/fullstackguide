# 855. Exam Room

**Difficulty:** Medium
**Category:** Design, Heap, Ordered Set

## Problem

Design an exam room with `n` seats in a row. Each time a student enters via `Seat()`, they must sit in the seat that maximizes the distance to the nearest already-seated student (or seat `0` if the room is empty); ties go to the lowest-numbered seat. Support `Leave(p)` to free a seat.

### Example

```
Input:
["ExamRoom", "seat", "seat", "seat", "seat", "leave", "seat"]
[[10], [], [], [], [], [4], []]
Output:
[null, 0, 9, 4, 2, null, 5]
```

## Approach

Maintain the occupied seats in a sorted set. To find the best seat, consider the distance from the start to the first occupied seat, the distance from the last occupied seat to the end, and the midpoint distance of every gap between two consecutive occupied seats — tracking whichever produces the largest distance, preferring the leftmost candidate on ties by only updating when a strictly larger distance is found while scanning left to right.

## C# Solution

```csharp
public class ExamRoom
{
    private readonly SortedSet<int> seats = new();
    private readonly int n;

    public ExamRoom(int n)
    {
        this.n = n;
    }

    public int Seat()
    {
        if (seats.Count == 0)
        {
            seats.Add(0);
            return 0;
        }

        int bestSeat = 0;
        int bestDist = seats.Min;

        int prev = -1;

        foreach (var seat in seats)
        {
            if (prev != -1)
            {
                int gap = (seat - prev) / 2;
                if (gap > bestDist)
                {
                    bestDist = gap;
                    bestSeat = prev + gap;
                }
            }

            prev = seat;
        }

        int lastGap = n - 1 - prev;
        if (lastGap > bestDist)
        {
            bestSeat = n - 1;
        }

        seats.Add(bestSeat);
        return bestSeat;
    }

    public void Leave(int p)
    {
        seats.Remove(p);
    }
}
```

## Complexity

- **Time:** `O(n)` per `Seat` call.
- **Space:** `O(n)` for the occupied seats set.
