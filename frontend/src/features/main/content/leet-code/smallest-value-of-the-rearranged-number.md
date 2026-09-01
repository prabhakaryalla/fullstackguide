# 2165. Smallest Value of the Rearranged Number

**Difficulty:** Medium
**Category:** Math, Sorting

## Problem

You are given an integer `num`. Rearrange the digits of `num` to get the smallest value, while preserving the sign. The result should not contain leading zeros.

### Example

```
Input: num = 310
Output: 103

Input: num = -7605
Output: -7650
Explanation: Rearrange to maximize magnitude (smallest absolute value for negative)
```

## Approach

For positive numbers: sort digits ascending, but move the first non-zero digit to the front to avoid leading zeros.

For negative numbers: sort digits descending (to minimize the magnitude, which maximizes the value since it's negative).

## C# Solution

```csharp
public class Solution
{
    public long SmallestNumber(long num)
    {
        if (num == 0) return 0;
        
        bool isNegative = num < 0;
        var digits = Math.Abs(num).ToString().ToCharArray();
        
        if (isNegative)
        {
            // Sort descending for negative (minimize magnitude)
            Array.Sort(digits);
            Array.Reverse(digits);
        }
        else
        {
            // Sort ascending for positive
            Array.Sort(digits);
            
            // Move first non-zero to front
            for (int i = 0; i < digits.Length; i++)
            {
                if (digits[i] != '0')
                {
                    char temp = digits[0];
                    digits[0] = digits[i];
                    digits[i] = temp;
                    break;
                }
            }
        }
        
        long result = long.Parse(new string(digits));
        return isNegative ? -result : result;
    }
}
```

## Complexity

- **Time:** O(d log d) where d is the number of digits
- **Space:** O(d) for the digit array
