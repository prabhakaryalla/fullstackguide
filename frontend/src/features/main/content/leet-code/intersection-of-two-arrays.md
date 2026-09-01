# 349. Intersection of Two Arrays

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers, Binary Search, Sorting

## Problem

Given two integer arrays `nums1` and `nums2`, return an array of their intersection, where each element in the result must be unique.

### Example

```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
```

### Constraints

- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 1000`

## Approach

Put all elements of `nums1` into a hash set for `O(1)` lookups, then scan `nums2` and add any element found in that set to a second set (which naturally deduplicates the result).

## C# Solution

```csharp
public class Solution
{
    public int[] Intersection(int[] nums1, int[] nums2)
    {
        var set1 = new HashSet<int>(nums1);
        var result = new HashSet<int>();

        foreach (var num in nums2)
            if (set1.Contains(num))
                result.Add(num);

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n + m)` for the hash sets.
