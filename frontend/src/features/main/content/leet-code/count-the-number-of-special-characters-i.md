# 3120. Count the Number of Special Characters I

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given a string `word`, a letter is "special" if it appears in `word` in both its lowercase and uppercase forms. Return the number of special letters in `word`.

### Example

```
Input: word = "aaAbcBC"
Output: 3
Explanation: 'a' occurs as both 'a' and 'A'; 'b' occurs as both 'b' and 'B'; 'c' occurs as both 'c' and 'C'.
```

## Approach

Track which lowercase letters appear and which uppercase letters appear in two 26-slot boolean arrays. After scanning the string once, count how many letters have both their lowercase and uppercase flags set.

## C# Solution

```csharp
public class Solution {
    public int NumberOfSpecialChars(string word) {
        bool[] lower = new bool[26];
        bool[] upper = new bool[26];

        foreach (char c in word) {
            if (char.IsLower(c))
                lower[c - 'a'] = true;
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
