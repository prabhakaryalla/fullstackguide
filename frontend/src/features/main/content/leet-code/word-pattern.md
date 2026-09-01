# 290. Word Pattern

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given a `pattern` and a string `s`, find if `s` follows the same pattern — there is a bijection (one-to-one, two-way mapping) between each letter in `pattern` and each word in `s` (split by spaces).

### Example 1

```
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
```

### Example 2

```
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
```

## Approach

Split `s` into words and check the word count matches the pattern length. Maintain two maps: letter -> word and word -> letter. For each position, check that the existing mapping (if any) is consistent in both directions; if either map already has a different pairing, the pattern is violated.

## C# Solution

```csharp
public class Solution
{
    public bool WordPattern(string pattern, string s)
    {
        var words = s.Split(' ');
        if (pattern.Length != words.Length) return false;

        var charToWord = new Dictionary<char, string>();
        var wordToChar = new Dictionary<string, char>();

        for (int i = 0; i < pattern.Length; i++)
        {
            char c = pattern[i];
            string word = words[i];

            if (charToWord.TryGetValue(c, out var mappedWord))
            {
                if (mappedWord != word) return false;
            }
            else
            {
                charToWord[c] = word;
            }

            if (wordToChar.TryGetValue(word, out var mappedChar))
            {
                if (mappedChar != c) return false;
            }
            else
            {
                wordToChar[word] = c;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — where `n` is the total length of `s`.
- **Space:** `O(n)` — for the two mapping dictionaries.
