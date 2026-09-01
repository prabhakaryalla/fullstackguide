# 1756. Design Most Recently Used Queue

**Difficulty:** Medium
**Category:** Array, Design, Ordered Set

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a queue-like data structure initialized with values `1` to `n`. Implement `Fetch(k)`, which removes the `kth` element (1-indexed) from the queue, moves it to the end, and returns its value.

### Example

```
Input: ["MRUQueue","fetch","fetch","fetch","fetch"]
       [[8],[3],[5],[2],[8]]
Output: [null,3,6,2,2]
```

## Approach

Maintain the queue as a simple list. `Fetch(k)` removes the element at index `k - 1` and appends it to the end of the list, returning its value.

## C# Solution

```csharp
public class MRUQueue
{
    private readonly List<int> queue;

    public MRUQueue(int n)
    {
        queue = new List<int>();
        for (int i = 1; i <= n; i++) queue.Add(i);
    }

    public int Fetch(int k)
    {
        int value = queue[k - 1];
        queue.RemoveAt(k - 1);
        queue.Add(value);
        return value;
    }
}
```

## Complexity

- **Time:** `O(n)` per `Fetch` call due to shifting elements after removal.
- **Space:** `O(n)`.
