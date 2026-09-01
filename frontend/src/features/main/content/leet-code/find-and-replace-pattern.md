# 890. Find and Replace Pattern

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given an array of `words` and a `pattern`, return all words that match the pattern, where a match means there exists a bijection (one-to-one, onto mapping) between the letters of the word and the letters of the pattern.

### Example

```
Input: words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abc"
Output: ["mee","aqq"]
```

## Approach

For each candidate word (of the same length as the pattern), build two mappings simultaneously while scanning character by character: one from word-letter to pattern-letter, and one from pattern-letter to word-letter. If either mapping is ever violated (an existing mapping doesn't match the newly observed pair), the word doesn't match. A word matches only if both mappings remain consistent throughout, ensuring a true bijection.

## C# Solution

```csharp
public class Solution
{
    public IList<string> FindAndReplacePattern(string[] words, string pattern)
    {
        var result = new List<string>();

        foreach (var word in words)
        {
            if (Matches(word, pattern))
                result.Add(word);
        }

        return result;
    }

    private bool Matches(string word, string pattern)
    {
        if (word.Length != pattern.Length) return false;

        var wordToPattern = new Dictionary<char, char>();
        var patternToWord = new Dictionary<char, char>();

        for (int i = 0; i < word.Length; i++)
        {
            char w = word[i], p = pattern[i];

            if (wordToPattern.TryGetValue(w, out char mappedP))
            {
                if (mappedP != p) return false;
            }
            else
            {
                wordToPattern[w] = p;
            }

            if (patternToWord.TryGetValue(p, out char mappedW))
            {
                if (mappedW != w) return false;
            }
            else
            {
                patternToWord[p] = w;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n * L)`.
- **Space:** `O(L)` for the mapping dictionaries.
