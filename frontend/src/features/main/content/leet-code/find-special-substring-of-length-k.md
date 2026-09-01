# 3456. Find Special Substring of Length K

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` and an integer `k`, determine whether `s` contains a "special" substring of length exactly `k`. A substring is special if it consists of only one repeated character, and the character immediately before it (if any) and the character immediately after it (if any) are both different from that repeated character.

### Example

`s = "aaba", k = 2` → `true`. The substring `"aa"` (indices 0-1) has length 2, is made of a single repeated character `'a'`, and the character right after it, `'b'`, is different (there's nothing before it).

## Approach

Scan the string and group it into maximal runs of identical consecutive characters. A run can only contribute a valid special substring of length `k` if the run's total length is exactly `k` — if the run were longer, any length-`k` window inside it would be flanked by the same character on at least one side. So the answer is `true` if and only if some maximal run has length exactly `k`.

## C# Solution

```csharp
public class Solution 
{
    public bool HasSpecialSubstring(string s, int k) 
    {
        int n = s.Length;
        int i = 0;

        while (i < n)
        {
            int j = i;
            while (j < n && s[j] == s[i])
                j++;

            if (j - i == k)
                return true;

            i = j;
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
