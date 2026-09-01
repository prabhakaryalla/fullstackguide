# 2529. Maximum Count of Positive Integer and Negative Integer

**Difficulty:** Easy
**Category:** Array, Binary Search, Counting

## Problem

Given an array `nums` sorted in non-decreasing order, return the maximum between the number of positive integers and the number of negative integers.

### Example

```
Input: nums = [-2,-1,-1,1,2,3]
Output: 3
Explanation: There are 3 positive integers and 3 negative integers. The maximum is 3.
```

## Approach

Use binary search to find the count of negative numbers (all elements < 0) and positive numbers (all elements > 0). The array is sorted, so we can find the boundaries efficiently. Return the maximum of the two counts.

## C# Solution

```csharp
public class Solution
{
    public int MaximumCount(int[] nums)
    {
        int negCount = CountNegative(nums);
        int posCount = CountPositive(nums);
        
        return Math.Max(negCount, posCount);
    }
    
    private int CountNegative(int[] nums)
    {
        int left = 0, right = nums.Length;
        
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (nums[mid] < 0)
            {
                left = mid + 1;
            }
            else
            {
                right = mid;
            }
        }
        
        return left;
    }
    
    private int CountPositive(int[] nums)
    {
        int left = 0, right = nums.Length;
        
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (nums[mid] > 0)
            {
                right = mid;
            }
            else
            {
                left = mid + 1;
            }
        }
        
        return nums.Length - left;
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
