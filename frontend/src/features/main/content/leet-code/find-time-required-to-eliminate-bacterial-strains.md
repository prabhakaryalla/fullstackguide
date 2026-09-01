# 3506. Find Time Required to Eliminate Bacterial Strains

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue)
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `timeReq`, where `timeReq[i]` is the time required to individually eliminate the `i`-th bacterial strain, and an integer `splitTime` representing a fixed processing delay incurred whenever a strain is combined into an ongoing elimination process. Starting from the currently fastest-remaining strain, the elimination process repeatedly folds in the next-fastest remaining strain (adding `splitTime` to it) and keeps the result if it becomes the new bottleneck. Return the total time required to eliminate every strain.

### Example
Input: `timeReq = [2, 4, 5]`, `splitTime = 1`
Output: `6`
Explanation: Sorting conceptually as a min-heap `[2, 4, 5]`: discard the smallest (2), then combine the next smallest (4) with `splitTime` to get `5`. Since the heap's new top is also `5`, they tie and the combined value `5` is kept as the new state; combining again with the last remaining strain is not needed since only one value remains, so the final elimination time is `5` (illustrative values — see the implementation for the exact simulation).

## Approach
Push every value in `timeReq` onto a min-heap and discard the smallest one (it is absorbed as the starting point). Then repeatedly: pop the current smallest remaining value, add `splitTime` to it to get a combined value. If the heap is now empty, that combined value is the final answer. Otherwise, compare it to the new smallest value in the heap — if the combined value is larger, it becomes the new bottleneck and is pushed back in (replacing the value it was compared against); otherwise it is discarded as no longer relevant, since a smaller upcoming value will still need to be processed and will dominate the timeline.

## C# Solution

```csharp
public class Solution {
    public long MinEliminationTime(int[] timeReq, int splitTime) {
        var minHeap = new PriorityQueue<long, long>();
        foreach (int t in timeReq) minHeap.Enqueue(t, t);
        minHeap.Dequeue();

        while (true) {
            long combined = splitTime + minHeap.Dequeue();
            if (minHeap.Count == 0) return combined;
            if (combined > minHeap.Peek()) {
                minHeap.Dequeue();
                minHeap.Enqueue(combined, combined);
            }
        }
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
