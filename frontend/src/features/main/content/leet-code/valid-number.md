# 65. Valid Number

**Difficulty:** Hard
**Category:** String

## Problem

Given a string `s`, return `true` if `s` is a valid number (integer or decimal, optionally in scientific/exponential notation, with an optional leading sign).

### Example 1

```
Input: s = "0089"
Output: true
```

### Example 2

```
Input: s = "1e10"
Output: true
```

### Example 3

```
Input: s = "abc"
Output: false
```

### Constraints

- `1 <= s.length <= 20`
- `s` consists of only English letters (upper and lower case), digits, `'+'`, `'-'`, or `'.'`.

## Approach

Model the grammar with three boolean flags while scanning once left to right: `seenDigit`, `seenDot`, and `seenExponent`. A `+`/`-` is only valid at the start of the string or immediately after `'e'`/`'E'`. A `'.'` is only valid before any exponent and at most once. An `'e'`/`'E'` is only valid once, only after at least one digit, and must itself be followed by at least one digit.

## C# Solution

```csharp
public class Solution
{
    public bool IsNumber(string s)
    {
        bool seenDigit = false, seenDot = false, seenExponent = false;

        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];

            if (char.IsDigit(c))
            {
                seenDigit = true;
            }
            else if (c == '+' || c == '-')
            {
                if (i > 0 && s[i - 1] != 'e' && s[i - 1] != 'E') return false;
            }
            else if (c == '.')
            {
                if (seenDot || seenExponent) return false;
                seenDot = true;
            }
            else if (c == 'e' || c == 'E')
            {
                if (seenExponent || !seenDigit) return false;
                seenExponent = true;
                seenDigit = false; // require at least one digit after the exponent
            }
            else
            {
                return false;
            }
        }

        return seenDigit;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass over the string.
- **Space:** `O(1)`.
