# 1046. Last Stone Weight

**Difficulty:** Easy
**Category:** Array, Heap (Priority Queue)

## Problem

Given an array of stone weights, repeatedly take the two heaviest stones and smash them together: if they're equal, both are destroyed; otherwise, the lighter is destroyed and the heavier becomes the difference of the two. Return the weight of the last remaining stone, or `0` if none remain.

### Example

```
Input: stones = [2,7,4,1,8,1]
Output: 1
```

## Approach

A max-heap gives direct access to the two heaviest stones at each step. Repeatedly pop the two largest, and if they differ, push the difference back in. Continue until at most one stone remains.

## C# Solution

```csharp
public class Solution
{
    public int LastStoneWeight(int[] stones)
    {
        var maxHeap = new PriorityQueue<int, int>();
        foreach (var stone in stones) maxHeap.Enqueue(stone, -stone);

        while (maxHeap.Count > 1)
        {
            int first = maxHeap.Dequeue();
            int second = maxHeap.Dequeue();

            if (first != second)
            {
                maxHeap.Enqueue(first - second, -(first - second));
            }
        }

        return maxHeap.Count > 0 ? maxHeap.Dequeue() : 0;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — each smash is an `O(log n)` heap operation.
- **Space:** `O(n)` for the heap.
