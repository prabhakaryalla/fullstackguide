# 2455. Average Value of Even Numbers That Are Divisible by Three

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given an integer array `nums`, return the average value of all even integers that are divisible by 3. Return 0 if there are no such integers.

The average should be rounded down to the nearest integer.

### Example

```
Input: nums = [1,3,6,10,12,15]
Output: 9
Explanation: 6 and 12 are both even and divisible by 3. Average = (6 + 12) / 2 = 9.
```

## Approach

Iterate through the array and sum all numbers that are both even and divisible by 3 (equivalently, divisible by 6). Count how many such numbers exist. Return the integer division of sum by count, or 0 if count is 0.

## C# Solution

```csharp
public class Solution
{
    public int AverageValue(int[] nums)
    {
        int sum = 0;
        int count = 0;
        
        foreach (int num in nums)
        {
            if (num % 6 == 0) // Even and divisible by 3
            {
                sum += num;
                count++;
            }
        }
        
        return count == 0 ? 0 : sum / count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(1)
