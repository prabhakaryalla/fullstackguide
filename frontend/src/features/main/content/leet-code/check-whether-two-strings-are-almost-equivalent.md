# 2068. Check Whether Two Strings are Almost Equivalent

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

Two strings `word1` and `word2` are considered **almost equivalent** if, for every letter, the difference between its frequency in `word1` and its frequency in `word2` is at most `3`. Return `true` if `word1` and `word2` are almost equivalent.

## Approach

Count the frequency of each of the 26 lowercase letters in `word1` (adding) and in `word2` (subtracting) into a single array of net differences. Then check that every entry's absolute value is at most `3`.

## C# Solution

```csharp
public class Solution
{
    public bool CheckAlmostEquivalent(string word1, string word2)
    {
        var diff = new int[26];

        foreach (var c in word1) diff[c - 'a']++;
        foreach (var c in word2) diff[c - 'a']--;

        foreach (var d in diff)
            if (Math.Abs(d) > 3) return false;

        return true;
    }
}
```

## Complexity

- **Time:** `O(n + m)`, the combined lengths of the two strings.
- **Space:** `O(1)` (fixed-size array of 26 letters).
