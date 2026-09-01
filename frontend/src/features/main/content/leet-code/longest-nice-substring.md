# 1763. Longest Nice Substring

**Difficulty:** Easy
**Category:** String, Divide and Conquer, Bit Manipulation

## Problem

A string is "nice" if for every letter that appears in it, both the lowercase and uppercase versions of that letter also appear. Given a string `s`, return the longest nice substring; if there are multiple of the same maximum length, return the first one; return an empty string if none exists.

### Example

```
Input: s = "YazaAay"
Output: "aAa"
```

## Approach

For every starting index, extend the substring one character at a time while maintaining bitmasks of which lowercase and uppercase letters have appeared. Whenever the two bitmasks are equal, the current substring is nice; keep the longest one found (ties keep the first, since it's found using the smallest start index first).

## C# Solution

```csharp
public class Solution
{
    public string LongestNiceSubstring(string s)
    {
        int n = s.Length;
        string best = "";

        for (int i = 0; i < n; i++)
        {
            int lowerMask = 0, upperMask = 0;
            for (int j = i; j < n; j++)
            {
                char c = s[j];
                if (char.IsLower(c)) lowerMask |= 1 << (c - 'a');
                else upperMask |= 1 << (c - 'A');

                if (lowerMask == upperMask && j - i + 1 > best.Length)
                    best = s.Substring(i, j - i + 1);
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the result substring.
