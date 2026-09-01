# 2407. Smallest Number in Infinite Set

**Difficulty:** Medium
**Category:** Hash Table, Design, Heap (Priority Queue)

## Problem

You have a set which contains all positive integers `[1, 2, 3, 4, 5, ...]`.

Implement the `SmallestInfiniteSet` class:

- `SmallestInfiniteSet()` Initializes the SmallestInfiniteSet object to contain all positive integers.
- `int popSmallest()` Removes and returns the smallest integer contained in the infinite set.
- `void addBack(int num)` Adds a positive integer `num` back into the infinite set, if it is not already in the infinite set.

### Example

```
Input: ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
[[], [2], [], [], [], [1], [], [], []]
Output: [null, null, 1, 2, 3, null, 1, 4, 5]
```

## Approach

Maintain a minimum heap of added-back numbers and track the current smallest number not yet popped from the infinite sequence. When popping, prioritize the heap; when the heap is empty, return the current counter and increment it.

## C# Solution

```csharp
public class SmallestInfiniteSet
{
    private PriorityQueue<int, int> minHeap;
    private HashSet<int> added;
    private int current;

    public SmallestInfiniteSet()
    {
        minHeap = new PriorityQueue<int, int>();
        added = new HashSet<int>();
        current = 1;
    }
    
    public int PopSmallest()
    {
        if (minHeap.Count > 0)
        {
            int smallest = minHeap.Dequeue();
            added.Remove(smallest);
            return smallest;
        }
        
        return current++;
    }
    
    public void AddBack(int num)
    {
        if (num < current && !added.Contains(num))
        {
            minHeap.Enqueue(num, num);
            added.Add(num);
        }
    }
}
```

## Complexity

- **Time:** O(log n) per operation where n is the number of added-back elements
- **Space:** O(n) for the heap and set
