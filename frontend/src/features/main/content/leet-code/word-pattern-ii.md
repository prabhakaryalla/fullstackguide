# 291. Word Pattern II

**Difficulty:** Medium
**Category:** Hash Table, String, Backtracking

## Problem

Given a `pattern` and a string `s`, find if `s` follows the same pattern — there is a bijection between each letter in `pattern` and a **non-empty** substring of `s`, such that concatenating the substrings mapped to each letter of `pattern` (in order) reconstructs `s` exactly.

### Example

```
Input: pattern = "abab", s = "redblueredblue"
Output: true
```

## Approach

Backtrack over the pattern position and the current position in `s`. At each pattern character, if it's already mapped, the next chunk of `s` must exactly match its mapped substring. If unmapped, try every possible substring length for the new mapping (ensuring it isn't already used for a different letter), recurse, and undo the mapping on failure (backtrack).

## C# Solution

```csharp
public class Solution
{
    public bool WordPatternMatch(string pattern, string s)
    {
        return Backtrack(pattern, 0, s, 0, new Dictionary<char, string>(), new HashSet<string>());
    }

    private bool Backtrack(string pattern, int pIndex, string s, int sIndex,
        Dictionary<char, string> charToWord, HashSet<string> usedWords)
    {
        if (pIndex == pattern.Length && sIndex == s.Length) return true;
        if (pIndex == pattern.Length || sIndex == s.Length) return false;

        char c = pattern[pIndex];

        if (charToWord.TryGetValue(c, out var mapped))
        {
            if (!s.AsSpan(sIndex).StartsWith(mapped)) return false;
            return Backtrack(pattern, pIndex + 1, s, sIndex + mapped.Length, charToWord, usedWords);
        }

        for (int len = 1; sIndex + len <= s.Length; len++)
        {
            var word = s.Substring(sIndex, len);
            if (usedWords.Contains(word)) continue;

            charToWord[c] = word;
            usedWords.Add(word);

            if (Backtrack(pattern, pIndex + 1, s, sIndex + len, charToWord, usedWords)) return true;

            charToWord.Remove(c);
            usedWords.Remove(word);
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n^m)` worst case — where `n` is the length of `s` and `m` is the number of distinct pattern letters, due to trying every substring split.
- **Space:** `O(m)` — for the mapping dictionaries, plus recursion depth.
