# 1851. Minimum Interval to Include Each Query

**Difficulty:** Hard
**Category:** Array, Binary Search, Line Sweep, Heap (Priority Queue), Sorting

## Problem

Given `intervals[i] = [left, right]` and an array `queries`, for each query find the size of the smallest interval that contains it (`left <= query <= right`); return `-1` if no interval contains it.

### Example

```
Input: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
Output: [3,3,1,4]
```

## Approach

Sort the intervals by their left endpoint, and process queries in ascending order (tracking original indices to restore order at the end). Maintain a min-heap keyed by interval size, storing `(size, right)` pairs. As the query value sweeps forward, push every interval whose left endpoint has become `<=` the query. Before answering, pop any interval from the heap whose right endpoint is now `< query` (it can no longer contain any future or current query since queries are non-decreasing). The smallest size remaining at the top of the heap is the answer for that query.

## C# Solution

```csharp
public class Solution
{
    public int[] MinInterval(int[][] intervals, int[] queries)
    {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
        int q = queries.Length;
        var order = Enumerable.Range(0, q).OrderBy(i => queries[i]).ToArray();
        var result = new int[q];
        var heap = new PriorityQueue<(int size, int end), int>();
        int ptr = 0;

        foreach (int qi in order)
        {
            int query = queries[qi];

            while (ptr < intervals.Length && intervals[ptr][0] <= query)
            {
                int size = intervals[ptr][1] - intervals[ptr][0] + 1;
                heap.Enqueue((size, intervals[ptr][1]), size);
                ptr++;
            }

            while (heap.Count > 0 && heap.Peek().end < query)
            {
                heap.Dequeue();
            }

            result[qi] = heap.Count > 0 ? heap.Peek().size : -1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O((n + q) log n)` for sorting and heap operations.
- **Space:** `O(n + q)`.
