# 1347. Minimum Number of Steps to Make Two Strings Anagram

**Difficulty:** Medium
**Category:** Hash Table, String, Counting

## Problem

Given two strings `s` and `t` of equal length, return the minimum number of characters to replace in `t` so it becomes an anagram of `s`.

### Example

```
Input: s = "bab", t = "aba"
Output: 1
```

## Approach

Count the frequency of each letter in both strings. The number of replacements needed equals the sum, over every letter, of how many more times it appears in `s` than in `t` (only counting the positive surplus) — those surplus letters in `s` are exactly what's missing from `t` and must be created by replacing extra letters.

## C# Solution

```csharp
public class Solution
{
    public int MinSteps(string s, string t)
    {
        var countS = new int[26];
        var countT = new int[26];

        foreach (char c in s) countS[c - 'a']++;
        foreach (char c in t) countT[c - 'a']++;

        int steps = 0;
        for (int i = 0; i < 26; i++)
        {
            steps += Math.Max(0, countS[i] - countT[i]);
        }

        return steps;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — fixed-size 26-letter counts.
