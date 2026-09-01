# 3039. Apply Operations to Make String Empty

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Counting, Sorting

## Problem

You are given a string `s`. In one operation, scan `s` from left to right and remove the **first** occurrence of every distinct character that still remains (so each distinct character present at the start of the operation loses exactly one occurrence, in left-to-right order of first appearance). Repeat this operation until `s` becomes empty. Return the string right **before** the final operation that empties it (i.e., the last non-empty state of `s`).

### Example

```
Input: s = "aabcbbca"
Output: "ba"
Explanation: After enough operations peeling off one occurrence of each remaining distinct character
at a time, the characters with the highest original frequency survive the longest, and among those,
the one appearing later in the original string survives one operation longer.
```

## Approach

Each operation removes exactly one occurrence of every character still present, so a character with frequency `f` survives exactly `f` operations before disappearing entirely. The characters with the **maximum** frequency are therefore the only ones present in the very last non-empty state, and among same-frequency characters, whichever one appears **later** in the original string is removed later within that final round (since removal within one operation still proceeds left to right).

Count each character's total frequency, find the maximum frequency, then scan `s` from right to left, greedily collecting characters whose remaining count (decremented as we scan) equals the maximum frequency — these are exactly the ones still present in the last surviving round, in their original left-to-right relative order once the collected list is reversed back.

## C# Solution

```csharp
public class Solution {
    public string LastNonEmptyString(string s) {
        int[] count = new int[26];
        foreach (char c in s)
            count[c - 'a']++;

        int maxFreq = count.Max();
        var chars = new List<char>();
        for (int i = s.Length - 1; i >= 0; i--)
            if (count[s[i] - 'a']-- == maxFreq)
                chars.Add(s[i]);

        chars.Reverse();
        return new string(chars.ToArray());
    }
}
```

## Complexity

- Time: O(n) — one pass to count, one pass to build the result.
- Space: O(1) — the count array has a fixed size of 26 (result size is bounded by input length).
