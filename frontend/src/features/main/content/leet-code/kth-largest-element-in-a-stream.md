# 703. Kth Largest Element in a Stream

**Difficulty:** Easy
**Category:** Tree, Design, Binary Search Tree, Heap, Binary Search

## Problem

Design a class to find the `k`th largest element in a stream, supporting a constructor that initializes with an array of numbers and `k`, and an `Add(val)` method that adds a new number to the stream and returns the current `k`th largest element.

### Example

```
Input:
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output:
[null, 4, 5, 5, 8, 8]
```

## Approach

Maintain a min-heap containing at most `k` elements — the `k` largest seen so far. Whenever a new value is added, push it onto the heap; if the heap grows beyond size `k`, pop the smallest element (since it's no longer among the top `k`). The heap's minimum is always the `k`th largest value.

## C# Solution

```csharp
public class KthLargest
{
    private readonly int k;
    private readonly PriorityQueue<int, int> minHeap = new();

    public KthLargest(int k, int[] nums)
    {
        this.k = k;
        foreach (var num in nums)
            Add(num);
    }

    public int Add(int val)
    {
        minHeap.Enqueue(val, val);
        if (minHeap.Count > k)
            minHeap.Dequeue();

        return minHeap.Peek();
    }
}
```

## Complexity

- **Time:** `O(log k)` per `Add` call.
- **Space:** `O(k)` for the heap.
