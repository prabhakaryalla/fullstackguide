# 1429. First Unique Number

**Difficulty:** Medium
**Category:** Array, Hash Table, Linked List, Design, Queue

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a `FirstUnique` class initialized with an array of numbers, supporting:

- `ShowFirstUnique()` — returns the value of the first unique number still tracked, or `-1` if none exists.
- `Add(value)` — adds `value` to the stream.

### Example

```
Input: ["FirstUnique", "showFirstUnique", "add", "showFirstUnique", "add", "showFirstUnique", "add", "showFirstUnique"]
[[[2,3,5]], [], [5], [], [2], [], [3], []]
Output: [null, 2, null, 2, null, 3, null, -1]
```

## Approach

Maintain a queue of values in insertion order along with a hash map of occurrence counts. Adding a value increments its count and enqueues it only the first time it's seen. `ShowFirstUnique` lazily discards values from the front of the queue whose count has risen above one (they're no longer unique), then reports the new front, or `-1` if the queue is empty.

## C# Solution

```csharp
public class FirstUnique
{
    private readonly Queue<int> queue = new();
    private readonly Dictionary<int, int> counts = new();

    public FirstUnique(int[] nums)
    {
        foreach (var n in nums) Add(n);
    }

    public int ShowFirstUnique()
    {
        while (queue.Count > 0 && counts[queue.Peek()] > 1)
            queue.Dequeue();

        return queue.Count > 0 ? queue.Peek() : -1;
    }

    public void Add(int value)
    {
        counts[value] = counts.GetValueOrDefault(value) + 1;
        if (counts[value] == 1) queue.Enqueue(value);
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per `Add`; `O(1)` amortized per `ShowFirstUnique` since each value is dequeued at most once.
- **Space:** `O(n)` for the queue and count map.
