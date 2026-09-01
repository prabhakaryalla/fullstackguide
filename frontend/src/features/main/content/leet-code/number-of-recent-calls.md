# 933. Number of Recent Calls

**Difficulty:** Easy
**Category:** Design, Queue, Data Stream

## Problem

Implement `RecentCounter`, which counts the number of requests made within the last 3000 milliseconds. Each call to `Ping(t)` adds a new request at time `t` (calls are made in non-decreasing order of `t`) and returns how many requests fall in the range `[t - 3000, t]`.

### Example

```
Ping(1)    -> 1
Ping(100)  -> 2
Ping(3001) -> 3
Ping(3002) -> 3
```

## Approach

Maintain a queue of request timestamps. Each `Ping` enqueues the new timestamp, then dequeues from the front while those timestamps fall before `t - 3000`. The remaining queue size is the answer.

## C# Solution

```csharp
public class RecentCounter
{
    private readonly Queue<int> requests = new();

    public int Ping(int t)
    {
        requests.Enqueue(t);
        while (requests.Peek() < t - 3000) requests.Dequeue();
        return requests.Count;
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per call.
- **Space:** `O(n)` for the queue.
