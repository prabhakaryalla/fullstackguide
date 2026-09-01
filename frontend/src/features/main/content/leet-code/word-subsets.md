# 916. Word Subsets

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given two arrays of strings `words1` and `words2`, a word `a` from `words1` is *universal* if every word `b` in `words2` is a subset of `a` (each letter appears in `a` at least as many times as in `b`). Return all universal words in `words1`.

### Example

```
Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
Output: ["facebook","google","leetcode"]
```

## Approach

Merge all of `words2` into a single "maximum requirement" letter-frequency array by taking, for each letter, the maximum count required by any single word in `words2`. A word in `words1` is universal exactly when its own letter counts meet that combined requirement.

## C# Solution

```csharp
public class Solution
{
    public IList<string> WordSubsets(string[] words1, string[] words2)
    {
        var maxReq = new int[26];

        foreach (var w in words2)
        {
            var cnt = CountLetters(w);
            for (int i = 0; i < 26; i++) maxReq[i] = Math.Max(maxReq[i], cnt[i]);
        }

        var result = new List<string>();

        foreach (var w in words1)
        {
            var cnt = CountLetters(w);
            bool ok = true;

            for (int i = 0; i < 26; i++)
            {
                if (cnt[i] < maxReq[i]) { ok = false; break; }
            }

            if (ok) result.Add(w);
        }

        return result;
    }

    private int[] CountLetters(string w)
    {
        var cnt = new int[26];
        foreach (var c in w) cnt[c - 'a']++;
        return cnt;
    }
}
```

## Complexity

- **Time:** `O((|words1| + |words2|) * L)` where `L` is average word length.
- **Space:** `O(1)` beyond the fixed 26-letter arrays.
