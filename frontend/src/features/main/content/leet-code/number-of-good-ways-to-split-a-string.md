# 1525. Number of Good Ways to Split a String

**Difficulty:** Medium
**Category:** String, Bit Manipulation

## Problem

Given a string `s`, count the number of ways to split it into two non-empty substrings `p` and `q` (where `s = p + q`) such that the number of distinct letters in `p` equals the number of distinct letters in `q`.

### Example

```
Input: s = "aacaba"
Output: 2
```

## Approach

Precompute, for every prefix, the number of distinct letters seen so far (using a 26-bit bitmask, since letters can appear multiple times but only distinctness matters), and separately compute the same for every suffix scanning from the right. Then, for each split point, compare the distinct-letter count of the left part with that of the right part.

## C# Solution

```csharp
public class Solution
{
    public int NumSplits(string s)
    {
        int n = s.Length;
        int[] prefixDistinct = new int[n];
        int mask = 0;

        for (int i = 0; i < n; i++)
        {
            mask |= 1 << (s[i] - 'a');
            prefixDistinct[i] = CountBits(mask);
        }

        int[] suffixDistinct = new int[n];
        mask = 0;

        for (int i = n - 1; i >= 0; i--)
        {
            mask |= 1 << (s[i] - 'a');
            suffixDistinct[i] = CountBits(mask);
        }

        int count = 0;
        for (int i = 0; i < n - 1; i++)
        {
            if (prefixDistinct[i] == suffixDistinct[i + 1])
            {
                count++;
            }
        }

        return count;
    }

    private int CountBits(int mask)
    {
        int count = 0;
        while (mask != 0)
        {
            mask &= mask - 1;
            count++;
        }
        return count;
    }
}
```

## Complexity

- **Time:** `O(n)` — a constant amount of work (bounded by 26 bits) per character.
- **Space:** `O(n)` for the prefix and suffix distinct-count arrays.
