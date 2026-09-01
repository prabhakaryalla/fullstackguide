# 362. Design Hit Counter

**Difficulty:** Medium
**Category:** Array, Design, Binary Search, Queue, Data Stream
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a hit counter that counts the number of hits received in the past 5 minutes (300 seconds). Implement `Hit(timestamp)` to record a hit, and `GetHits(timestamp)` to return the number of hits in the past 300 seconds, given that timestamps arrive in non-decreasing order.

### Example

```
Input:
["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
[[], [1], [2], [3], [4], [300], [300], [301]]
Output:
[null, null, null, null, 3, null, 4, 3]
```

### Constraints

- `1 <= timestamp <= 2 * 10^9`
- All calls are made to `Hit` and `GetHits` with non-decreasing `timestamp` values.
- At most `300` calls will be made per second.

## Approach

Store hit timestamps in a queue in arrival order. Since hits and queries always come in non-decreasing timestamp order, whenever `GetHits` is called, simply pop off any timestamps at the front of the queue that are now older than 300 seconds — this discards stale hits exactly once each, amortizing the cost across all calls. The remaining queue length is the current hit count.

## C# Solution

```csharp
public class HitCounter
{
    private readonly Queue<int> hits = new();

    public void Hit(int timestamp)
    {
        hits.Enqueue(timestamp);
    }

    public int GetHits(int timestamp)
    {
        while (hits.Count > 0 && timestamp - hits.Peek() >= 300)
            hits.Dequeue();

        return hits.Count;
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per call.
- **Space:** `O(n)` for the stored hits within the window.
