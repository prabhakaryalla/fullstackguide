# 2733. Neither Minimum nor Maximum

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an integer array `nums` containing distinct positive integers, find and return any number from the array that is neither the minimum nor the maximum value in the array, or return -1 if there is no such number.

### Example

```
Input: nums = [3,2,1,4]
Output: 2
Explanation: 2 is neither the minimum (1) nor maximum (4).

Input: nums = [1,2]
Output: -1
Explanation: Only 2 elements exist, so no element is neither min nor max.

Input: nums = [2,1,3]
Output: 2
Explanation: 2 is neither minimum (1) nor maximum (3).
```

## Approach

If the array has fewer than 3 elements, return -1. Otherwise, find any element that is neither the minimum nor the maximum. A simple approach is to sort and return the middle element, or find min and max and return any other element.

## C# Solution

```csharp
public class Solution 
{
    public int FindNonMinOrMax(int[] nums) 
    {
        if (nums.Length < 3)
        {
            return -1;
        }
        
        int min = Math.Min(Math.Min(nums[0], nums[1]), nums[2]);
        int max = Math.Max(Math.Max(nums[0], nums[1]), nums[2]);
        
        for (int i = 0; i < 3; i++)
        {
            if (nums[i] != min && nums[i] != max)
            {
                return nums[i];
            }
        }
        
        return nums[0];
    }
}
```

## Complexity

- **Time:** O(1) as we only check first 3 elements
- **Space:** O(1)
