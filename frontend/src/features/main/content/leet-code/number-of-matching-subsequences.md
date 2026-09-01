# 792. Number of Matching Subsequences

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting, Binary Search, Two Pointers

## Problem

Given a string `s` and an array of `words`, return the number of words in `words` that are subsequences of `s`.

### Example

```
Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
```

## Approach

Group every word into a bucket keyed by the next character it needs to match, initially its first character. Scan through `s` once; for each character encountered, process every word currently waiting on that character: advance each word's matching pointer by one, and if the word is fully matched, count it as a valid subsequence, otherwise move it into the bucket for its new next required character. This single pass over `s` (rather than scanning `s` separately for each word) efficiently handles many words at once.

## C# Solution

```csharp
public class Solution
{
    public int NumMatchingSubseq(string s, string[] words)
    {
        var buckets = new List<(string Word, int Index)>[26];
        for (int i = 0; i < 26; i++)
            buckets[i] = new List<(string, int)>();

        foreach (var word in words)
            buckets[word[0] - 'a'].Add((word, 0));

        int count = 0;

        foreach (var c in s)
        {
            var current = buckets[c - 'a'];
            buckets[c - 'a'] = new List<(string, int)>();

            foreach (var (word, index) in current)
            {
                int nextIndex = index + 1;

                if (nextIndex == word.Length)
                {
                    count++;
                }
                else
                {
                    buckets[word[nextIndex] - 'a'].Add((word, nextIndex));
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(s.Length + total word length)`.
- **Space:** `O(total word length)` for the buckets.
