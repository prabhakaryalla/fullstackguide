# 3138. Minimum Length of Anagram Concatenation

**Difficulty:** Medium
**Category:** Hash Table, String, Counting

## Problem

Given a string `s`, find the smallest positive integer `k` such that `s` can be formed by concatenating several copies of some string of length `k`, where each copy is allowed to be any **anagram** of that base string (not necessarily identical). Return `k`.

## Approach

Try every divisor `k` of `s`'s length, from smallest to largest. For a candidate `k`, split `s` into consecutive chunks of length `k` and check whether every chunk is an anagram of the first chunk (same letter frequency counts). Return the first (smallest) `k` that works; the full length `n` always works trivially as a fallback.

## C# Solution

```csharp
public class Solution {
    public int MinAnagramLength(string s) {
        int n = s.Length;
        for (int k = 1; k <= n; k++)
            if (n % k == 0 && CanFormAnagram(s, k))
                return k;
        return n;
    }

    private bool CanFormAnagram(string s, int k) {
        int n = s.Length;
        int[] anagramCount = new int[26];
        int[] runningCount = new int[26];
        for (int i = 0; i < k; i++)
            anagramCount[s[i] - 'a']++;

        for (int i = k; i < n; i++) {
            runningCount[s[i] - 'a']++;
            if (i % k == k - 1) {
                for (int c = 0; c < 26; c++)
                    if (runningCount[c] != anagramCount[c])
                        return false;
                Array.Clear(runningCount, 0, 26);
            }
        }
        return true;
    }
}
```

## Complexity

- Time: O(n * sqrt(n)) roughly — trying each divisor k of n, each check costing O(n).
- Space: O(1) — fixed 26-slot frequency arrays.
