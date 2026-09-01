# 1844. Replace All Digits with Characters

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` of even length where characters at even indices are lowercase letters and characters at odd indices are digits, replace each digit `d` at odd index `i` with the character obtained by shifting `s[i-1]` forward in the alphabet by `d` positions, and return the resulting string.

### Example

```
Input: s = "a1c1e1"
Output: "abcdef"
```

## Approach

Walk the string; copy letters at even indices unchanged, and for each digit at an odd index compute the shifted character as `s[i-1] + (s[i] - '0')` (character arithmetic), appending it to the result.

## C# Solution

```csharp
public class Solution
{
    public string ReplaceDigits(string s)
    {
        var sb = new StringBuilder();

        for (int i = 0; i < s.Length; i++)
        {
            if (i % 2 == 0)
            {
                sb.Append(s[i]);
            }
            else
            {
                char shifted = (char)(s[i - 1] + (s[i] - '0'));
                sb.Append(shifted);
            }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
