# 3536. Maximum Product of Two Digits

**Difficulty:** Easy
**Category:** Math

## Problem

Given a positive integer `n`, return the maximum product of two digits of `n`. The two digits chosen must occupy two different positions in the decimal representation of `n` (their values may be equal if the digit repeats).

### Example

`n = 124`. The digits are `1, 2, 4`. Choosing `2` and `4` gives the maximum product `8`.

## Approach

Extract all digits of `n` into a list, sort them, and multiply the two largest digits.

## C# Solution

```csharp
public class Solution 
{
    public int MaxProduct(int n) 
    {
        List<int> digits = new List<int>();
        while (n > 0)
        {
            digits.Add(n % 10);
            n /= 10;
        }

        digits.Sort();
        int len = digits.Count;
        return digits[len - 1] * digits[len - 2];
    }
}
```

## Complexity

- **Time:** O(d log d), where `d` is the number of digits in `n`
- **Space:** O(d)
