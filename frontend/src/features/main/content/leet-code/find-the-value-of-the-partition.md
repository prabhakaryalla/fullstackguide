# 2740. Find the Value of the Partition

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

You are given a positive integer array `nums`. Partition `nums` into two arrays, `nums1` and `nums2`, such that:
- Each element of the array `nums` belongs to either the array `nums1` or the array `nums2`.
- Both arrays are non-empty.
- The value of the partition is minimized.

The value of the partition is `|max(nums1) - min(nums2)|`.

Return the integer denoting the value of such partition.

### Example

```
Input: nums = [1,3,2,4]
Output: 1
Explanation: Partition into [1,2] and [3,4]. Value = |2 - 3| = 1
```

## Approach

Sort the array. The optimal partition is to split adjacent elements. Try all possible splits and find the minimum absolute difference between consecutive elements.

## C# Solution

```csharp
public class Solution
{
    public int FindValueOfPartition(int[] nums)
    {
        Array.Sort(nums);
        int minDiff = int.MaxValue;
        
        for (int i = 1; i < nums.Length; i++)
        {
            minDiff = Math.Min(minDiff, nums[i] - nums[i - 1]);
        }
        
        return minDiff;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1)
