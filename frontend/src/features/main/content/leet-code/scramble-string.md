# 87. Scramble String

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

We can scramble a string `s` recursively by splitting it into two non-empty substrings at a random index, then optionally swapping the two resulting substrings, and recursively scrambling each part further. Given two strings `s1` and `s2` of the same length, return `true` if `s2` is a scrambled string of `s1`.

### Example 1

```
Input: s1 = "great", s2 = "rgeat"
Output: true
Explanation: "great" splits into "gr"/"eat", swap to "eat"/"gr" -> no; but "great" -> "gr"/"eat", and scrambling "gr" -> "rg" gives "rg"/"eat" = "rgeat".
```

### Example 2

```
Input: s1 = "abcde", s2 = "caebd"
Output: false
```

### Constraints

- `s1.length == s2.length`
- `1 <= s1.length <= 30`
- `s1` and `s2` consist of lowercase English letters.

## Approach

Use memoized recursion: two strings of length `n` are scrambles of each other if, for some split point `i`, either (a) the first `i` characters of each are scrambles of each other and the remaining characters are too (no swap), or (b) the first `i` characters of `s1` are a scramble of the **last** `i` characters of `s2` and vice versa (swap occurred). A quick character-count check prunes obviously mismatched substrings before recursing. Memoize on `(s1, s2)` substring pairs to avoid recomputation.

## C# Solution

```csharp
public class Solution
{
    private readonly Dictionary<string, bool> memo = new();

    public bool IsScramble(string s1, string s2)
    {
        if (s1 == s2) return true;
        if (s1.Length != s2.Length) return false;

        string key = s1 + "#" + s2;
        if (memo.TryGetValue(key, out bool cached)) return cached;

        if (!HasSameCharacters(s1, s2))
        {
            memo[key] = false;
            return false;
        }

        int n = s1.Length;
        for (int i = 1; i < n; i++)
        {
            // no swap
            if (IsScramble(s1[..i], s2[..i]) && IsScramble(s1[i..], s2[i..]))
            {
                memo[key] = true;
                return true;
            }

            // swap
            if (IsScramble(s1[..i], s2[(n - i)..]) && IsScramble(s1[i..], s2[..(n - i)]))
            {
                memo[key] = true;
                return true;
            }
        }

        memo[key] = false;
        return false;
    }

    private bool HasSameCharacters(string a, string b)
    {
        var counts = new int[26];
        foreach (char c in a) counts[c - 'a']++;
        foreach (char c in b) counts[c - 'a']--;
        return counts.All(count => count == 0);
    }
}
```

## Complexity

- **Time:** `O(n^4)` — `O(n^2)` distinct substring pairs, each doing `O(n)` split work (memoized).
- **Space:** `O(n^3)` — for the memoization dictionary keyed by substring pairs.
