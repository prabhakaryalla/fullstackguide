# 8. String to Integer (atoi)

**Difficulty:** Medium
**Category:** String

## Problem

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.

The algorithm:

1. Skip leading whitespace.
2. Read an optional `'+'` or `'-'` sign.
3. Read digits until a non-digit is found, ignoring leading zeros.
4. Clamp the result to the 32-bit signed integer range `[-2^31, 2^31 - 1]`.
5. Return `0` if no digits were read.

### Example 1

```
Input: s = "42"
Output: 42
```

### Example 2

```
Input: s = "   -42"
Output: -42
```

### Example 3

```
Input: s = "4193 with words"
Output: 4193
```

### Constraints

- `0 <= s.length <= 200`
- `s` consists of English letters (lower-case and upper-case), digits, `' '`, `'+'`, `'-'`, and `'.'`.

## Approach

Walk the string once: skip whitespace, capture an optional sign, then accumulate digits into a `long` (to safely detect overflow) while clamping to `int.MinValue`/`int.MaxValue` as soon as the running value exceeds those bounds.

## C# Solution

```csharp
public class Solution
{
    public int MyAtoi(string s)
    {
        int i = 0, n = s.Length;
        while (i < n && s[i] == ' ') i++;

        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-'))
        {
            sign = s[i] == '-' ? -1 : 1;
            i++;
        }

        long result = 0;
        while (i < n && char.IsDigit(s[i]))
        {
            result = result * 10 + (s[i] - '0');

            if (sign * result <= int.MinValue) return int.MinValue;
            if (sign * result >= int.MaxValue) return int.MaxValue;

            i++;
        }

        return (int)(sign * result);
    }
}
```

## Complexity

- **Time:** `O(n)` — single left-to-right scan.
- **Space:** `O(1)`.
