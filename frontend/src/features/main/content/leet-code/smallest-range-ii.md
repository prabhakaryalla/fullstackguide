# 910. Smallest Range II

**Difficulty:** Medium
**Category:** Array, Math, Sorting

## Problem

Given an integer array `nums` and an integer `k`, for each element choose to add either `k` or `-k` (each exactly once), and return the smallest possible difference between the maximum and minimum values of the resulting array.

### Example

```
Input: nums = [1,3,6], k = 3
Output: 3
```

## Approach

Sort the array. There is an optimal split point `i` such that all elements up to `i` get `+k` and the rest get `-k` (since raising the small values and lowering the large ones tends to shrink the range). For every adjacent split, the new maximum is `max(nums[n-1]-k, nums[i]+k)` and the new minimum is `min(nums[0]+k, nums[i+1]-k)`; track the smallest resulting gap.

## C# Solution

```csharp
public class Solution
{
    public int SmallestRangeII(int[] nums, int k)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int result = nums[n - 1] - nums[0];

        for (int i = 0; i < n - 1; i++)
        {
            int high = Math.Max(nums[n - 1] - k, nums[i] + k);
            int low = Math.Min(nums[0] + k, nums[i + 1] - k);
            result = Math.Min(result, high - low);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
