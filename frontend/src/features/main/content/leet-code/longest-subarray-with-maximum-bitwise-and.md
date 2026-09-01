# 2430. Longest Subarray With Maximum Bitwise AND

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Brainteaser

## Problem

You are given an integer array `nums` of size `n`. Consider a non-empty subarray from `nums` that has the maximum possible bitwise AND.

Return the length of the longest such subarray. The bitwise AND of an array is the bitwise AND of all the numbers in it.

### Example

```
Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation:
The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], which has length 2.
```

## Approach

The maximum bitwise AND of any subarray is the maximum element in the array (since AND can only remove bits, never add them). Find the maximum value, then find the longest consecutive sequence of that maximum value.

## C# Solution

```csharp
public class Solution
{
    public int LongestSubarray(int[] nums)
    {
        int maxVal = nums.Max();
        int maxLen = 0;
        int currentLen = 0;
        
        foreach (int num in nums)
        {
            if (num == maxVal)
            {
                currentLen++;
                maxLen = Math.Max(maxLen, currentLen);
            }
            else
            {
                currentLen = 0;
            }
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1)
