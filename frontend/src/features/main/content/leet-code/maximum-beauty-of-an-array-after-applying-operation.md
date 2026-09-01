# 2779. Maximum Beauty of an Array After Applying Operation

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window, Sorting

## Problem

You are given a 0-indexed array `nums` and a non-negative integer `k`. In one operation, you can:
- Choose an index `i` that hasn't been chosen before from the range `[0, nums.length - 1]`.
- Replace `nums[i]` with any integer from the range `[nums[i] - k, nums[i] + k]`.

The beauty of the array is the length of the longest subsequence consisting of equal elements.

Return the maximum possible beauty of the array after applying the operation any number of times.

### Example

```
Input: nums = [4,6,1,2], k = 2
Output: 3
Explanation: Change 4->6, 1->2, 2->2. Now we have [6,6,2,2]. Longest equal subsequence is [2,2,2] or [6,6,6]... actually [2,2,2] has length 3.
```

## Approach

Sort the array. Use a sliding window to find the maximum number of elements that can be made equal. Two elements at positions `i` and `j` can be made equal if `nums[j] - nums[i] <= 2k`.

## C# Solution

```csharp
public class Solution
{
    public int MaximumBeauty(int[] nums, int k)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int left = 0;
        int maxBeauty = 0;
        
        for (int right = 0; right < n; right++)
        {
            while (nums[right] - nums[left] > 2 * k)
            {
                left++;
            }
            
            maxBeauty = Math.Max(maxBeauty, right - left + 1);
        }
        
        return maxBeauty;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1)
