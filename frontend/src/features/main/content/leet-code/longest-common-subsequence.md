# 1143. Longest Common Subsequence

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

Given two strings `text1` and `text2`, return the length of their longest common subsequence (a sequence that appears in both strings in the same relative order, but not necessarily contiguously). Return `0` if there is no common subsequence.

### Example

```
Input: text1 = "abcde", text2 = "ace"
Output: 3
```

## Approach

Use a classic 2D dynamic programming table where `dp[i][j]` is the LCS length of `text1[0..i)` and `text2[0..j)`. When the characters at positions `i-1` and `j-1` match, extend the diagonal result by one; otherwise take the best of dropping a character from either string.

## C# Solution

```csharp
public class Solution
{
    public int LongestCommonSubsequence(string text1, string text2)
    {
        int m = text1.Length, n = text2.Length;
        int[,] dp = new int[m + 1, n + 1];

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                dp[i, j] = text1[i - 1] == text2[j - 1]
                    ? dp[i - 1, j - 1] + 1
                    : Math.Max(dp[i - 1, j], dp[i, j - 1]);
            }
        }

        return dp[m, n];
    }
}
```

## Complexity

- **Time:** `O(m·n)`.
- **Space:** `O(m·n)` for the DP table.
