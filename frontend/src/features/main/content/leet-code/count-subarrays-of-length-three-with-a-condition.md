# 3392. Count Subarrays of Length Three With a Condition

**Difficulty:** Easy
**Category:** Array

## Problem

Given an integer array `nums`, count the number of subarrays of length 3 such that the sum of the first and third elements equals half of the middle element.

### Example

Input: `nums = [1,2,1,4,1]`
Output: `1` — the subarray `[1,2,1]` satisfies `1+1 == 2/2`.

## Approach

Slide a window of size 3 across the array and check the condition `nums[i] + nums[i+2] == nums[i+1] / 2` for each starting index `i`, counting matches. Note the division must be exact (integer division) as per the problem's constraint that the middle value is even when it matters.

## C# Solution

```csharp
public class Solution 
{
    public int CountSubarrays(int[] nums) 
    {
        int count = 0;
        for (int i = 0; i + 2 < nums.Length; i++) 
        {
            if (nums[i] + nums[i + 2] == nums[i + 1] / 2)
                count++;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
