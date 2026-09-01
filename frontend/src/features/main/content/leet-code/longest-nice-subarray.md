# 2402. Longest Nice Subarray

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Sliding Window

## Problem

You are given an array `nums` consisting of positive integers. A subarray is nice if the bitwise AND of every pair of elements in the subarray is equal to 0.

Return the length of the longest nice subarray.

### Example

```
Input: nums = [1,3,8,48,10]
Output: 3
Explanation: The longest nice subarray is [3,8,48].
- 3 AND 8 = 0
- 3 AND 48 = 0
- 8 AND 48 = 0
```

## Approach

Use a sliding window approach with a bitmask to track which bits are set in the current window. For each new element, check if its bits conflict with any existing bits in the window. If there's a conflict, shrink the window from the left until the conflict is resolved. Track the maximum window size seen.

## C# Solution

```csharp
public class Solution
{
    public int LongestNiceSubarray(int[] nums)
    {
        int maxLen = 0;
        int mask = 0;
        int left = 0;
        
        for (int right = 0; right < nums.Length; right++)
        {
            while ((mask & nums[right]) != 0)
            {
                mask ^= nums[left];
                left++;
            }
            
            mask |= nums[right];
            maxLen = Math.Max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1)
