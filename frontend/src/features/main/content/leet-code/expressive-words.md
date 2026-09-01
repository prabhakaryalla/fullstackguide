# 809. Expressive Words

**Difficulty:** Medium
**Category:** Array, Two Pointers, String

## Problem

A string is "stretchy" if it can be formed from a given word by extending groups of adjacent identical letters (each extended group must end up with 3 or more of that letter). Given a string `s` and an array of `words`, return how many words in `words` can be stretched to become `s`.

### Example

```
Input: s = "heeellooo", words = ["hello", "hi", "helo"]
Output: 1
```

## Approach

Compress both `s` and each candidate word into runs of `(character, count)` pairs. A word can stretch into `s` only if both have the same number of runs, the characters at each run position match, and for each run, either the counts are equal, or `s`'s run count is strictly greater than the word's run count and is at least 3 (satisfying the "extended to 3 or more" rule).

## C# Solution

```csharp
public class Solution
{
    public int ExpressiveWords(string s, string[] words)
    {
        var sGroups = GetGroups(s);
        int count = 0;

        foreach (var word in words)
        {
            var wordGroups = GetGroups(word);

            if (IsStretchy(sGroups, wordGroups))
                count++;
        }

        return count;
    }

    private List<(char Char, int Count)> GetGroups(string s)
    {
        var groups = new List<(char, int)>();
        int i = 0;

        while (i < s.Length)
        {
            int j = i;
            while (j < s.Length && s[j] == s[i]) j++;
            groups.Add((s[i], j - i));
            i = j;
        }

        return groups;
    }

    private bool IsStretchy(List<(char Char, int Count)> sGroups, List<(char Char, int Count)> wordGroups)
    {
        if (sGroups.Count != wordGroups.Count) return false;

        for (int i = 0; i < sGroups.Count; i++)
        {
            var (sc, scount) = sGroups[i];
            var (wc, wcount) = wordGroups[i];

            if (sc != wc) return false;

            if (scount == wcount) continue;

            if (scount < wcount) return false;

            if (scount < 3) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n * L)`, where `L` is the average word length.
- **Space:** `O(L)` for the group lists.
