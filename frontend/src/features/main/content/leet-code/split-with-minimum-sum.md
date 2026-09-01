# 2578. Split With Minimum Sum

**Difficulty:** Easy
**Category:** Greedy, Sorting

## Problem

Given a positive integer `num`, split it into two non-negative integers `num1` and `num2` such that:

- The concatenation of `num1` and `num2` is a permutation of the digits of `num`
- `num1` and `num2` can contain leading zeros

Return the minimum possible sum of `num1` and `num2`.

### Example

```
Input: num = 4325
Output: 59
Explanation: Split into 24 and 35 → 24 + 35 = 59
Digits: 2,3,4,5 distributed to minimize sum

Input: num = 687
Output: 75
Explanation: Split into 68 and 7 → 68 + 7 = 75
Or 67 and 8 → 67 + 8 = 75
```

## Approach

To minimize the sum:
1. Extract all digits and sort them in ascending order
2. Distribute digits alternately to two numbers, placing smaller digits in higher place values
3. This greedy approach ensures the smallest digits contribute most to minimizing the sum

Example: For 4325, sorted digits are [2,3,4,5]. Distribute as:
- num1: 2, 4 → 24
- num2: 3, 5 → 35
- Sum: 59

## C# Solution

```csharp
public class Solution
{
    public int SplitNum(int num)
    {
        var digits = new List<int>();
        while (num > 0)
        {
            digits.Add(num % 10);
            num /= 10;
        }
        
        digits.Sort();
        
        int num1 = 0, num2 = 0;
        for (int i = 0; i < digits.Count; i++)
        {
            if (i % 2 == 0)
                num1 = num1 * 10 + digits[i];
            else
                num2 = num2 * 10 + digits[i];
        }
        
        return num1 + num2;
    }
}
```

## Complexity

- **Time:** O(d log d) where d is the number of digits (for sorting)
- **Space:** O(d) for storing digits
