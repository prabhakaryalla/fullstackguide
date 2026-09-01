# 3037. Find Pattern in Infinite Stream II

**Difficulty:** Hard
**Category:** Array, Two Pointers, String Matching

## Problem

This is the larger-constraints version of [Find Pattern in Infinite Stream I](find-pattern-in-infinite-stream-i.md): given an `InfiniteStream` yielding bits one at a time via `Next()`, and a `pattern` array of `0`s and `1`s (now potentially much longer), return the starting index of the first occurrence of `pattern` in the stream.

## Approach

The streaming KMP approach from Part I already reads each stream bit at most once and does O(1) amortized work per bit (via the pattern's failure function), so it already meets the tighter constraints without any changes.

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
