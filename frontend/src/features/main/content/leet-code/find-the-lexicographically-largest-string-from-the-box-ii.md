# 3406. Find the Lexicographically Largest String From the Box II

**Difficulty:** Hard
**Category:** Array, String, Hash Function, Binary Search, Suffix Array
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given a string `word` and an integer `numFriends`. Alice is organizing a game for her `numFriends` friends. In each round, `word` is split into `numFriends` non-empty contiguous pieces such that no previous round produced the exact same split, and every piece is placed into a box. After all possible rounds are finished, return the lexicographically largest string that ends up in the box.

## Approach
Every split leaves `numFriends - 1` other pieces that need at least one character each, so the largest piece any split can contribute has length at most `maxLen = n - numFriends + 1`, and every substring of `word` with length up to `maxLen` is achievable as the largest piece of some split. The answer is therefore the lexicographically largest substring of `word` whose length does not exceed `maxLen`.

To find it efficiently, compare candidate starting indices using binary search over prefix hashes (Rabin-Karp style) to compute the longest common prefix between the suffixes starting at two indices, capped at `maxLen`. Scan left to right, keeping a running best starting index; for each new index, use the LCP length and the following characters (or which candidate runs out of its `maxLen`-bounded window first) to decide whether it beats the current best. This avoids any direct O(n^2) substring comparisons.

## C# Solution

```csharp
public class Solution 
{
    public string AnswerString(string word, int numFriends) 
    {
        int n = word.Length;
        if (numFriends == 1) return word;

        int maxLen = n - numFriends + 1;

        const long mod = 1_000_000_007L;
        const long baseVal = 131;
        long[] hashArr = new long[n + 1];
        long[] pow = new long[n + 1];
        pow[0] = 1;
        for (int i = 0; i < n; i++)
        {
            hashArr[i + 1] = (hashArr[i] * baseVal + word[i]) % mod;
            pow[i + 1] = (pow[i] * baseVal) % mod;
        }

        long GetHash(int l, int r)
        {
            long h = (hashArr[r] - hashArr[l] * pow[r - l]) % mod;
            return h < 0 ? h + mod : h;
        }

        int Lcp(int a, int b)
        {
            int lo = 0, hi = Math.Min(maxLen, Math.Min(n - a, n - b));
            while (lo < hi)
            {
                int mid = (lo + hi + 1) / 2;
                if (GetHash(a, a + mid) == GetHash(b, b + mid)) lo = mid;
                else hi = mid - 1;
            }
            return lo;
        }

        int best = 0;
        for (int i = 1; i < n; i++)
        {
            int len = Lcp(best, i);
            int bestLen = Math.Min(maxLen, n - best);
            int iLen = Math.Min(maxLen, n - i);

            if (len >= bestLen && len >= iLen)
            {
                continue;
            }
            if (len >= bestLen)
            {
                best = i;
            }
            else if (len >= iLen)
            {
                continue;
            }
            else if (word[best + len] < word[i + len])
            {
                best = i;
            }
        }

        int finalLen = Math.Min(maxLen, n - best);
        return word.Substring(best, finalLen);
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
