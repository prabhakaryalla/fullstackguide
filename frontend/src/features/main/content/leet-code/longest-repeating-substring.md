# 1062. Longest Repeating Substring

**Difficulty:** Medium
**Category:** String, Binary Search, Dynamic Programming, Suffix Array

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s`, return the length of the longest substring that occurs at least twice within `s` (occurrences may overlap). Return `0` if no substring repeats.

### Example

```
Input: s = "abcabcabc"
Output: 6
Explanation: "abcabc" is repeated.
```

## Approach

Use a DP table where `dp[i][j]` is the length of the longest common suffix between the prefixes `s[0..i)` and `s[0..j)` (for `j > i`, guaranteeing two genuinely different starting positions). When `s[i-1] == s[j-1]`, extend the diagonal from `dp[i-1][j-1]`; otherwise the common suffix breaks and resets to `0`. Because `j` always exceeds `i`, any positive `dp[i][j]` value directly represents a substring repeated starting at two distinct positions, so track the maximum value found.

## C# Solution

```csharp
public class Solution
{
    public int LongestRepeatingSubstring(string s)
    {
        int n = s.Length;
        var dp = new int[n + 1, n + 1];
        int best = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int j = i + 1; j <= n; j++)
            {
                if (s[i - 1] == s[j - 1])
                {
                    dp[i, j] = dp[i - 1, j - 1] + 1;
                    best = Math.Max(best, dp[i, j]);
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP table.
