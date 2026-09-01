# 2089. Find Target Indices After Sorting Array

**Difficulty:** Easy
**Category:** Array, Sorting, Binary Search

## Problem

Given a 0-indexed integer array `nums` and a `target`, sort `nums` in non-decreasing order, then return all indices `i` (in the sorted array) such that `nums[i] == target`, in increasing order. Return an empty array if `target` doesn't occur.

## Approach

Sort the array first. Since equal elements end up contiguous after sorting, scan the sorted array once and collect every index whose value equals `target`.

## C# Solution

```csharp
public class Solution
{
    public IList<int> TargetIndices(int[] nums, int target)
    {
        Array.Sort(nums);

        var result = new List<int>();
        for (int i = 0; i < nums.Length; i++)
            if (nums[i] == target)
                result.Add(i);

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(n)` for the result list (ignoring the sort's own workspace).
