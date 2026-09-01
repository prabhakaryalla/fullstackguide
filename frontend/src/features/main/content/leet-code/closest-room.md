# 1847. Closest Room

**Difficulty:** Hard
**Category:** Array, Binary Search, Sorting

## Problem

Given `rooms[i] = [roomId, size]` and `queries[j] = [preferredId, minSize]`, for each query find the `roomId` with `size >= minSize` that is closest to `preferredId` (ties broken by the smaller room id); return `-1` if no room qualifies. Return the answers in the original query order.

### Example

```
Input: rooms = [[2,2],[1,2],[3,2]], queries = [[3,1],[3,3],[5,2]]
Output: [3,-1,3]
```

## Approach

Process both rooms and queries sorted by size descending (an offline sweep). Maintain a `SortedSet<int>` of room ids whose size currently satisfies the query's `minSize` threshold, adding rooms to it as the threshold sweeps downward. For each query (in decreasing `minSize` order), first add every room with `size >= minSize` that hasn't been added yet, then use `SortedSet.GetViewBetween` to find the largest id `<= preferredId` and the smallest id `>= preferredId`; compare their distances (and ids on a tie) to pick the best candidate. Answers are written back into an array indexed by original query order.

## C# Solution

```csharp
public class Solution
{
    public int[] ClosestRoom(int[][] rooms, int[][] queries)
    {
        int n = rooms.Length, q = queries.Length;
        Array.Sort(rooms, (a, b) => b[1].CompareTo(a[1]));

        var queryOrder = Enumerable.Range(0, q).OrderByDescending(i => queries[i][1]).ToArray();
        var result = new int[q];
        var ids = new SortedSet<int>();
        int roomPointer = 0;

        foreach (int qi in queryOrder)
        {
            int preferredId = queries[qi][0];
            int minSize = queries[qi][1];

            while (roomPointer < n && rooms[roomPointer][1] >= minSize)
            {
                ids.Add(rooms[roomPointer][0]);
                roomPointer++;
            }

            if (ids.Count == 0)
            {
                result[qi] = -1;
                continue;
            }

            int best = -1;
            long bestDiff = long.MaxValue;

            var lower = ids.GetViewBetween(int.MinValue, preferredId);
            if (lower.Count > 0)
            {
                int candidate = lower.Max;
                bestDiff = Math.Abs((long)candidate - preferredId);
                best = candidate;
            }

            var upper = ids.GetViewBetween(preferredId, int.MaxValue);
            if (upper.Count > 0)
            {
                int candidate = upper.Min;
                long diff = Math.Abs((long)candidate - preferredId);
                if (diff < bestDiff || (diff == bestDiff && candidate < best))
                {
                    best = candidate;
                }
            }

            result[qi] = best;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O((n + q) log n)` for sorting and the sorted-set operations.
- **Space:** `O(n + q)`.
