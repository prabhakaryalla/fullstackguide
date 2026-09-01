# 3701. Compute Alternating Sum

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given an integer array `nums`, return the alternating sum: `nums[0] - nums[1] + nums[2] - nums[3] + ...`.

### Example

Input: `nums = [4,2,5,3]`
Output: `4`
Explanation: `4 - 2 + 5 - 3 = 4`.

## Approach

Iterate through the array, adding elements at even indices and subtracting elements at odd indices.

## C# Solution

```csharp
public class Solution 
{
    public long GetSum(int[] nums) 
    {
        long sum = 0;
        for (int i = 0; i < nums.Length; i++) 
        {
            sum += (i % 2 == 0) ? nums[i] : -nums[i];
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
