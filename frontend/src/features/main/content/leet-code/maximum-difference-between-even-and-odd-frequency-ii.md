# 3445. Maximum Difference Between Even and Odd Frequency II

**Difficulty:** Hard
**Category:** Hash Table, String, Sliding Window, Prefix Sum

## Problem
Given a string `s` and an integer `k`, consider all substrings of `s` with length at least `k`. For each substring, let `a` be the character with an odd frequency that has the maximum frequency, and `b` be the character with an even (and non-zero) frequency that has the minimum frequency. Return the maximum possible value of `freq(a) - freq(b)` over all valid substrings and all digit pairs `(a, b)` with `a != b`. Only digits `0-4` appear in `s`.

## Approach
For each ordered pair of distinct digits `(a, b)` (at most 5*4 = 20 pairs), find the substring of length >= k that maximizes `count(a) - count(b)` subject to `count(a)` odd and `count(b)` even and positive. Encode a running prefix difference `diff = countA - countB` at each prefix index, and separately track parity of `countA` and `countB`. For a fixed pair, iterate prefix index `j` as the substring end, and maintain the best `diff` value at a valid earlier prefix `i` (with `j - i >= k` and matching required parity combination), using a small state machine keyed by `(parityA, parityB)` to track the minimum prefix diff seen so far for each parity state, updated with a delay of `k` positions to satisfy the length constraint.

## C# Solution

```csharp
public class Solution 
{
    public int MaxDifference(string s, int k) 
    {
        int best = int.MinValue;

        for (int a = 0; a < 5; a++)
        {
            for (int b = 0; b < 5; b++)
            {
                if (a == b) continue;
                int result = SolveForPair(s, k, (char)('0' + a), (char)('0' + b));
                if (result > best) best = result;
            }
        }

        return best;
    }

    // For fixed digits a (must end with odd count) and b (must end with even, positive count),
    // find max over substrings of length >= k of (countA - countB) in that substring.
    private int SolveForPair(string s, int k, char a, char b)
    {
        int n = s.Length;
        int best = int.MinValue;

        // minVal[pa][pb] = minimum running prefix diff (countA - countB) seen so far
        // among prefixes whose parity state is (pa, pb) and that are "available"
        // (i.e., at least k characters before the current position).
        int[,] minVal = new int[2, 2];
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                minVal[i, j] = int.MaxValue;

        int countA = 0, countB = 0;

        for (int j = 1; j <= n; j++)
        {
            char c = s[j - 1];
            if (c == a) countA++;
            else if (c == b) countB++;

            int availableIndex = j - k; // prefix length that can be used as a left boundary
            if (availableIndex >= 0)
            {
                // recompute the prefix state at availableIndex and register it
                int ca = 0, cb = 0;
                for (int t = 0; t < availableIndex; t++)
                {
                    if (s[t] == a) ca++;
                    else if (s[t] == b) cb++;
                }
                int pa = ca % 2, pb = cb % 2;
                int diff = ca - cb;
                if (diff < minVal[pa, pb]) minVal[pa, pb] = diff;
            }

            int curDiff = countA - countB;
            int curPa = countA % 2, curPb = countB % 2;

            // Need left prefix parity (pa0, pb0) such that:
            // (curPa - pa0) mod 2 == 1  -> a ends odd in substring
            // (curPb - pb0) mod 2 == 0  -> b ends even in substring
            for (int pa0 = 0; pa0 < 2; pa0++)
            {
                for (int pb0 = 0; pb0 < 2; pb0++)
                {
                    bool aOdd = ((curPa - pa0 + 2) % 2) == 1;
                    bool bEven = ((curPb - pb0 + 2) % 2) == 0;
                    if (aOdd && bEven && minVal[pa0, pb0] != int.MaxValue)
                    {
                        int candidate = curDiff - minVal[pa0, pb0];
                        if (candidate > best) best = candidate;
                    }
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(20 * n^2) worst case due to prefix recomputation per position; the intended optimal solution maintains running counters to achieve O(n) per pair (O(n) overall since the digit alphabet size is a small constant)
- **Space:** O(1) auxiliary per pair
