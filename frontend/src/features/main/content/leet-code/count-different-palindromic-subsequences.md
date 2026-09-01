# 730. Count Different Palindromic Subsequences

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Given a string `s`, return the number of different non-empty palindromic subsequences in it, modulo `10^9 + 7`.

### Example

```
Input: s = "bccb"
Output: 6
```

## Approach

Use interval dynamic programming where `dp[i][j]` is the number of distinct palindromic subsequences within `s[i..j]`. When the endpoints differ, combine the counts from the two overlapping sub-ranges (excluding either endpoint) minus their double-counted overlap. When the endpoints match (say character `c`), find the leftmost and rightmost occurrences of `c` strictly inside the range: if `c` doesn't appear inside, every inner palindrome can be wrapped with `c` on both sides, plus the two new palindromes `"c"` and `"cc"`; if `c` appears exactly once inside, similarly wrap every inner palindrome plus just `"c"` itself; if it appears more than once, wrap every inner palindrome but subtract the double-counted ones already wrapped by the innermost matching pair.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int CountPalindromicSubsequences(string s)
    {
        int n = s.Length;
        var dp = new int[n, n];

        for (int i = 0; i < n; i++)
            dp[i, i] = 1;

        for (int len = 2; len <= n; len++)
        {
            for (int i = 0; i + len - 1 < n; i++)
            {
                int j = i + len - 1;

                if (s[i] == s[j])
                {
                    int low = i + 1, high = j - 1;

                    while (low <= high && s[low] != s[i]) low++;
                    while (low <= high && s[high] != s[i]) high--;

                    if (low > high)
                    {
                        dp[i, j] = (2 * dp[i + 1, j - 1] + 2) % Mod;
                    }
                    else if (low == high)
                    {
                        dp[i, j] = (2 * dp[i + 1, j - 1] + 1) % Mod;
                    }
                    else
                    {
                        dp[i, j] = (2 * dp[i + 1, j - 1] - dp[low + 1, high - 1] + Mod) % Mod;
                    }
                }
                else
                {
                    dp[i, j] = (dp[i + 1, j] + dp[i, j - 1] - dp[i + 1, j - 1] + Mod) % Mod;
                }
            }
        }

        return dp[0, n - 1];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP table.
