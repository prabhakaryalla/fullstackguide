# 712. Minimum ASCII Delete Sum for Two Strings

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

Given two strings `s1` and `s2`, return the lowest sum of ASCII values of deleted characters needed to make the two strings equal.

### Example

```
Input: s1 = "sea", s2 = "eat"
Output: 231
```

### Constraints

- `1 <= s1.length, s2.length <= 1000`

## Approach

Use string-alignment dynamic programming similar to edit distance, but tracking ASCII cost sums instead of operation counts. `dp[i][j]` is the minimum deletion cost to equalize `s1[0..i)` and `s2[0..j)`. If the current characters match, no deletion is needed at this position, so carry over `dp[i-1][j-1]`; otherwise, take the cheaper of deleting the current character from `s1` or from `s2`. Base cases handle deleting an entire prefix when the other string is empty.

## C# Solution

```csharp
public class Solution
{
    public int MinimumDeleteSum(string s1, string s2)
    {
        int n1 = s1.Length, n2 = s2.Length;
        var dp = new int[n1 + 1, n2 + 1];

        for (int i = 1; i <= n1; i++)
            dp[i, 0] = dp[i - 1, 0] + s1[i - 1];

        for (int j = 1; j <= n2; j++)
            dp[0, j] = dp[0, j - 1] + s2[j - 1];

        for (int i = 1; i <= n1; i++)
        {
            for (int j = 1; j <= n2; j++)
            {
                if (s1[i - 1] == s2[j - 1])
                {
                    dp[i, j] = dp[i - 1, j - 1];
                }
                else
                {
                    dp[i, j] = Math.Min(dp[i - 1, j] + s1[i - 1], dp[i, j - 1] + s2[j - 1]);
                }
            }
        }

        return dp[n1, n2];
    }
}
```

## Complexity

- **Time:** `O(n1 * n2)`.
- **Space:** `O(n1 * n2)` for the DP table.
