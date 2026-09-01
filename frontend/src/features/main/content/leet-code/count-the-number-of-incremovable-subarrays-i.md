# 2970. Count the Number of Incremovable Subarrays I

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 0-indexed array `nums`. A subarray is called **incremovable** if removing that subarray from `nums` (and concatenating the remaining prefix and suffix) leaves the resulting array **strictly increasing** (an empty resulting array counts as strictly increasing). Return the number of incremovable subarrays of `nums`.

### Example

`nums = [1,2,3,4]` → answer `10` (every contiguous subarray is incremovable, since the array is already strictly increasing).

## Approach

Since `nums.Length` is small, check every possible subarray `[start, end]` directly: simulate removing it and verify the remaining elements form a strictly increasing sequence.

## C# Solution

```csharp
public class Solution 
{
    public int IncremovableSubarrayCount(int[] nums) 
    {
        int n = nums.Length;
        int count = 0;
        for (int start = 0; start < n; start++)
        {
            for (int end = start; end < n; end++)
            {
                if (IsStrictlyIncreasingAfterRemoval(nums, start, end))
                {
                    count++;
                }
            }
        }
        return count;
    }

    private bool IsStrictlyIncreasingAfterRemoval(int[] nums, int start, int end)
    {
        int prev = int.MinValue;
        for (int i = 0; i < nums.Length; i++)
        {
            if (i >= start && i <= end)
            {
                continue;
            }
            if (nums[i] <= prev)
            {
                return false;
            }
            prev = nums[i];
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n^3)
- **Space:** O(1)
