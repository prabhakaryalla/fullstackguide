# 1167. Minimum Cost to Connect Sticks

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue)

## Problem

Given the lengths of several sticks, you can connect any two sticks into one at a cost equal to their combined length. Return the minimum total cost to connect all the sticks into a single stick.

### Example

```
Input: sticks = [2,4,3]
Output: 14
```

## Approach

Greedily always combine the two currently shortest sticks, since combining longer sticks earlier would repeatedly add their large lengths into later merges. A min-heap efficiently provides the two smallest sticks at each step; push the newly combined stick back in and repeat until only one remains.

## C# Solution

```csharp
public class Solution
{
    public int ConnectSticks(int[] sticks)
    {
        var pq = new PriorityQueue<int, int>();
        foreach (int s in sticks) pq.Enqueue(s, s);

        int totalCost = 0;

        while (pq.Count > 1)
        {
            int first = pq.Dequeue();
            int second = pq.Dequeue();
            int combined = first + second;
            totalCost += combined;
            pq.Enqueue(combined, combined);
        }

        return totalCost;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the heap.
