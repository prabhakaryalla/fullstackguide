# 44. Wildcard Matching

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Greedy, Recursion

## Problem

Given an input string `s` and a pattern `p`, implement wildcard pattern matching with support for `'?'` and `'*'` where:

- `'?'` matches any single character.
- `'*'` matches any sequence of characters (including the empty sequence).

The matching should cover the **entire** input string.

### Example 1

```
Input: s = "aa", p = "*"
Output: true
```

### Example 2

```
Input: s = "cb", p = "?a"
Output: false
```

### Example 3

```
Input: s = "adceb", p = "*a*b"
Output: true
```

### Constraints

- `0 <= s.length, p.length <= 2000`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'?'` or `'*'`.

## Approach

Build a 2-D DP table where `dp[i][j]` means `s[0..i)` matches `p[0..j)`. A `'?'` or exact character match copies the diagonal cell. A `'*'` can match zero characters (`dp[i][j-1]`) or absorb one more character of `s` (`dp[i-1][j]`) — either being `true` makes `dp[i][j]` `true`.

## C# Solution

```csharp
public class Solution
{
    public bool IsMatch(string s, string p)
    {
        int m = s.Length, n = p.Length;
        bool[,] dp = new bool[m + 1, n + 1];
        dp[0, 0] = true;

        for (int j = 1; j <= n; j++)
        {
            if (p[j - 1] == '*') dp[0, j] = dp[0, j - 1];
        }

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (p[j - 1] == '*')
                {
                    dp[i, j] = dp[i - 1, j] || dp[i, j - 1];
                }
                else if (p[j - 1] == '?' || p[j - 1] == s[i - 1])
                {
                    dp[i, j] = dp[i - 1, j - 1];
                }
            }
        }

        return dp[m, n];
    }
}
```

## Complexity

- **Time:** `O(m * n)` — one pass over the DP table.
- **Space:** `O(m * n)` — for the DP table.
