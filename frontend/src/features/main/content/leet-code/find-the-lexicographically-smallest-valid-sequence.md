# 3302. Find the Lexicographically Smallest Valid Sequence

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Greedy

## Problem

You are given two strings `word1` and `word2`. A valid sequence is an array of indices `seq` of length equal to `word2.Length`, strictly increasing, such that `word2` matches `word1[seq[0]], word1[seq[1]], ...` in every position except at most one (i.e., `word2` can differ from the selected subsequence of `word1` in at most one character). Return the lexicographically smallest valid sequence of indices, or an empty array if none exists.

### Example

```
Input: word1 = "vbcca", word2 = "abc"
Output: [0,1,2]
```

## Approach

Precompute, for every starting position `i` in `word1`, the maximum number of trailing characters of `word2` (i.e., the longest suffix of `word2`) that can be matched exactly as a subsequence using `word1[i:]`. This is computed backward: `suffixMatch[i] = suffixMatch[i+1] + 1` if `word1[i]` equals the next needed character from the end of `word2`, otherwise `suffixMatch[i] = suffixMatch[i+1]`. Then greedily scan `word1` and `word2` with two pointers, always preferring to advance without using the one allowed mismatch. When characters differ, use the mismatch at the current position only if it hasn't been used yet and the remaining suffix of `word2` can still be matched exactly using the remaining suffix of `word1` (checked via the precomputed table); this guarantees the smallest possible index is chosen at each step of `word2`.

## C# Solution

```csharp
public class Solution 
{
    public int[] ValidSequence(string word1, string word2) 
    {
        int n = word1.Length;
        int m = word2.Length;

        int[] suffixMatch = new int[n + 1];
        suffixMatch[n] = 0;

        for (int i = n - 1; i >= 0; i--) 
        {
            int matched = suffixMatch[i + 1];
            if (matched < m && word1[i] == word2[m - matched - 1]) 
            {
                matched++;
            }
            suffixMatch[i] = matched;
        }

        int[] result = new int[m];
        int i2 = 0, j2 = 0;
        bool usedChange = false;

        while (j2 < m) 
        {
            if (i2 >= n) return Array.Empty<int>();

            if (word1[i2] == word2[j2]) 
            {
                result[j2] = i2;
                i2++;
                j2++;
            } 
            else if (!usedChange && suffixMatch[i2 + 1] >= m - (j2 + 1)) 
            {
                result[j2] = i2;
                usedChange = true;
                i2++;
                j2++;
            } 
            else 
            {
                i2++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n + m)
- **Space:** O(n)
