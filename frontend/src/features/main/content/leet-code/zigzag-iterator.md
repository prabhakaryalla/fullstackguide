# 281. Zigzag Iterator

**Difficulty:** Medium
**Category:** Array, Design, Queue, Iterator

## Problem

Given two 1D vectors `v1` and `v2`, implement an iterator that returns their elements alternately, switching to the other vector once one is exhausted.

### Example

```
ZigzagIterator(v1 = [1,2], v2 = [3,4,5,6])
Next() -> 1, 3, 2, 4, 5, 6
```

## Approach

Maintain a queue of the two vectors' iterators (or index cursors). On each `Next()` call, dequeue the front iterator, take its current value, and if it still has more elements, re-enqueue it at the back — this naturally alternates between sources and gracefully skips any source that has been exhausted.

## C# Solution

```csharp
public class ZigzagIterator
{
    private readonly Queue<Queue<int>> queues = new();

    public ZigzagIterator(IList<int> v1, IList<int> v2)
    {
        if (v1.Count > 0) queues.Enqueue(new Queue<int>(v1));
        if (v2.Count > 0) queues.Enqueue(new Queue<int>(v2));
    }

    public int Next()
    {
        var current = queues.Dequeue();
        int value = current.Dequeue();

        if (current.Count > 0) queues.Enqueue(current);

        return value;
    }

    public bool HasNext()
    {
        return queues.Count > 0;
    }
}
```

## Complexity

- **Time:** `O(1)` per `Next()`/`HasNext()` call.
- **Space:** `O(n + m)` — for the two internal queues, where `n` and `m` are the vector lengths.
