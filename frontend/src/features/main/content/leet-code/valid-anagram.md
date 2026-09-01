# 242. Valid Anagram

**Difficulty:** Easy
**Category:** Hash Table, String, Sorting

## Problem

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

### Example 1

```
Input: s = "anagram", t = "nagaram"
Output: true
```

### Example 2

```
Input: s = "rat", t = "car"
Output: false
```

### Constraints

- `1 <= s.length, t.length <= 5 * 10^4`
- `s` and `t` consist of lowercase English letters.

## Approach

If the lengths differ, the strings cannot be anagrams. Otherwise, count the frequency of each character in `s` using a fixed-size array (26 lowercase letters), then decrement for each character in `t`. If every count returns to zero, the strings are anagrams.

## C# Solution

```csharp
public class Solution
{
    public bool IsAnagram(string s, string t)
    {
        if (s.Length != t.Length) return false;

        var counts = new int[26];
        for (int i = 0; i < s.Length; i++)
        {
            counts[s[i] - 'a']++;
            counts[t[i] - 'a']--;
        }

        foreach (var count in counts)
        {
            if (count != 0) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over both strings.
- **Space:** `O(1)` — fixed-size 26-element count array.
