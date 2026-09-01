# 2544. Alternating Digit Sum

**Difficulty:** Easy
**Category:** Math

## Problem

Given a positive integer `n`, return the alternating digit sum, computed by alternating between adding and subtracting digits from left to right.

### Example

```
Input: n = 521
Output: 4
Explanation: 5 - 2 + 1 = 4
```

## Approach

Convert the number to a string to access digits from left to right. Start by adding the first digit, then alternate between subtracting and adding.

## C# Solution

```csharp
public class Solution
{
    public int AlternateDigitSum(int n)
    {
        string s = n.ToString();
        int sum = 0;
        
        for (int i = 0; i < s.Length; i++)
        {
            int digit = s[i] - '0';
            if (i % 2 == 0)
            {
                sum += digit;
            }
            else
            {
                sum -= digit;
            }
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(log n) where log n is the number of digits
- **Space:** O(log n) for string conversion
