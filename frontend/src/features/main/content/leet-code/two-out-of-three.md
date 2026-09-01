# 2032. Two Out of Three

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given three integer arrays `nums1`, `nums2`, and `nums3`, return a distinct array containing all values that are present in **at least two** of the three arrays. The result may be returned in any order.

## Approach

For each array, first deduplicate its own values (so a value appearing multiple times within the same array only counts once toward "which arrays contain it"). Then use a shared frequency map: for every distinct value in each of the three arrays, increment its count by one. Any value whose final count is `2` or `3` is present in at least two arrays and belongs in the result.

## C# Solution

```csharp
public class Solution
{
    public IList<int> TwoOutOfThree(int[] nums1, int[] nums2, int[] nums3)
    {
        var count = new Dictionary<int, int>();

        foreach (var num in nums1.Distinct()) count[num] = count.GetValueOrDefault(num) + 1;
        foreach (var num in nums2.Distinct()) count[num] = count.GetValueOrDefault(num) + 1;
        foreach (var num in nums3.Distinct()) count[num] = count.GetValueOrDefault(num) + 1;

        return count.Where(kv => kv.Value >= 2).Select(kv => kv.Key).ToList();
    }
}
```

## Complexity

- **Time:** `O(n1 + n2 + n3)`.
- **Space:** `O(n1 + n2 + n3)` for the frequency map.
