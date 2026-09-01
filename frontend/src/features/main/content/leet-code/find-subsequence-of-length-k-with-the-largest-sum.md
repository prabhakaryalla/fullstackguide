# 2099. Find Subsequence of Length K With the Largest Sum

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting, Heap (Priority Queue)

## Problem

Given an integer array `nums` and an integer `k`, return *a subsequence of `nums` of length `k` that has the largest sum*, preserving the original relative order of the chosen elements. If multiple subsequences achieve the same sum, any one of them may be returned.

## Approach

Pair every value with its original index. Sort these pairs by value in descending order and take the first `k` (these are the `k` largest values, ties broken arbitrarily). Then sort just this selected subset back by original index to restore the required relative ordering, and extract the values.

## C# Solution

```csharp
public class Solution
{
    public int[] MaxSubsequence(int[] nums, int k)
    {
        var indexed = new (int value, int index)[nums.Length];
        for (int i = 0; i < nums.Length; i++)
            indexed[i] = (nums[i], i);

        Array.Sort(indexed, (a, b) => b.value.CompareTo(a.value));

        var top = indexed.Take(k).OrderBy(p => p.index).ToArray();

        var result = new int[k];
        for (int i = 0; i < k; i++)
            result[i] = top[i].value;

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the indexed pairs.
