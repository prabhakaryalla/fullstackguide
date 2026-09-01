# 2799. Count Complete Subarrays in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

You are given an array `nums` of positive integers. A subarray is called "complete" if the number of distinct elements in it equals the number of distinct elements in the whole array. Return the number of complete subarrays.

### Example

Input: nums = [1,3,1,2,2]
Output: 4
Explanation: The whole array has 3 distinct elements (1, 3, 2). The complete subarrays are [1,3,1,2], [1,3,1,2,2], [3,1,2], and [3,1,2,2].

## Approach

First compute `totalDistinct`, the number of distinct values in the whole array. Then use a two-pointer sliding window: for each `left`, extend `right` (without ever moving it backward across iterations) until the window `[left, right)` contains `totalDistinct` distinct values. Every subarray starting at `left` and ending anywhere from `right-1` to the end of the array is complete, contributing `n - right + 1` to the count. Then shrink the window by removing `nums[left]` before moving to the next `left`.

## C# Solution

```csharp
public class Solution 
{
    public int CountCompleteSubarrays(int[] nums) 
    {
        int n = nums.Length;
        int totalDistinct = new HashSet<int>(nums).Count;

        var freq = new Dictionary<int, int>();
        int right = 0;
        int distinct = 0;
        int count = 0;

        for (int left = 0; left < n; left++) 
        {
            while (right < n && distinct < totalDistinct) 
            {
                int val = nums[right];
                freq[val] = freq.GetValueOrDefault(val, 0) + 1;
                if (freq[val] == 1) distinct++;
                right++;
            }

            if (distinct == totalDistinct) 
            {
                count += n - right + 1;
            }

            int leftVal = nums[left];
            freq[leftVal]--;
            if (freq[leftVal] == 0) 
            {
                distinct--;
                freq.Remove(leftVal);
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(d) where d is the number of distinct values
