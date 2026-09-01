# 3499. Maximize Active Section with Trade I

**Difficulty:** Medium
**Category:** String, Enumeration

## Problem
You are given a binary string `s` of length `n`, where `'1'` represents an active section and `'0'` represents an inactive section.

You may perform **at most one trade** to maximize the number of active sections. In a trade, you:
1. Convert a contiguous block of `'1'`s that is surrounded by `'0'`s to all `'0'`s.
2. Afterward, convert a contiguous block of `'0'`s that is surrounded by `'1'`s to all `'1'`s.

Return the maximum number of active sections in `s` after making the optimal trade. (Treat `s` as if augmented with a `'1'` at both ends; the augmented characters do not contribute to the final count.)

### Example
Input: `s = "0100"`
Output: `4`
Explanation: Augmented, `s` becomes `"101001"`. Choosing the `'1'`-block at position 1 (surrounded by `'0'`s) and converting it to `'0'` yields `"100001"`... more directly: converting the interior `1` to `0` merges the two zero-runs into one block of four zeros, which can then all be flipped to `1`, giving `"1111"` (without augmentation) — 4 active sections.

## Approach
Split `s` into maximal runs of `'0'`s. Every interior `'1'` character that sits between two zero-runs is a candidate: converting it to `'0'` and then flipping the whole merged zero-run to `'1'` gains `len(leftZeroRun) + len(rightZeroRun)` new active sections. The best possible gain is therefore the maximum sum of two **adjacent** zero-run lengths. The answer is the original count of `'1'`s plus this maximum gain (or plus 0 if no such pair of adjacent zero-runs exists).

## C# Solution

```csharp
public class Solution {
    public int MaxActiveSectionsAfterTrade(string s) {
        List<int> zeroGroupLengths = new List<int>();
        for (int i = 0; i < s.Length; i++) {
            if (s[i] == '0') {
                if (i > 0 && s[i - 1] == '0')
                    zeroGroupLengths[zeroGroupLengths.Count - 1]++;
                else
                    zeroGroupLengths.Add(1);
            }
        }

        int maxZeroMerge = 0;
        for (int i = 0; i + 1 < zeroGroupLengths.Count; i++)
            maxZeroMerge = Math.Max(maxZeroMerge, zeroGroupLengths[i] + zeroGroupLengths[i + 1]);

        int ones = 0;
        foreach (char c in s) if (c == '1') ones++;

        return ones + maxZeroMerge;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
