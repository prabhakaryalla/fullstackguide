# 760. Find Anagram Mappings

**Difficulty:** Easy
**Category:** Array, Hash Table
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two arrays `nums1` and `nums2` where `nums2` is an anagram of `nums1`, return an array `mapping` such that `nums2[mapping[i]] == nums1[i]` for every index `i`.

### Example

```
Input: nums1 = [12,28,46,32,50], nums2 = [50,12,32,46,28]
Output: [1,4,3,2,0]
```

## Approach

Build a hash map from each value in `nums2` to its index. Then for every element in `nums1`, look up its index in `nums2` via the map to construct the mapping array.

## C# Solution

```csharp
public class Solution
{
    public int[] AnagramMappings(int[] nums1, int[] nums2)
    {
        var indexOf = new Dictionary<int, int>();
        for (int i = 0; i < nums2.Length; i++)
            indexOf[nums2[i]] = i;

        var result = new int[nums1.Length];
        for (int i = 0; i < nums1.Length; i++)
            result[i] = indexOf[nums1[i]];

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the index map.
