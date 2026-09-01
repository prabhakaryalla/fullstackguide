# 709. To Lower Case

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s`, return the string after converting every uppercase letter to lowercase.

### Example

```
Input: s = "LOVELY"
Output: "lovely"
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of printable ASCII characters.

## Approach

Scan each character, and for any uppercase letter (in the range `'A'`-`'Z'`), shift it by 32 positions in the ASCII table to obtain its lowercase equivalent; leave all other characters unchanged.

## C# Solution

```csharp
public class Solution
{
    public string ToLowerCase(string s)
    {
        var chars = s.ToCharArray();

        for (int i = 0; i < chars.Length; i++)
        {
            if (chars[i] >= 'A' && chars[i] <= 'Z')
                chars[i] = (char)(chars[i] + 32);
        }

        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the character array.
