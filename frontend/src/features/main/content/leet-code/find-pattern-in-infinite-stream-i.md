# 3023. Find Pattern in Infinite Stream I

**Difficulty:** Medium
**Category:** Array, Two Pointers, String Matching

## Problem

You are given an `InfiniteStream` that yields one bit (`0` or `1`) at a time via `Next()`, forever, and a `pattern` array of `0`s and `1`s. Return the starting index (0-indexed, counted from the first bit ever read) of the first occurrence of `pattern` as a contiguous subsequence of the stream. It is guaranteed that the pattern eventually appears.

## Approach

This is streaming Knuth–Morris–Pratt: since the stream can only be read forward and never rewound, use the pattern's failure function (`lps` table) so that on a mismatch we never need to "un-read" a bit — we simply shrink the matched prefix length `j` and re-test the **same** bit against the shorter prefix, only pulling a new bit from the stream once a bit has been fully consumed (either it extended a match, or it was rejected outright with `j == 0`).

## C# Solution

```csharp
/**
 * Definition for an infinite stream.
 * public interface InfiniteStream {
 *     public int Next();
 * }
 */
public class Solution {
    public int FindPattern(InfiniteStream stream, int[] pattern) {
        int[] lps = GetLps(pattern);
        int i = 0, j = 0, bit = 0;
        bool haveBit = false;

        while (true) {
            if (!haveBit) {
                bit = stream.Next();
                haveBit = true;
            }
            if (bit == pattern[j]) {
                i++;
                haveBit = false;
                j++;
                if (j == pattern.Length)
                    return i - j;
            } else if (j > 0) {
                j = lps[j - 1];
            } else {
                i++;
                haveBit = false;
            }
        }
    }

    private int[] GetLps(int[] pattern) {
        int[] lps = new int[pattern.Length];
        for (int i = 1, j = 0; i < pattern.Length; i++) {
            while (j > 0 && pattern[j] != pattern[i])
                j = lps[j - 1];
            if (pattern[i] == pattern[j])
                lps[i] = ++j;
        }
        return lps;
    }
}
```

## Complexity

- Time: O(n + m) — n bits read from the stream until the match is found, m for building the LPS table.
- Space: O(m) — the LPS table.
