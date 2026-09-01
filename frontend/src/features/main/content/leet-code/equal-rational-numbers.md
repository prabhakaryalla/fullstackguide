# 972. Equal Rational Numbers

**Difficulty:** Hard
**Category:** Math, String
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two strings `s` and `t` representing rational numbers (each possibly containing a repeating decimal part in parentheses, e.g. `"0.1(6)"`), return whether they represent the same number.

### Example

```
Input: s = "0.(52)", t = "0.5(25)"
Output: true
```

## Approach

Convert each representation to its exact decimal value: parse the non-repeating part directly, and convert the repeating part into a fraction using the standard formula `repeatingDigits / (10^repeatLen - 1)`, scaled down by the number of non-repeating fractional digits already consumed. Since the problem's constraints keep values small, compare the two resulting doubles with a small epsilon.

## C# Solution

```csharp
public class Solution
{
    public bool IsRationalEqual(string s, string t)
    {
        return Math.Abs(ToDouble(s) - ToDouble(t)) < 1e-9;
    }

    private double ToDouble(string s)
    {
        int idx = s.IndexOf('(');
        if (idx == -1) return double.Parse(s);

        string nonRepeating = s.Substring(0, idx);
        string repeating = s.Substring(idx + 1, s.Length - idx - 2);

        double baseValue = double.Parse(nonRepeating);
        double repeatValue = double.Parse(repeating);
        double denom = Math.Pow(10, repeating.Length) - 1;

        int dotIdx = nonRepeating.IndexOf('.');
        int fracLen = dotIdx == -1 ? 0 : nonRepeating.Length - dotIdx - 1;
        double factor = Math.Pow(10, fracLen);

        return baseValue + repeatValue / (denom * factor);
    }
}
```

## Complexity

- **Time:** `O(len(s) + len(t))`.
- **Space:** `O(1)`.
