# 161. One Edit Distance

**Difficulty:** Medium
**Category:** Hash Table, String

## Problem

Given two strings `s` and `t`, return `true` if they are exactly one edit apart, where an edit is one of: inserting a character, deleting a character, or replacing a character.

### Example 1

```
Input: s = "ab", t = "acb"
Output: true
Explanation: inserting 'c' between 'a' and 'b' in s gives t.
```

### Example 2

```
Input: s = "cab", t = "ad"
Output: false
Explanation: the lengths differ by 1, but two replacements would be needed, not one.
```

### Constraints

- `0 <= s.length, t.length <= 10^4`
- `s` and `t` consist of lowercase and uppercase English letters, digits, or symbols.

## Approach

If the length difference is more than 1, they can't be one edit apart. Otherwise, walk both strings together; at the first mismatch, either the strings must be identical from that point on except for a one-character length difference (an insert/delete), or — if they're the same length — the rest of the string must match exactly after skipping just that one character (a replace).

## C# Solution

```csharp
public class Solution
{
    public bool IsOneEditDistance(string s, string t)
    {
        int m = s.Length, n = t.Length;
        if (Math.Abs(m - n) > 1) return false;

        if (m > n) return IsOneEditDistance(t, s); // ensure s is the shorter or equal string

        for (int i = 0; i < m; i++)
        {
            if (s[i] != t[i])
            {
                if (m == n) return s.Substring(i + 1) == t.Substring(i + 1);
                return s.Substring(i) == t.Substring(i + 1);
            }
        }

        return m != n; // identical prefix; valid only if t has exactly one extra trailing char
    }
}
```

## Complexity

- **Time:** `O(n)` — a linear scan plus a linear substring comparison.
- **Space:** `O(n)` — for the substring comparisons.
