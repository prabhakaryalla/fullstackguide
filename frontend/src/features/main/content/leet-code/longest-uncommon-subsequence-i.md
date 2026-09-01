# 521. Longest Uncommon Subsequence I

**Difficulty:** Easy
**Category:** String

## Problem

Given two strings `a` and `b`, return the length of the longest uncommon subsequence between them — a string that is a subsequence of one but not the other. If no such subsequence exists, return `-1`.

### Example

```
Input: a = "aba", b = "cdc"
Output: 3
```

### Constraints

- `1 <= a.length, b.length <= 100`
- `a` and `b` consist of lowercase English letters.

## Approach

If the two strings are identical, every subsequence of one is also a subsequence of the other, so no uncommon subsequence exists. Otherwise, the longer (or either, if equal length but different) string itself is never a subsequence of the other, since it isn't even equal to it, making its own full length the answer.

## C# Solution

```csharp
public class Solution
{
    public int FindLUSlength(string a, string b)
    {
        if (a == b) return -1;
        return Math.Max(a.Length, b.Length);
    }
}
```

## Complexity

- **Time:** `O(n)` for the string comparison.
- **Space:** `O(1)`.
