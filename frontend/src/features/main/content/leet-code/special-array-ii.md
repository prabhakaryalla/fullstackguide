# 3152. Special Array II

**Difficulty:** Medium
**Category:** Array, Binary Search, Prefix Sum

## Problem

This is the query version of [Special Array I](special-array-i.md): an array is "special" if every pair of adjacent elements has different parity. Given an integer array `nums` and a list of range `queries` (`[from, to]`), return for each query whether the subarray `nums[from..to]` is special.

## Approach

Precompute a `parityIds` array in one pass: start `id = 0`, and every time two adjacent elements share the same parity (a "break point"), increment `id` — this partitions the array into maximal special runs, each sharing the same `parityIds` value. A subarray `nums[from..to]` is special exactly when no break point falls strictly inside it, which is equivalent to `parityIds[from] == parityIds[to]` (both endpoints belong to the same unbroken run). Answer each query with a single array lookup.

## C# Solution

```csharp
public class Solution {
    public bool[] IsArraySpecial(int[] nums, int[][] queries) {
        int id = 0;
        int[] parityIds = new int[nums.Length];
        parityIds[0] = id;

        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] % 2 == nums[i - 1] % 2)
                id++;
            parityIds[i] = id;
        }

        bool[] ans = new bool[queries.Length];
        for (int i = 0; i < queries.Length; i++) {
            int from = queries[i][0], to = queries[i][1];
            ans[i] = parityIds[from] == parityIds[to];
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n + q) — one pass to build `parityIds`, O(1) per query.
- Space: O(n) — the `parityIds` array.
