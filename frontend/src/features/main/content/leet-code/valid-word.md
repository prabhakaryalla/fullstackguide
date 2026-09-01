# 3136. Valid Word

**Difficulty:** Easy
**Category:** String

## Problem

A word is "valid" if it has a length of at least `3`, contains only digits and English letters (no other symbols), includes at least one vowel (`a, e, i, o, u`, either case), and includes at least one consonant. Given a string `word`, return whether it is valid.

## Approach

Check the length requirement first. Then scan every character: if any character isn't alphanumeric, it's immediately invalid. Track whether at least one vowel and at least one consonant have been seen. Return true only if the length, character-set, vowel, and consonant conditions all hold.

## C# Solution

```csharp
public class Solution {
    public bool IsValid(string word) {
        if (word.Length < 3)
            return false;

        bool hasVowel = false, hasConsonant = false;
        foreach (char c in word) {
            if (!char.IsLetterOrDigit(c))
                return false;
            if (char.IsLetter(c)) {
                if ("aeiouAEIOU".IndexOf(c) >= 0)
                    hasVowel = true;
                else
                    hasConsonant = true;
            }
        }

        return hasVowel && hasConsonant;
    }
}
```

## Complexity

- Time: O(n) — a single pass over `word`.
- Space: O(1).
