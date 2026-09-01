# 2962. Count Subarrays Where Max Element Appears at Least K Times

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem

You are given an integer array `nums` and a positive integer `k`. Return the number of subarrays where the maximum element appears at least `k` times.

### Example

```
Input: nums = [1, 3, 2, 3, 3], k = 2
Output: 6
Explanation: Subarrays with max element appearing >= 2 times:
[3,2,3], [3,2,3,3], [2,3,3], [3,2,3], [3,3], plus more variations
```

## Approach

First, find the maximum element in the array. Use a sliding window to track how many times the maximum appears in the current window. For each right pointer position, find the smallest left pointer where the count is at least `k`. All subarrays starting from 0 to this left pointer and ending at the current right are valid.

## C# Solution

```csharp
public class Solution
{
    public long CountSubarrays(int[] nums, int k)
    {
        int maxVal = nums.Max();
        int n = nums.Length;
        long count = 0;
        int left = 0;
        int maxCount = 0;

        for (int right = 0; right < n; right++)
        {
            if (nums[right] == maxVal)
            {
                maxCount++;
            }

            while (maxCount >= k)
            {
                count += n - right;

                if (nums[left] == maxVal)
                {
                    maxCount--;
                }
                left++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
