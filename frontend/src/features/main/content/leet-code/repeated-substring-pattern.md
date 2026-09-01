# 459. Repeated Substring Pattern

**Difficulty:** Easy
**Category:** String, String Matching

## Problem

Given a string `s`, return `true` if it can be constructed by taking a substring of it and appending multiple copies of that substring together.

### Example

```
Input: s = "abab"
Output: true
Explanation: "abab" is made of "ab" repeated twice.
```

### Constraints

- `1 <= s.length <= 10^4`
- `s` consists of lowercase English letters.

## Approach

Concatenate `s` with itself and strip off the first and last characters. If `s` is genuinely built from a repeating substring, a full copy of `s` must appear somewhere within this trimmed double-string (a classic string-matching trick, since any rotation of a periodic string reappears within its doubled form).

## C# Solution

```csharp
public class Solution
{
    public bool RepeatedSubstringPattern(string s)
    {
        var doubled = (s + s).Substring(1, s.Length * 2 - 2);
        return doubled.Contains(s);
    }
}
```

## Complexity

- **Time:** `O(n)` (amortized, using an efficient substring search).
- **Space:** `O(n)` for the doubled string.
