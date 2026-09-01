# 1705. Maximum Number of Eaten Apples

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue), Greedy

## Problem

There is a special apple tree that grows `apples[i]` apples on the `ith` day, which rot and can no longer be eaten after `days[i]` more days. You can eat at most one apple per day (if any unspoiled apple is available). Return the maximum number of apples you can eat, considering days after the given arrays end where no more apples grow.

### Example

```
Input: apples = [1,2,3,5,2], days = [3,2,1,4,2]
Output: 7
```

## Approach

Use a min-heap keyed by expiration day, storing `(expiry, count)` pairs. Each day, push today's harvest (if any), discard batches that have already expired, then greedily eat from the batch with the earliest expiry (it is the most urgent). Continue while there is still unspoiled fruit or new apples can grow.

## C# Solution

```csharp
public class Solution
{
    public int EatenApples(int[] apples, int[] days)
    {
        var pq = new PriorityQueue<(long expiry, int count), long>();
        int n = apples.Length;
        int eaten = 0;
        int day = 0;

        while (day < n || pq.Count > 0)
        {
            if (day < n && apples[day] > 0)
                pq.Enqueue((day + days[day], apples[day]), day + days[day]);

            while (pq.Count > 0 && pq.Peek().expiry <= day)
                pq.Dequeue();

            if (pq.Count > 0)
            {
                var (expiry, count) = pq.Dequeue();
                eaten++;
                if (count - 1 > 0) pq.Enqueue((expiry, count - 1), expiry);
            }

            day++;
        }

        return eaten;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the heap.
