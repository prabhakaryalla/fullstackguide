# 820. Short Encoding of Words

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Trie

## Problem

A valid encoding of an array of `words` is a reference string formed by concatenating each word followed by `#`, such that every word can be found by starting at some index and reading until the next `#`. Return the length of the shortest possible valid encoding.

### Example

```
Input: words = ["time", "me", "bell"]
Output: 10
```

## Approach

A word never needs its own separate entry in the encoding if it is a suffix of another word in the list, since it can be read starting partway through that longer word's encoding. Put all words into a hash set, then for every word, remove every one of its proper suffixes from the set (since those suffixes are now known to be "absorbable" into this longer word). The remaining words in the set are exactly those needed in the final encoding; sum each one's length plus one (for its trailing `#`).

## C# Solution

```csharp
public class Solution
{
    public int MinimumLengthEncoding(string[] words)
    {
        var wordSet = new HashSet<string>(words);

        foreach (var word in words)
        {
            for (int i = 1; i < word.Length; i++)
            {
                wordSet.Remove(word.Substring(i));
            }
        }

        int total = 0;
        foreach (var word in wordSet)
            total += word.Length + 1;

        return total;
    }
}
```

## Complexity

- **Time:** `O(n * L^2)` in the worst case, due to substring operations.
- **Space:** `O(n * L)` for the word set.
