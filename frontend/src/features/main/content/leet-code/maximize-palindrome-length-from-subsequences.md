# 1771. Maximize Palindrome Length From Subsequences

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Given strings `word1` and `word2`, form `s = word1 + word2`. Return the length of the longest palindromic subsequence of `s` that includes at least one character from `word1` and at least one character from `word2`; return `0` if no such subsequence exists.

### Example

```
Input: word1 = "cacb", word2 = "cbba"
Output: 5
```

## Approach

Run the classic interval dynamic programming for the longest palindromic subsequence on the concatenated string `s = word1 + word2`: `dp[i][j]` is the longest palindromic subsequence within `s[i..j]`, built from shorter intervals. Whenever `s[i] == s[j]` and the match straddles the boundary between `word1` and `word2` (`i` inside `word1`, `j` inside `word2`), that `dp[i][j]` is a valid candidate since the two matched characters guarantee both strings contribute.

## C# Solution

```csharp
public class Solution
{
    public int LongestPalindrome(string word1, string word2)
    {
        string s = word1 + word2;
        int n = s.Length;
        int len1 = word1.Length;
        int[,] dp = new int[n, n];
        for (int i = 0; i < n; i++) dp[i, i] = 1;

        int best = 0;

        for (int len = 2; len <= n; len++)
        {
            for (int i = 0; i + len - 1 < n; i++)
            {
                int j = i + len - 1;
                if (s[i] == s[j])
                {
                    dp[i, j] = (len == 2) ? 2 : dp[i + 1, j - 1] + 2;
                    if (i < len1 && j >= len1) best = Math.Max(best, dp[i, j]);
                }
                else
                {
                    dp[i, j] = Math.Max(dp[i + 1, j], dp[i, j - 1]);
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2)` where `n = word1.Length + word2.Length`.
- **Space:** `O(n^2)`.
