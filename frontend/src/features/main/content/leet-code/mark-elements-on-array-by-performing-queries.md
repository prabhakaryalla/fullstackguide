# 3080. Mark Elements on Array by Performing Queries

**Difficulty:** Medium
**Category:** Array, Hash Table, Heap (Priority Queue), Simulation, Sorting

## Problem

You are given a 0-indexed integer array `nums` and a 2D array `queries`, where `queries[i] = [indexi, ki]`. Process the queries in order: for query `i`, mark index `indexi` (if not already marked), then mark up to `ki` additional **unmarked** elements with the smallest values (ties broken by smallest index) — if fewer than `ki` remain unmarked, mark all of them. After each query, record the sum of all still-unmarked elements. Return an array of these running sums.

## Approach

Maintain a running total that starts as the full array sum, and a min-heap of `(value, index)` pairs to always be able to find the next-smallest unmarked element. For each query: if the target index isn't marked yet, mark it and subtract its value from the running total. Then pop from the heap up to `ki` times, skipping any entries that turn out to already be marked (stale heap entries), marking and subtracting each newly-marked value. Record the running total after processing the query.

## C# Solution

```csharp
public class Solution {
    public long[] UnmarkedSumArray(int[] nums, int[][] queries) {
        int n = nums.Length;
        long[] ans = new long[queries.Length];
        bool[] marked = new bool[n];
        long sum = 0;
        foreach (int num in nums)
            sum += num;

        var minHeap = new PriorityQueue<(int num, int idx), int>();
        for (int i = 0; i < n; i++)
            minHeap.Enqueue((nums[i], i), nums[i]);

        for (int q = 0; q < queries.Length; q++) {
            int index = queries[q][0];
            int k = queries[q][1];

            if (!marked[index]) {
                marked[index] = true;
                sum -= nums[index];
            }

            int popped = 0;
            while (popped < k && minHeap.Count > 0) {
                var (num, i) = minHeap.Dequeue();
                if (!marked[i]) {
                    marked[i] = true;
                    sum -= num;
                    popped++;
                }
            }

            ans[q] = sum;
        }

        return ans;
    }
}
```

## Complexity

- Time: O((n + m) log n) — each of the n elements and the query pops does O(log n) heap work.
- Space: O(n) — the heap and marked array.
