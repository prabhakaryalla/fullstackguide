# 1874. Minimize Product Sum of Two Arrays

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two arrays `nums1` and `nums2` of the same length, you may rearrange each array in any order. Return the minimum possible value of `sum(nums1[i] * nums2[i])` over all rearrangements.

### Example

```
Input: nums1 = [5,3,4,2], nums2 = [4,2,2,5]
Output: 40
```

## Approach

By the rearrangement inequality, the sum of products is minimized when one array is sorted ascending and the other descending (pairing the largest with the smallest). Sort `nums1` ascending and `nums2` descending, then sum the element-wise products.

## C# Solution

```csharp
public class Solution
{
    public int MinProductSum(int[] nums1, int[] nums2)
    {
        Array.Sort(nums1);
        Array.Sort(nums2);
        Array.Reverse(nums2);

        long sum = 0;
        for (int i = 0; i < nums1.Length; i++)
        {
            sum += (long)nums1[i] * nums2[i];
        }

        return (int)sum;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sorts.
- **Space:** `O(1)` extra.
