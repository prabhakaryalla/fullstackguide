# 392. Is Subsequence

**Difficulty:** Easy
**Category:** Two Pointers, String, Dynamic Programming

## Problem

Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t` (formed by deleting some, none, or all characters of `t` without reordering the rest).

### Example

```
Input: s = "abc", t = "ahbgdc"
Output: true
```

### Constraints

- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- Both strings consist only of lowercase English letters.

## Approach

Use two pointers: advance through `t`, and whenever the character matches the current character of `s`, advance the pointer in `s` too. If the pointer in `s` reaches the end, every character of `s` was matched in order.

## C# Solution

```csharp
public class Solution
{
    public bool IsSubsequence(string s, string t)
    {
        int i = 0;
        for (int j = 0; j < t.Length && i < s.Length; j++)
        {
            if (s[i] == t[j]) i++;
        }

        return i == s.Length;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `t`.
- **Space:** `O(1)`.
