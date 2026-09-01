# 295. Find Median from Data Stream

**Difficulty:** Hard
**Category:** Two Pointers, Design, Sorting, Heap (Priority Queue), Data Stream

## Problem

Design a data structure that supports adding integers from a data stream and finding the median of all elements added so far, at any point.

### Example

```
AddNum(1); AddNum(2); FindMedian() -> 1.5
AddNum(3); FindMedian() -> 2
```

## Approach

Maintain two heaps: a max-heap holding the smaller half of the numbers, and a min-heap holding the larger half, kept balanced so their sizes differ by at most one. When adding a number, push it into the appropriate heap based on comparison with the max-heap's top, then rebalance if one heap grows more than one element larger than the other. The median is either the max-heap's top (if it holds one more element) or the average of both heaps' tops (if sizes are equal).

## C# Solution

```csharp
public class MedianFinder
{
    private readonly PriorityQueue<int, int> smallerHalf = new(Comparer<int>.Create((a, b) => b.CompareTo(a))); // max-heap
    private readonly PriorityQueue<int, int> largerHalf = new(); // min-heap

    public void AddNum(int num)
    {
        if (smallerHalf.Count == 0 || num <= smallerHalf.Peek())
            smallerHalf.Enqueue(num, num);
        else
            largerHalf.Enqueue(num, num);

        if (smallerHalf.Count > largerHalf.Count + 1)
        {
            var moved = smallerHalf.Dequeue();
            largerHalf.Enqueue(moved, moved);
        }
        else if (largerHalf.Count > smallerHalf.Count)
        {
            var moved = largerHalf.Dequeue();
            smallerHalf.Enqueue(moved, moved);
        }
    }

    public double FindMedian()
    {
        if (smallerHalf.Count > largerHalf.Count) return smallerHalf.Peek();
        return (smallerHalf.Peek() + largerHalf.Peek()) / 2.0;
    }
}
```

## Complexity

- **Time:** `O(log n)` per `AddNum` call; `O(1)` per `FindMedian` call.
- **Space:** `O(n)` — for the two heaps holding all inserted numbers.
