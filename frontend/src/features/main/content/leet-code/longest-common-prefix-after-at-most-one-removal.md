# 3460. Longest Common Prefix After at Most One Removal

**Difficulty:** Hard
**Category:** String, Trie, Hashing
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given two strings `s` and `t`, you may remove at most one character from `s` (or none). Return the length of the longest common prefix between the resulting string and `t` that can be achieved by choosing the best character to remove (or removing none).

## Approach
First compute `baseLen`, the length of the common prefix of `s` and `t` without any removal. If we remove a character at index `i` from `s` where `i > baseLen`, it has no effect on the prefix (still `baseLen`). If we remove a character at index `i <= baseLen`, the resulting string's prefix comparison against `t` restarts: everything before index `i` still matches (length `i`), and then we need to compare `s[i+1..]` (shifted left by one) against `t[i..]` to see how many additional matching characters follow. To evaluate this efficiently for every candidate removal index `i` from 0 to `baseLen`, precompute using an LCP (longest common prefix) array between `s` (suffixes) and `t` (suffixes) using string hashing (binary search with rolling hash comparison) to get `LCP(s[i+1..], t[i..])` in O(log n) per query, or precompute a suffix-matching function via a combined string and Z-function. Track the maximum of `i + LCP(s[i+1..], t[i..])` over all `i` from 0 to `baseLen`, plus the trivial answer `baseLen`.

## C# Solution

```csharp
public class Solution 
{
    public int LongestCommonPrefix(string s, string t) 
    {
        int n = s.Length, m = t.Length;
        int baseLen = 0;
        while (baseLen < n && baseLen < m && s[baseLen] == t[baseLen]) baseLen++;

        int best = baseLen;

        // Precompute rolling hashes for s and t to compare suffixes quickly
        long[] hashS = BuildHash(s, out long[] powS, out long modS, out long baseS);
        long[] hashT = BuildHash(t, out long[] powT, out long modT, out long baseT);

        for (int i = 0; i <= baseLen && i < n; i++)
        {
            // after removing s[i], compare s[i+1..] with t[i..]
            int lo = 0, hi = System.Math.Min(n - (i + 1), m - i);
            int matched = 0;

            int left = 0, right = hi;
            while (left <= right)
            {
                int mid = left + (right - left) / 2;
                if (mid == 0 || SubstringEquals(s, i + 1, hashS, powS, modS, t, i, hashT, powT, modT, mid))
                {
                    matched = mid;
                    left = mid + 1;
                }
                else
                {
                    right = mid - 1;
                }
            }

            best = System.Math.Max(best, i + matched);
        }

        return best;
    }

    private long[] BuildHash(string str, out long[] pow, out long mod, out long baseVal)
    {
        mod = 1_000_000_007L;
        baseVal = 131;
        int n = str.Length;
        long[] hash = new long[n + 1];
        pow = new long[n + 1];
        pow[0] = 1;
        for (int i = 0; i < n; i++)
        {
            hash[i + 1] = (hash[i] * baseVal + str[i]) % mod;
            pow[i + 1] = (pow[i] * baseVal) % mod;
        }
        return hash;
    }

    private bool SubstringEquals(string s, int startS, long[] hashS, long[] powS, long modS,
                                  string t, int startT, long[] hashT, long[] powT, long modT, int length)
    {
        long h1 = ((hashS[startS + length] - hashS[startS] * powS[length] % modS) % modS + modS) % modS;
        long h2 = ((hashT[startT + length] - hashT[startT] * powT[length] % modT) % modT + modT) % modT;
        return h1 == h2;
    }
}
```

## Complexity

- **Time:** O(n log n) for building hashes and binary searching matches for each candidate removal index
- **Space:** O(n + m) for the prefix hash arrays
