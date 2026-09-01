# 524. Longest Word in Dictionary through Deleting

**Difficulty:** Medium
**Category:** Array, Two Pointers, String, Sorting

## Problem

Given a string `s` and a string array `dictionary`, return the longest string in `dictionary` that can be formed by deleting some characters of `s`. If more than one such string exists, return the longest one with the smallest lexicographical order; if no such string exists, return the empty string.

### Example

```
Input: s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
Output: "apple"
```

### Constraints

- `1 <= s.length <= 1000`
- `1 <= dictionary.length <= 1000`
- `1 <= dictionary[i].length <= 1000`

## Approach

For each dictionary word, check whether it is a subsequence of `s` using a simple two-pointer scan. Among all qualifying words, keep the one that is longest, breaking ties by lexicographically smaller order.

## C# Solution

```csharp
public class Solution
{
    public string FindLongestWord(string s, IList<string> dictionary)
    {
        string best = "";

        foreach (var word in dictionary)
        {
            if (IsSubsequence(word, s))
            {
                if (word.Length > best.Length || (word.Length == best.Length && string.CompareOrdinal(word, best) < 0))
                    best = word;
            }
        }

        return best;
    }

    private bool IsSubsequence(string word, string s)
    {
        int i = 0;
        foreach (var c in s)
        {
            if (i < word.Length && word[i] == c) i++;
        }

        return i == word.Length;
    }
}
```

## Complexity

- **Time:** `O(n * L)`, where `n` is the number of dictionary words and `L` is the length of `s`.
- **Space:** `O(1)` extra.
