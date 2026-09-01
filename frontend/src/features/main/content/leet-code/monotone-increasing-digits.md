# 738. Monotone Increasing Digits

**Difficulty:** Medium
**Category:** Greedy

## Problem

Given an integer `n`, return the largest number less than or equal to `n` whose digits are monotone non-decreasing (each digit is `>=` the previous one).

### Example

```
Input: n = 332
Output: 299
```

## Approach

Scan the digits from right to left. Whenever a digit is smaller than the digit to its left (a decreasing step), decrement the left digit by one and remember this position as the start of a region that will need to be maximized with `9`s (since reducing an earlier digit can only be "compensated" for by making everything after it as large as possible). After the scan, replace every digit from the last recorded position onward with `9`.

## C# Solution

```csharp
public class Solution
{
    public int MonotoneIncreasingDigits(int n)
    {
        var digits = n.ToString().ToCharArray();
        int markFrom = digits.Length;

        for (int i = digits.Length - 1; i > 0; i--)
        {
            if (digits[i - 1] > digits[i])
            {
                digits[i - 1]--;
                markFrom = i;
            }
        }

        for (int i = markFrom; i < digits.Length; i++)
            digits[i] = '9';

        return int.Parse(new string(digits));
    }
}
```

## Complexity

- **Time:** `O(d)`, where `d` is the number of digits.
- **Space:** `O(d)` for the digit array.
