# 556. Next Greater Element III

**Difficulty:** Medium
**Category:** Math, Two Pointers, String

## Problem

Given a positive integer `n`, return the smallest integer strictly greater than `n` that has exactly the same digits (a rearrangement of `n`'s digits). Return `-1` if no such integer exists or it doesn't fit in a 32-bit signed integer.

### Example

```
Input: n = 12
Output: 21
```

### Constraints

- `1 <= n <= 2^31 - 1`

## Approach

This is the classic "next permutation" algorithm applied to digits. Scan from the right to find the first position where a digit is smaller than the digit immediately after it (the first place a rearrangement can increase the number). Swap that digit with the smallest digit to its right that is still larger than it, then reverse the suffix after that position to make it the smallest possible arrangement, minimizing the increase.

## C# Solution

```csharp
public class Solution
{
    public int NextGreaterElement(int n)
    {
        var digits = n.ToString().ToCharArray();
        int i = digits.Length - 2;

        while (i >= 0 && digits[i] >= digits[i + 1])
            i--;

        if (i < 0) return -1;

        int j = digits.Length - 1;
        while (digits[j] <= digits[i])
            j--;

        (digits[i], digits[j]) = (digits[j], digits[i]);

        Array.Reverse(digits, i + 1, digits.Length - i - 1);

        var result = new string(digits);
        return long.TryParse(result, out var value) && value <= int.MaxValue ? (int)value : -1;
    }
}
```

## Complexity

- **Time:** `O(d)`, where `d` is the number of digits.
- **Space:** `O(d)` for the digit array.
