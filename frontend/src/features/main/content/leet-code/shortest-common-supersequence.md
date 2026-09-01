# 1092. Shortest Common Supersequence

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Given two strings `str1` and `str2`, return the shortest string that has both `str1` and `str2` as subsequences. If multiple valid strings exist, return any of them.

### Example

```
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
```

## Approach

First compute the standard Longest Common Subsequence DP table between `str1` and `str2`. Then reconstruct the supersequence by walking backward from `dp[m][n]`: whenever the current characters of both strings match, that shared character belongs in the result and both pointers move back; otherwise, take the character from whichever string corresponds to the larger DP value (the one that "contributed" to the LCS from that direction) and advance only that pointer. Once one string is exhausted, append the remainder of the other, then reverse the accumulated characters since they were built back-to-front.

## C# Solution

```csharp
public class Solution
{
    public string ShortestCommonSupersequence(string str1, string str2)
    {
        int m = str1.Length, n = str2.Length;
        var dp = new int[m + 1, n + 1];

        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                dp[i, j] = str1[i - 1] == str2[j - 1]
                    ? dp[i - 1, j - 1] + 1
                    : Math.Max(dp[i - 1, j], dp[i, j - 1]);
            }
        }

        var result = new StringBuilder();
        int x = m, y = n;

        while (x > 0 && y > 0)
        {
            if (str1[x - 1] == str2[y - 1])
            {
                result.Append(str1[x - 1]);
                x--;
                y--;
            }
            else if (dp[x - 1, y] >= dp[x, y - 1])
            {
                result.Append(str1[x - 1]);
                x--;
            }
            else
            {
                result.Append(str2[y - 1]);
                y--;
            }
        }

        while (x > 0)
        {
            result.Append(str1[x - 1]);
            x--;
        }

        while (y > 0)
        {
            result.Append(str2[y - 1]);
            y--;
        }

        var chars = result.ToString().ToCharArray();
        Array.Reverse(chars);
        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(m * n)` for building the DP table and reconstructing the answer.
- **Space:** `O(m * n)` for the DP table.
