# 1930. Unique Length-3 Palindromic Subsequences

**Difficulty:** Medium
**Category:** Hash Table, String, Bitmask

## Problem

Given a string `s`, return the number of unique palindromic subsequences of length 3 (subsequences `s[i], s[j], s[k]` with `i < j < k` and `s[i] == s[k]`; the middle character can be anything). Count each distinct 3-character palindrome string only once, regardless of how many index triples produce it.

### Example

```
Input: s = "aabca"
Output: 3
Explanation: The unique palindromic subsequences of length 3 are "aba", "aaa", and "aca".
```

### Constraints

- `3 <= s.length <= 10^5`
- `s` consists of lowercase English letters only.

## Approach

For each of the 26 possible outer letters `c`, find the first and last occurrence of `c` in `s`. If there is at least one character strictly between them, every distinct letter appearing in that middle range forms a unique palindrome `c + middle + c`. Collect those distinct middle letters (via a bitmask or hash set over the substring between the first and last occurrence of `c`) and add their count to the answer.

## C# Solution

```csharp
public class Solution
{
    public int CountPalindromicSubsequence(string s)
    {
        int n = s.Length;
        int[] first = new int[26];
        int[] last = new int[26];
        Array.Fill(first, -1);
        Array.Fill(last, -1);

        for (int i = 0; i < n; i++)
        {
            int idx = s[i] - 'a';
            if (first[idx] == -1) first[idx] = i;
            last[idx] = i;
        }

        int total = 0;
        for (int c = 0; c < 26; c++)
        {
            if (first[c] == -1 || last[c] - first[c] < 2) continue;

            int mask = 0;
            for (int i = first[c] + 1; i < last[c]; i++)
            {
                mask |= 1 << (s[i] - 'a');
            }

            total += CountSetBits(mask);
        }

        return total;
    }

    private int CountSetBits(int mask)
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

- **Time:** `O(26 * n)` — scanning the middle range for each of the 26 possible outer letters.
- **Space:** `O(1)` beyond the fixed-size first/last arrays.
