# 1309. Decrypt String from Alphabet to Integer Mapping

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` of digits, decode it into a string of lowercase letters using the mapping `'1'-'9'` to `'a'-'i'` and two-digit codes `"10#"`-`"26#"` to `'j'-'z'`.

### Example

```
Input: s = "10#11#12#"
Output: "jkab"
```

## Approach

Scan the string from left to right. Whenever the character two positions ahead is `'#'`, decode the two-digit number before it as a letter and advance three positions; otherwise decode the single digit as a letter and advance one position.

## C# Solution

```csharp
public class Solution
{
    public string FreqAlphabets(string s)
    {
        var sb = new System.Text.StringBuilder();
        int i = 0;

        while (i < s.Length)
        {
            if (i + 2 < s.Length && s[i + 2] == '#')
            {
                int code = (s[i] - '0') * 10 + (s[i + 1] - '0');
                sb.Append((char)('a' + code - 1));
                i += 3;
            }
            else
            {
                sb.Append((char)('a' + (s[i] - '0') - 1));
                i += 1;
            }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output string.
