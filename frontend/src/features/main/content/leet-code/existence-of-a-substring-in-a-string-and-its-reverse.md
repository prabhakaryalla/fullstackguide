# 3083. Existence of a Substring in a String and Its Reverse

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given a string `s`, determine whether there exists at least one substring of length `2` that appears both in `s` and in the reverse of `s`.

### Example

```
Input: s = "leetcode"
Output: true
Explanation: The substring "ee" appears in s, and its reverse "edocteel" also contains "ee".
```

## Approach

Reverse the string once. Then check every length-2 substring of the original `s` to see whether it's found anywhere inside the reversed string; if any match is found, return `true`.

## C# Solution

```csharp
public class Solution {
    public bool IsSubstringPresent(string s) {
        string reversed = new string(s.Reverse().ToArray());

        for (int i = 0; i + 2 <= s.Length; i++)
            if (reversed.Contains(s.Substring(i, 2)))
                return true;

        return false;
    }
}
```

## Complexity

- Time: O(n^2) — checking each of the O(n) length-2 substrings against the reversed string.
- Space: O(n) — for the reversed string.
