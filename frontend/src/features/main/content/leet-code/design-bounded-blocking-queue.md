# 1188. Design Bounded Blocking Queue

**Difficulty:** Medium
**Category:** Concurrency, Design

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Design a thread-safe `BoundedBlockingQueue` with a fixed `capacity` that supports `Enqueue(element)` (blocking while the queue is full), `Dequeue()` (blocking while the queue is empty, returning the oldest element), and `Size()`.

### Example

```
Input:
1 producer thread, 4 consumer threads. capacity = 4.
producer inserts 5 elements, consumers each dequeue one.
Output: consumers correctly receive elements in FIFO order, with no data races.
```

## Approach

Use two counting semaphores as capacity gates: `notFull` starts with `capacity` permits (one per open slot) and `notEmpty` starts empty (one permit added per enqueued element). `Enqueue` waits on `notFull` before adding to the underlying queue and then signals `notEmpty`; `Dequeue` waits on `notEmpty` before removing and then signals `notFull`. A plain lock guards the underlying queue itself for thread-safe mutation.

## C# Solution

```csharp
public class BoundedBlockingQueue
{
    private readonly Queue<int> queue = new();
    private readonly SemaphoreSlim notFull;
    private readonly SemaphoreSlim notEmpty;
    private readonly object lockObj = new();

    public BoundedBlockingQueue(int capacity)
    {
        notFull = new SemaphoreSlim(capacity, capacity);
        notEmpty = new SemaphoreSlim(0, capacity);
    }

    public void Enqueue(int element)
    {
        notFull.Wait();
        lock (lockObj)
        {
            queue.Enqueue(element);
        }
        notEmpty.Release();
    }

    public int Dequeue()
    {
        notEmpty.Wait();
        int value;
        lock (lockObj)
        {
            value = queue.Dequeue();
        }
        notFull.Release();
        return value;
    }

    public int Size()
    {
        lock (lockObj)
        {
            return queue.Count;
        }
    }
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(capacity)` for the underlying queue.
