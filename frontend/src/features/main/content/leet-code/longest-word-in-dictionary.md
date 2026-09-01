# 720. Longest Word in Dictionary

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Trie, Sorting

## Problem

Given an array of strings `words` representing a dictionary, return the longest word that can be built one character at a time by other words in the dictionary. If multiple such words exist, return the lexicographically smallest; if none exists, return an empty string.

### Example

```
Input: words = ["w","wo","wor","worl","world"]
Output: "world"
```

## Approach

Sort the words lexicographically, which guarantees that any proper prefix of a word is always processed before the word itself (since a prefix is lexicographically smaller than any longer string it prefixes). Maintain a set of words confirmed "buildable" so far, starting with the empty string. For each word in sorted order, check whether its immediate prefix (itself minus the last character) is already in the buildable set; if so, add the word to the set and update the best (longest, then lexicographically smallest) result found.

## C# Solution

```csharp
public class Solution
{
    public string LongestWord(string[] words)
    {
        Array.Sort(words, StringComparer.Ordinal);

        var built = new HashSet<string> { "" };
        string result = "";

        foreach (var word in words)
        {
            if (built.Contains(word.Substring(0, word.Length - 1)))
            {
                built.Add(word);

                if (word.Length > result.Length)
                    result = word;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n + total characters)`.
- **Space:** `O(n)` for the buildable-words set.
