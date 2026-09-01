# 1078. Occurrences After Bigram

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `text` and two strings `first` and `second`, return an array of every third word that immediately follows an occurrence of `first` followed directly by `second` in `text`.

### Example

```
Input: text = "alice is a good girl she is a good student", first = "a", second = "good"
Output: ["girl","student"]
```

## Approach

Split `text` into words by spaces, then scan consecutive triples of words: whenever a triple's first two words match `first` and `second`, the third word is a match to collect.

## C# Solution

```csharp
public class Solution
{
    public string[] FindOcurrences(string text, string first, string second)
    {
        var words = text.Split(' ');
        var result = new List<string>();

        for (int i = 0; i + 2 < words.Length; i++)
        {
            if (words[i] == first && words[i + 1] == second)
            {
                result.Add(words[i + 2]);
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the words.
- **Space:** `O(n)` for the split word array and result.
