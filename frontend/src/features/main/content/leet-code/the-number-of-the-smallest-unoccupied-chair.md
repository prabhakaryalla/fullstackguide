# 1942. The Number of the Smallest Unoccupied Chair

**Difficulty:** Medium
**Category:** Array, Hash Table, Heap (Priority Queue), Sorting, Simulation

## Problem

`n` friends attend a party, with friend `i` arriving at `times[i][0]` and leaving at `times[i][1]`. There are infinitely many chairs numbered `0, 1, 2, ...`; when a friend arrives, they take the smallest-numbered unoccupied chair, and their chair becomes free the moment they leave. Return the chair number occupied by the friend arriving at `targetFriend`'s arrival time (friend index `targetFriend`).

### Example

```
Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
Output: 1
Explanation: Friend 0 arrives at 1 -> chair 0. Friend 1 arrives at 2 -> chair 1 (chair 0 still occupied). 
```

### Constraints

- `n == times.length`
- `2 <= n <= 10^4`
- `times[i].length == 2`
- `1 <= arrivali < leavingi <= 10^5`
- `0 <= targetFriend <= n - 1`
- Each friend's arrival time is unique.

## Approach

Sort friends by arrival time, keeping track of their original index. Use a min-heap of free chair numbers, initialized with `0..n-1`, and a min-heap (by leaving time) of `(leaveTime, chairNumber)` for occupied chairs. Process friends in arrival order: first pop all occupied entries whose leave time is `<=` the current arrival time and push their chair numbers back into the free-chair heap; then assign the smallest free chair to the current friend (pop from free-chair heap) and push `(leaveTime, chair)` into the occupied heap. Stop and return the chair once the target friend is processed.

## C# Solution

```csharp
public class Solution
{
    public int SmallestChair(int[][] times, int targetFriend)
    {
        int n = times.Length;
        var order = Enumerable.Range(0, n).OrderBy(i => times[i][0]).ToArray();

        var freeChairs = new PriorityQueue<int, int>();
        for (int i = 0; i < n; i++) freeChairs.Enqueue(i, i);

        var occupied = new PriorityQueue<(int chair, int leave), int>();

        foreach (int i in order)
        {
            int arrival = times[i][0], leave = times[i][1];

            while (occupied.Count > 0 && occupied.Peek().leave <= arrival)
            {
                var (chair, _) = occupied.Dequeue();
                freeChairs.Enqueue(chair, chair);
            }

            int assignedChair = freeChairs.Dequeue();

            if (i == targetFriend)
            {
                return assignedChair;
            }

            occupied.Enqueue((assignedChair, leave), leave);
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — sorting plus heap operations per friend.
- **Space:** `O(n)` for the heaps.
