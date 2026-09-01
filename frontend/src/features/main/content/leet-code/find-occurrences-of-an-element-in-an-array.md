# 3159. Find Occurrences of an Element in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem
You are given an array `nums`, an integer `x`, and an array of queries. For the `i`-th query, you must find the index (in the original array) of the `queries[i]`-th occurrence of `x` in `nums` (1-indexed occurrence count). If `x` does not occur that many times, the answer for that query is -1.

## Approach
First, do a single pass over `nums` to collect the indices where `x` occurs, in order, into a list. Then, for each query value `q`, if `q` is within the bounds of the collected indices list, return the `(q-1)`-th entry (0-indexed); otherwise return -1.

## C# Solution
```csharp
public class Solution {
    public int[] OccurrencesOfElement(int[] nums, int[] queries, int x) {
        List<int> indices = new List<int>();
        for (int i = 0; i < nums.Length; i++)
            if (nums[i] == x)
                indices.Add(i);

        int[] ans = new int[queries.Length];
        for (int i = 0; i < queries.Length; i++) {
            int q = queries[i];
            ans[i] = q <= indices.Count ? indices[q - 1] : -1;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n + q)
- Space: O(n) for storing indices
