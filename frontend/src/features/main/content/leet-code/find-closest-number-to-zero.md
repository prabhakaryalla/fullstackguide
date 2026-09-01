# 2239. Find Closest Number to Zero

**Difficulty:** Easy
**Category:** Array

## Problem

Given an integer array `nums` of size `n`, return the number with the closest value to zero in `nums`. If there are multiple answers, return the number with the largest value.

### Example

```
Input: nums = [-4,-2,1,4,8]
Output: 1
Explanation:
- Distance from -4 to 0 is 4
- Distance from -2 to 0 is 2
- Distance from 1 to 0 is 1 (smallest)
- Distance from 4 to 0 is 4
- Distance from 8 to 0 is 8
Answer: 1
```

## Approach

Iterate through the array tracking the number with minimum absolute value. When two numbers have the same absolute value, prefer the positive one.

## C# Solution

```csharp
public class Solution
{
    public int FindClosestNumber(int[] nums)
    {
        int closest = nums[0];
        
        foreach (int num in nums)
        {
            if (Math.Abs(num) < Math.Abs(closest) || 
                (Math.Abs(num) == Math.Abs(closest) && num > closest))
            {
                closest = num;
            }
        }
        
        return closest;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1).
