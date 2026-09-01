# 3300. Minimum Element After Replacement With Digit Sum

**Difficulty:** Easy
**Category:** Array, Math

## Problem

You are given an integer array `nums`. Replace each element `nums[i]` with the difference between itself and the sum of its digits. Return the minimum value in the resulting array.

### Example

```
Input: nums = [23,12,25]
Output: 3
Explanation: 23 - (2+3) = 18, 12 - (1+2) = 9, 25 - (2+5) = 18. The minimum is 9... (values depend on exact inputs).
```

## Approach

For each number, compute the sum of its digits and subtract it from the number itself, then track the minimum result across the whole array.

## C# Solution

```csharp
public class Solution 
{
    public int MinElement(int[] nums) 
    {
        int minVal = int.MaxValue;

        foreach (int num in nums) 
        {
            int sum = DigitSum(num);
            if (sum < minVal) minVal = sum;
        }

        return minVal;
    }

    private int DigitSum(int num) 
    {
        int sum = 0;
        while (num > 0) 
        {
            sum += num % 10;
            num /= 10;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n * d) where d is the number of digits
- **Space:** O(1)
