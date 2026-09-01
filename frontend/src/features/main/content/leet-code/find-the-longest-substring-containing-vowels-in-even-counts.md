# 1371. Find the Longest Substring Containing Vowels in Even Counts

**Difficulty:** Medium
**Category:** Hash Table, String, Bit Manipulation, Prefix Sum

## Problem

Given a string `s`, return the length of the longest substring in which every vowel (`a`, `e`, `i`, `o`, `u`) appears an even number of times.

### Example

```
Input: s = "eleetminicoworoxie"
Output: 13
```

## Approach

Track the parity of each vowel's count so far as a 5-bit bitmask, flipping the relevant bit as each character is processed. A substring `[l+1, r]` has all-even vowel counts exactly when the bitmask at `r` equals the bitmask at `l`, so record the first index at which each bitmask value occurred and, whenever a bitmask repeats, compute the length of the gap since its first occurrence.

## C# Solution

```csharp
public class Solution
{
    public int FindTheLongestSubstring(string s)
    {
        var firstSeen = new int[32];
        Array.Fill(firstSeen, -2);
        firstSeen[0] = -1;

        var vowelBit = new Dictionary<char, int> { ['a'] = 1, ['e'] = 2, ['i'] = 4, ['o'] = 8, ['u'] = 16 };

        int mask = 0, best = 0;
        for (int i = 0; i < s.Length; i++)
        {
            if (vowelBit.TryGetValue(s[i], out int bit)) mask ^= bit;

            if (firstSeen[mask] == -2) firstSeen[mask] = i;
            else best = Math.Max(best, i - firstSeen[mask]);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` — 32 possible bitmask states.
