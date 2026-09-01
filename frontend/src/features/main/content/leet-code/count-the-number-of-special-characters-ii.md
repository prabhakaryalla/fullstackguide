# 3121. Count the Number of Special Characters II

**Difficulty:** Medium
**Category:** Hash Table, String

## Problem

This is a stricter variant of [Count the Number of Special Characters I](count-the-number-of-special-characters-i.md): given a string `word`, a letter is "special" if it appears in both lowercase and uppercase forms, **and** every lowercase occurrence of that letter appears before the first uppercase occurrence (i.e., once the uppercase form shows up, no more lowercase occurrences of that letter may appear afterward). Return the number of special letters.

## Approach

Scan the string once. For each lowercase letter encountered, mark it as valid only if its uppercase counterpart hasn't appeared yet — if the uppercase version has already been seen, this later lowercase occurrence violates the ordering rule, so explicitly invalidate that letter's lowercase flag (never re-validate it, since any future check would still see the uppercase flag set). For an uppercase letter, simply mark that its uppercase form has appeared. At the end, count letters where both the lowercase flag and uppercase flag ended up `true`.

## C# Solution

```csharp
public class Solution {
    public int NumberOfSpecialChars(string word) {
        bool[] lower = new bool[26];
        bool[] upper = new bool[26];

        foreach (char c in word) {
            if (char.IsLower(c))
                lower[c - 'a'] = !upper[c - 'a'];
            else
                upper[c - 'A'] = true;
        }

        int ans = 0;
        for (int i = 0; i < 26; i++)
            if (lower[i] && upper[i])
                ans++;

        return ans;
    }
}
```

## Complexity

- Time: O(n) — one pass over `word`, plus a fixed 26-slot scan.
- Space: O(1) — two fixed 26-slot boolean arrays.
