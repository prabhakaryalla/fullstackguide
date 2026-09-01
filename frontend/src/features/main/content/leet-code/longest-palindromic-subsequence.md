# 516. Longest Palindromic Subsequence

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

Given a string `s`, return the length of the longest palindromic subsequence (a subsequence need not be contiguous).

### Example

```
Input: s = "bbbab"
Output: 4
Explanation: One longest palindromic subsequence is "bbbb".
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists only of lowercase English letters.

## Approach

Use interval dynamic programming where `dp[i][j]` is the longest palindromic subsequence within `s[i..j]`. If the endpoints match, they can both be included in the palindrome, adding 2 to the best result from the inner substring; otherwise, take the best of excluding either endpoint. Process substrings from shortest to longest (equivalently, `i` from right to left, `j` from left to right).

## C# Solution

```csharp
public class Solution
{
    public int LongestPalindromeSubseq(string s)
    {
        int n = s.Length;
        var dp = new int[n, n];

        for (int i = n - 1; i >= 0; i--)
        {
            dp[i, i] = 1;

            for (int j = i + 1; j < n; j++)
            {
                if (s[i] == s[j])
                    dp[i, j] = dp[i + 1, j - 1] + 2;
                else
                    dp[i, j] = Math.Max(dp[i + 1, j], dp[i, j - 1]);
            }
        }

        return dp[0, n - 1];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP table.
