# 383. Ransom Note

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine`, where each letter in `magazine` can only be used once.

### Example

```
Input: ransomNote = "aa", magazine = "aab"
Output: true
```

### Constraints

- `1 <= ransomNote.length, magazine.length <= 10^5`
- `ransomNote` and `magazine` consist of lowercase English letters.

## Approach

Count the occurrences of each letter available in `magazine`, then subtract one for every letter required by `ransomNote`. If any count goes negative, there aren't enough of that letter available.

## C# Solution

```csharp
public class Solution
{
    public bool CanConstruct(string ransomNote, string magazine)
    {
        var counts = new int[26];
        foreach (var c in magazine)
            counts[c - 'a']++;

        foreach (var c in ransomNote)
        {
            counts[c - 'a']--;
            if (counts[c - 'a'] < 0) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(1)` — bounded by the 26-letter alphabet.
