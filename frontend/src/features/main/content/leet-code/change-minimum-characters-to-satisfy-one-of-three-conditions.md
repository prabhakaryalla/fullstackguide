# 1737. Change Minimum Characters to Satisfy One of Three Conditions

**Difficulty:** Medium
**Category:** String, Hash Table, Prefix Sum, Counting

## Problem

Given strings `a` and `b`, you may change any character to any lowercase letter. Return the minimum number of changes needed so that one of the following holds: every letter in `a` is strictly less than every letter in `b`; every letter in `b` is strictly less than every letter in `a`; or `a` and `b` both consist of only one (possibly different) letter each — the same letter for both.

### Example

```
Input: a = "aba", b = "caa"
Output: 2
```

## Approach

Count letter frequencies for both strings. For the "make everything the same letter" condition, try every letter `c` and compute the cost of converting all of `a` and `b` to `c`. For the "strict ordering" conditions, use prefix sums over the frequency counts: for each threshold letter `x`, the cost of making all of `a` less than `x` and all of `b` at least `x` (and the symmetric case) can be computed in `O(1)` from the prefix sums.

## C# Solution

```csharp
public class Solution
{
    public int MinCharacters(string a, string b)
    {
        int[] countA = new int[26], countB = new int[26];
        foreach (char c in a) countA[c - 'a']++;
        foreach (char c in b) countB[c - 'a']++;

        int result = int.MaxValue;

        for (int c = 0; c < 26; c++)
            result = Math.Min(result, (a.Length - countA[c]) + (b.Length - countB[c]));

        int[] prefixA = new int[27], prefixB = new int[27];
        for (int i = 0; i < 26; i++)
        {
            prefixA[i + 1] = prefixA[i] + countA[i];
            prefixB[i + 1] = prefixB[i] + countB[i];
        }

        for (int x = 1; x < 26; x++)
        {
            int allALessThanX = (a.Length - prefixA[x]) + prefixB[x];
            result = Math.Min(result, allALessThanX);

            int allBLessThanX = (b.Length - prefixB[x]) + prefixA[x];
            result = Math.Min(result, allBLessThanX);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + m)` where `n = a.Length`, `m = b.Length`.
- **Space:** `O(1)` (fixed-size 26-letter arrays).
