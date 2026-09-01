# 2037. Minimum Number of Moves to Seat Everyone

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

There are `n` seats and `n` students in a room, given as integer arrays `seats` and `students`, both representing positions on a line. You may move any student by one position (left or right) in one move. Return *the minimum number of moves required so that every student ends up sitting in a distinct seat* (students may pass through each other).

## Approach

Sort both `seats` and `students` in ascending order. In an optimal assignment, the `i`th smallest seat should be matched with the `i`th smallest student, because any "crossing" assignment can always be improved (or matched) by an aligned one without increasing total movement. Sum `|seats[i] - students[i]|` over all `i`.

## C# Solution

```csharp
public class Solution
{
    public int MinMovesToSeat(int[] seats, int[] students)
    {
        Array.Sort(seats);
        Array.Sort(students);

        int moves = 0;
        for (int i = 0; i < seats.Length; i++)
            moves += Math.Abs(seats[i] - students[i]);

        return moves;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting.
- **Space:** `O(1)` extra (ignoring the sort's internal usage).
