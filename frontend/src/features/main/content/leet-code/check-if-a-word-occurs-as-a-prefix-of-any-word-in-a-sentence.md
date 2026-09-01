# 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence

**Difficulty:** Easy
**Category:** String

## Problem

Given a `sentence` of space-separated words and a `searchWord`, return the (1-indexed) position of the first word in `sentence` that has `searchWord` as a prefix, or `-1` if none does.

### Example

```
Input: sentence = "i love eating burger", searchWord = "burg"
Output: 4
```

## Approach

Split the sentence into words and check each one in order for whether it starts with `searchWord`, returning the 1-indexed position of the first match.

## C# Solution

```csharp
public class Solution
{
    public int IsPrefixOfWord(string sentence, string searchWord)
    {
        var words = sentence.Split(' ');

        for (int i = 0; i < words.Length; i++)
            if (words[i].StartsWith(searchWord, StringComparison.Ordinal))
                return i + 1;

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the total length of the sentence.
- **Space:** `O(w)` for the split words array.
