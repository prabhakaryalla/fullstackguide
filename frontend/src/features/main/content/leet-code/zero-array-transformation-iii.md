# 3362. Zero Array Transformation III

**Difficulty:** Medium
**Category:** Array, Greedy, Heap (Priority Queue)

## Problem

Given `nums` and `queries` where each query `[l, r]` can decrement every element in `nums[l..r]` by at most 1, find the maximum number of queries that can be removed while it is still possible to select the remaining queries (applying each at most once) to make `nums` all zero. Return `-1` if it's not possible even using all queries.

### Example

Input: `nums = [2,0,2]`, `queries = [[0,2],[0,2],[1,1]]`
Output: `1` — one query can be removed while still zeroing the array.

## Approach

Sort queries by left endpoint. Sweep index `i` from 0 to n-1, maintaining an available max-heap (by right endpoint) of queries whose range has started, and a selected min-heap tracking chosen queries' right endpoints so expired ones (r < i) can be dropped from the active count. Whenever the active coverage at `i` is less than `nums[i]`, greedily select the available query with the largest right endpoint (covers the most future indices) until coverage is sufficient or no query remains (return -1). The answer is total queries minus the number actually selected.

## C# Solution

```csharp
public class Solution 
{
    public int MaxRemoval(int[] nums, int[][] queries) 
    {
        int n = nums.Length;
        Array.Sort(queries, (a, b) => a[0] - b[0]);
        var available = new PriorityQueue<int, int>(); // max-heap by r
        var selected = new PriorityQueue<int, int>();  // min-heap by r
        int qi = 0;
        int activeCount = 0;
        int used = 0;

        for (int i = 0; i < n; i++) 
        {
            while (qi < queries.Length && queries[qi][0] <= i) 
            {
                available.Enqueue(queries[qi][1], -queries[qi][1]);
                qi++;
            }
            while (selected.Count > 0 && selected.Peek() < i) 
            {
                selected.Dequeue();
                activeCount--;
            }
            while (available.Count > 0 && available.Peek() < i)
                available.Dequeue();

            while (activeCount < nums[i]) 
            {
                if (available.Count == 0) return -1;
                int r = available.Dequeue();
                selected.Enqueue(r, r);
                activeCount++;
                used++;
            }
        }
        return queries.Length - used;
    }
}
```

## Complexity

- **Time:** O((n + q) log q)
- **Space:** O(q)
