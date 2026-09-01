# 3306. Count of Substrings Containing Every Vowel and K Consonants II

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

You are given a string `word` and a non-negative integer `k`.

Return the total number of substrings of `word` that contain every vowel (`'a'`, `'e'`, `'i'`, `'o'`, and `'u'`) at least once and exactly `k` consonants.

### Example

Input: `word = "ieaouqqieaouqq", k = 1`

Output: `3`

Explanation: The substrings with every vowel and exactly one consonant are `word[0..5]` = `"ieaouq"`, `word[6..11]` = `"qieaou"`, and `word[7..12]` = `"ieaouq"`.

## Approach

This is the large-constraint version of the same problem, requiring an O(n) sliding window instead of brute force.

Use the classic "exactly K" = "at most K" − "at most K−1" trick. Define `AtMost(k)` as the number of substrings that contain all 5 vowels and **at most** `k` consonants.

To compute `AtMost(k)` in O(n): slide `right` across the string while maintaining:
- `consonantCount`, the number of consonants in the current window `[lo, right]`, shrinking `lo` from the left whenever `consonantCount` exceeds `k`.
- `last[v]`, the last seen index of each vowel `v` up to `right`.

For a fixed `right`, the largest valid left endpoint that still keeps all 5 vowels in range is `minLast = min(last[v])` over all vowels (or invalid if some vowel hasn't appeared yet). Every left index in `[lo, minLast]` produces a substring ending at `right` that satisfies both constraints, contributing `minLast - lo + 1` to the total (when non-negative).

## C# Solution

```csharp
public class Solution 
{
    public long CountOfSubstrings(string word, int k) 
    {
        return AtMost(word, k) - AtMost(word, k - 1);
    }

    private long AtMost(string word, int k) 
    {
        if (k < 0) return 0;

        int n = word.Length;
        int[] last = new int[5];
        for (int i = 0; i < 5; i++) last[i] = -1;

        int lo = 0;
        int consonantCount = 0;
        long total = 0;

        for (int right = 0; right < n; right++)
        {
            char c = word[right];
            int vIdx = "aeiou".IndexOf(c);
            if (vIdx >= 0)
            {
                last[vIdx] = right;
            }
            else
            {
                consonantCount++;
            }

            while (consonantCount > k)
            {
                char lc = word[lo];
                if ("aeiou".IndexOf(lc) < 0) consonantCount--;
                lo++;
            }

            int minLast = last[0];
            for (int i = 1; i < 5; i++)
            {
                if (last[i] < minLast) minLast = last[i];
            }

            if (minLast == -1) continue;
            if (minLast >= lo) total += minLast - lo + 1;
        }

        return total;
    }
}
```

## Complexity

- **Time:** O(n) per call to `AtMost`, so O(n) overall.
- **Space:** O(1) extra space.
