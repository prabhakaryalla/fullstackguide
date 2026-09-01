# 1199. Minimum Time to Build Blocks

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Greedy, Heap (Priority Queue)

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given `blocks[i]`, the time needed to build block `i`, and a `split` cost, you start with one worker. A worker can either build a block (taking `blocks[i]` time) or split into two workers (taking `split` time, after which both new workers can work in parallel). Return the minimum time needed to build all blocks.

### Example

```
Input: blocks = [1,2], split = 5
Output: 7
```

## Approach

Work backwards, greedily pairing up the two smallest remaining block times at each step (a min-heap makes this efficient). Combining the two smallest times `a <= b` into `b + split` represents one worker splitting into two, where one sub-worker (taking the longer time `b`) determines this pair's total duration while the other builds the shorter block `a` in parallel. Repeating this until one time value remains gives the minimum total build time — this is structurally the same greedy idea as building an optimal Huffman-style merge tree.

## C# Solution

```csharp
public class Solution
{
    public int MinBuildTime(int[] blocks, int split)
    {
        var pq = new PriorityQueue<int, int>();
        foreach (int b in blocks) pq.Enqueue(b, b);

        while (pq.Count > 1)
        {
            int first = pq.Dequeue();
            int second = pq.Dequeue();
            int combined = second + split;
            pq.Enqueue(combined, combined);
        }

        return pq.Dequeue();
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the heap.
