# 2520. Count the Digits That Divide a Number

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `num`, return the number of digits in `num` that divide `num`.

An integer `val` divides `num` if `num % val == 0`.

### Example

```
Input: num = 121
Output: 2
Explanation: 121 is divisible by 1 and 1, but digit 2 doesn't divide 121. So count is 2.
Actually 121 has digits 1, 2, 1. 121 % 1 = 0 (yes), 121 % 2 = 1 (no), 121 % 1 = 0 (yes). Count = 2.
```

## Approach

Extract each digit from the number. For each non-zero digit, check if the original number is divisible by it. Count how many digits divide the number evenly.

## C# Solution

```csharp
public class Solution
{
    public int CountDigits(int num)
    {
        int original = num;
        int count = 0;
        
        while (num > 0)
        {
            int digit = num % 10;
            if (digit != 0 && original % digit == 0)
            {
                count++;
            }
            num /= 10;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(log num) where log num is the number of digits
- **Space:** O(1)
