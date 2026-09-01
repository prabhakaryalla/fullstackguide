# 3754. Concatenate Non-Zero Digits and Multiply by Sum I

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

You are given an integer `n`. Form a new integer `x` by concatenating all the non-zero digits of `n` in their original order (if there are none, `x = 0`). Let `sum` be the sum of the digits of `x`. Return `x * sum`.

### Example

Input: `n = 10203004`
Output: `12340`

The non-zero digits are 1, 2, 3, 4, so `x = 1234`. The digit sum is `1+2+3+4=10`. The answer is `1234 * 10 = 12340`.

## Approach

Convert `n` to a string, filter out `'0'` characters, and parse the remaining digits into `x` (or `0` if empty). Compute the digit sum of `x` directly from the filtered digits, then multiply. Use `long` since `x * sum` can exceed the range of `int`.

## C# Solution

```csharp
public class Solution 
{
    public long SumAndMultiply(int n) 
    {
        string digits = n.ToString();
        long x = 0;
        long sum = 0;
        bool any = false;
        foreach (char c in digits)
        {
            if (c == '0') continue;
            any = true;
            int d = c - '0';
            x = x * 10 + d;
            sum += d;
        }
        if (!any) return 0;
        return x * sum;
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(log n)
