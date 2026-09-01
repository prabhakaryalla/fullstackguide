# 500. Keyboard Row

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given an array of strings `words`, return the words that can be typed using letters of the alphabet on only one row of a standard QWERTY American keyboard.

### Example

```
Input: words = ["Hello","Alaska","Dad","Peace"]
Output: ["Alaska","Dad"]
```

### Constraints

- `1 <= words.length <= 20`
- `1 <= words[i].length <= 100`
- `words[i]` consists of English letters (uppercase and lowercase).

## Approach

Precompute which of the three keyboard rows each letter belongs to. For each word (case-insensitive), determine the row of its first letter, then verify every other letter in the word belongs to that same row.

## C# Solution

```csharp
public class Solution
{
    public string[] FindWords(string[] words)
    {
        var rows = new[]
        {
            "qwertyuiop",
            "asdfghjkl",
            "zxcvbnm"
        };

        var rowIndex = new int[26];
        for (int i = 0; i < rows.Length; i++)
            foreach (var c in rows[i])
                rowIndex[c - 'a'] = i;

        var result = new List<string>();

        foreach (var word in words)
        {
            var lower = word.ToLowerInvariant();
            int row = rowIndex[lower[0] - 'a'];

            if (lower.All(c => rowIndex[c - 'a'] == row))
                result.Add(word);
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(total characters across all words)`.
- **Space:** `O(n)` for the result list.
