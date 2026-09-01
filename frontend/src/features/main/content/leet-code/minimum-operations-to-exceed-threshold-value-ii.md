# 3066. Minimum Operations to Exceed Threshold Value II

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue), Simulation

## Problem

Given a 0-indexed integer array `nums` and an integer `k`, an operation removes the two smallest elements `x` and `y` (`x <= y`) and inserts a new element equal to `2 * x + y`. Return the minimum number of operations required until every element in `nums` is greater than or equal to `k`.

### Example

```
Input: nums = [2,11,10,1,3], k = 10
Output: 2
Explanation: Combine 1 and 2 -> 4, giving [4,11,10,3]; combine 3 and 4 -> 10, giving [11,10,10] (all >= 10).
```

## Approach

Repeatedly combining the two smallest elements is naturally suited to a min-heap: while there is more than one element and the smallest is below `k`, pop the two smallest values `x <= y`, push `2*x + y`, and count the operation.

## C# Solution

```csharp
public class Solution {
    public int MinOperations(int[] nums, int k) {
        var minHeap = new PriorityQueue<long, long>();
        foreach (int num in nums)
            minHeap.Enqueue(num, num);

        int ans = 0;
        while (minHeap.Count > 1 && minHeap.Peek() < k) {
            long x = minHeap.Dequeue();
            long y = minHeap.Dequeue();
            long combined = Math.Min(x, y) * 2 + Math.Max(x, y);
            minHeap.Enqueue(combined, combined);
            ans++;
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n log n) — each of the n elements is pushed/popped a constant number of times.
- Space: O(n) — the heap.
