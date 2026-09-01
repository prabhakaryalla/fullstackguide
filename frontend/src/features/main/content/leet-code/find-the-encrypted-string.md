# 3210. Find the Encrypted String

**Difficulty:** Easy
**Category:** String

## Problem
Given a string `s` and an integer `k`, an "encryption" replaces every character with the character that is `k` positions ahead of it in the string, wrapping cyclically around the end back to the beginning. Return the resulting encrypted string.

## Approach
Since each character maps to the one `k` positions ahead cyclically, the entire encrypted string can be constructed directly by rotating the string: the result is the substring starting at index `k mod length` through the end, followed by the substring from the beginning up to index `k mod length`. This works because shifting every character forward by `k` positions with wraparound is exactly equivalent to a left circular rotation of the whole string by `k` positions.

## C# Solution
```csharp
public class Solution {
    public string GetEncryptedString(string s, int k) {
        int n = s.Length;
        k %= n;
        return s.Substring(k) + s.Substring(0, k);
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n) for the resulting string
