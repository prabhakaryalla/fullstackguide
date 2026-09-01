# 953. Verifying an Alien Dictionary

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given a list of `words` and an `order` string representing the alphabet order of a made-up alien language, return `true` if `words` are sorted lexicographically according to that alien alphabet.

### Example

```
Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
```

## Approach

Build a rank lookup from the alien `order` string. Compare each adjacent pair of words: scan character by character using the alien ranks, and the first differing character determines order; if one word is a prefix of the other, the shorter one must come first.

## C# Solution

```csharp
public class Solution
{
    public bool IsAlienSorted(string[] words, string order)
    {
        var rank = new int[26];
        for (int i = 0; i < order.Length; i++) rank[order[i] - 'a'] = i;

        for (int i = 1; i < words.Length; i++)
        {
            if (!InOrder(words[i - 1], words[i], rank)) return false;
        }

        return true;
    }

    private bool InOrder(string a, string b, int[] rank)
    {
        int n = Math.Min(a.Length, b.Length);

        for (int i = 0; i < n; i++)
        {
            if (a[i] != b[i]) return rank[a[i] - 'a'] < rank[b[i] - 'a'];
        }

        return a.Length <= b.Length;
    }
}
```

## Complexity

- **Time:** `O(total characters)`.
- **Space:** `O(1)` beyond the fixed rank array.
