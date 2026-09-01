# 3003. Maximize the Number of Partitions After Operations

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Bitmask

## Problem

You are given a string `s` and an integer `k`. First, you may change **at most one** character of `s` to any other lowercase English letter (or make no change at all). After that, partition `s` greedily from left to right: repeatedly take the longest possible prefix of the remaining string that contains **at most `k` distinct characters** as the next substring. Return the maximum number of substrings the partition can produce, choosing the optional single-character change to maximize it.

### Example

```
Input: s = "accca", k = 2
Output: 3
Explanation: Changing s[2] to 'b' gives "acbca". Greedy partitioning with at most 2 distinct
characters per piece yields "ac" | "bc" | "a" -> 3 partitions.
```

## Approach

Process the string left to right while tracking, at each position, the bitmask of distinct letters seen in the current (unfinished) piece. Whenever the mask would need a 27th... actually a `(k+1)`-th distinct letter, close the current piece (increment the count) and start a new one with just that letter.

To decide the best single-character change, use memoized recursion over the state `(index, canStillChange, mask)`:

- Without changing the current character, extend/close the running piece using its real letter.
- If a change is still available, try replacing the current character with every one of the 26 letters (only once, ever) and take the best result — this naturally covers "don't change" (already tried) and "change to any letter, closing the change budget."

Memoize on `(index, canStillChange, mask)` since `mask` only has `2^26` states in theory, but in practice is bounded by the letters actually seen, keeping the recursion fast in practice.

## C# Solution

```csharp
public class Solution {
    private Dictionary<long, int> memo = new Dictionary<long, int>();
    private string word = "";
    private int limit;

    public int MaxPartitionsAfterOperations(string s, int k) {
        word = s;
        limit = k;
        memo.Clear();
        return Solve(0, true, 0) + 1;
    }

    // Returns the number of *additional* partition boundaries created after index i,
    // given whether a change is still available and the bitmask of letters in the
    // current open piece.
    private int Solve(int i, bool canChange, int mask) {
        if (i == word.Length)
            return 0;

        long key = ((long)i << 27) | ((canChange ? 1L : 0L) << 26) | (uint)mask;
        if (memo.TryGetValue(key, out int cached))
            return cached;

        int res = ExtendWith(i, canChange, mask, 1 << (word[i] - 'a'));
        if (canChange)
            for (int j = 0; j < 26; j++)
                res = Math.Max(res, ExtendWith(i, false, mask, 1 << j));

        memo[key] = res;
        return res;
    }

    private int ExtendWith(int i, bool nextCanChange, int mask, int newBit) {
        int newMask = mask | newBit;
        if (CountBits(newMask) > limit)
            // The new letter doesn't fit: close the current piece and start a fresh one.
            return 1 + Solve(i + 1, nextCanChange, newBit);
        return Solve(i + 1, nextCanChange, newMask);
    }

    private int CountBits(int mask) {
        int count = 0;
        while (mask != 0) {
            count += mask & 1;
            mask >>= 1;
        }
        return count;
    }
}
```

## Complexity

- Time: O(26 * n) amortized over the memoized states, where n is the length of `s`.
- Space: O(26 * n) for the memoization table.
