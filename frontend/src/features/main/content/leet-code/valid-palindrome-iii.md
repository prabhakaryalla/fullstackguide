# 1216. Valid Palindrome III

**Difficulty:** Hard
**Category:** String, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` and an integer `k`, return `true` if `s` can be transformed into a palindrome by removing at most `k` characters.

### Example

```
Input: s = "abcdeca", k = 2
Output: true
Explanation: Remove 'b' and 'e' to get "acdca", which is a palindrome.
```

## Approach

A string can become a palindrome after removing at most `k` characters exactly when its longest palindromic subsequence (LPS) has length at least `n - k`. Compute the LPS length with the classic interval DP: `dp[i,j]` is the LPS length of the substring `s[i..j]`, equal to `dp[i+1,j-1] + 2` when `s[i] == s[j]`, otherwise `max(dp[i+1,j], dp[i,j-1])`. Compare `n - dp[0, n-1]` against `k`.

## C# Solution

```csharp
public class Solution
{
    public bool IsValidPalindrome(string s, int k)
    {
        int n = s.Length;
        var dp = new int[n, n];

        for (int i = n - 1; i >= 0; i--)
        {
            dp[i, i] = 1;
            for (int j = i + 1; j < n; j++)
            {
                if (s[i] == s[j])
                    dp[i, j] = (i + 1 <= j - 1 ? dp[i + 1, j - 1] : 0) + 2;
                else
                    dp[i, j] = Math.Max(dp[i + 1, j], dp[i, j - 1]);
            }
        }

        int longestPalindromicSubsequence = n == 0 ? 0 : dp[0, n - 1];
        return n - longestPalindromicSubsequence <= k;
    }
}
```

## Complexity

- **Time:** `O(n^2)`, where `n` is the length of `s`.
- **Space:** `O(n^2)` for the DP table.
