# 2401. Count Strictly Increasing Subarrays

**Difficulty:** Medium
**Category:** Array, Math, Sliding Window

## Problem

Given an integer array `nums`, return the total number of strictly increasing subarrays.

A subarray is a contiguous non-empty sequence of elements within an array. A strictly increasing subarray is a subarray where each element is strictly greater than the previous element.

### Example

```
Input: nums = [1,3,5,4,4,6]
Output: 12
Explanation: The strictly increasing subarrays are:
- Length 1: [1], [3], [5], [4], [4], [6] = 6 subarrays
- Length 2: [1,3], [3,5], [4,6] = 3 subarrays
- Length 3: [1,3,5] = 1 subarray
- Length 4+: none
Total = 6 + 3 + 1 + 0 + 0 + 2 = 12
```

## Approach

Iterate through the array and track the length of each increasing sequence. For each position, if the element is greater than the previous, extend the current sequence length; otherwise, reset it to 1. The number of strictly increasing subarrays ending at position `i` equals the current sequence length. Sum these values across all positions.

## C# Solution

```csharp
public class Solution
{
    public long CountSubarrays(int[] nums)
    {
        long count = 0;
        int length = 1;
        
        count += length;
        
        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] > nums[i - 1])
            {
                length++;
            }
            else
            {
                length = 1;
            }
            count += length;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1)
