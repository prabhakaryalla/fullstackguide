# 3104. Find Longest Self-Contained Substring

**Difficulty:** Hard
**Category:** Hash Table, String, Sliding Window, Sorting

## Problem

Given a string `s`, a substring is "self-contained" if none of the characters it contains appear anywhere else in `s` outside of that substring (i.e., every occurrence of every letter used in the substring is fully contained within it) — and the substring is not the entire string `s`. Return the length of the longest self-contained substring, or `-1` if none exists.

## Approach

For a substring to be self-contained with exactly `n` distinct letters, it must be a window containing exactly `n` unique letters, **and** for each of those letters, every one of its occurrences in the whole string must fall inside the window. Try every possible target unique-letter-count `n` from `1` to `26`; for each, slide a window tracking the number of unique letters currently inside and how many of those letters have *all* their occurrences captured by the window (compared against the global frequency count). A window is valid exactly when both counts equal `n` (and the window isn't the entire string). Take the best window length across all `n`.

## C# Solution

```csharp
public class Solution {
    public int MaxSubstringLength(string s) {
        int ans = -1;
        int[] allCount = new int[26];
        foreach (char c in s)
            allCount[c - 'a']++;

        for (int uniqueTarget = 1; uniqueTarget <= 26; uniqueTarget++)
            ans = Math.Max(ans, MaxSubstringLengthWithNUniqueLetters(s, uniqueTarget, allCount));

        return ans;
    }

    private int MaxSubstringLengthWithNUniqueLetters(string s, int n, int[] allCount) {
        int res = -1;
        int uniqueLetters = 0;
        int lettersHavingAllFreq = 0;
        int[] count = new int[26];

        for (int l = 0, r = 0; r < s.Length; r++) {
            int rc = s[r] - 'a';
            if (++count[rc] == 1)
                uniqueLetters++;
            if (count[rc] == allCount[rc])
                lettersHavingAllFreq++;

            while (uniqueLetters > n) {
                int lc = s[l] - 'a';
                if (count[lc] == allCount[lc])
                    lettersHavingAllFreq--;
                if (--count[lc] == 0)
                    uniqueLetters--;
                l++;
            }

            if (lettersHavingAllFreq == n && r - l + 1 < s.Length)
                res = Math.Max(res, r - l + 1);
        }

        return res;
    }
}
```

## Complexity

- Time: O(26 * n) — 26 sliding-window passes over the string.
- Space: O(1) — the fixed 26-slot frequency arrays.
