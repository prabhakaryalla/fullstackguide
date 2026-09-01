# 676. Implement Magic Dictionary

**Difficulty:** Medium
**Category:** Design, Trie, String, Hash Table

## Problem

Design a data structure supporting `BuildDict(dictionary)` and `Search(searchWord)`, where `Search` returns `true` if changing exactly one character of `searchWord` results in a word that exists in the dictionary.

### Example

```
Input:
["MagicDictionary", "buildDict", "search", "search", "search", "search"]
[[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
Output:
[null, null, false, true, false, false]
```

## Approach

Store all dictionary words directly. For `Search`, compare `searchWord` against every stored word of the same length, counting how many character positions differ; a match is found when exactly one position differs (never zero, since that would mean no character was actually changed).

## C# Solution

```csharp
public class MagicDictionary
{
    private readonly List<string> words = new();

    public void BuildDict(string[] dictionary)
    {
        words.AddRange(dictionary);
    }

    public bool Search(string searchWord)
    {
        foreach (var word in words)
        {
            if (word.Length != searchWord.Length) continue;

            int diffCount = 0;
            for (int i = 0; i < word.Length; i++)
            {
                if (word[i] != searchWord[i])
                    diffCount++;
            }

            if (diffCount == 1) return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(dictionary.Length * wordLength)` per `Search` call.
- **Space:** `O(total dictionary size)`.
