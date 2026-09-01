# 3316. Find Maximum Removals From Source String

**Difficulty:** Medium
**Category:** Array, Hash Table, Two Pointers, String, Dynamic Programming

## Problem

You are given a string `source` of size `n`, a string `pattern` that is a subsequence of `source`, and a sorted integer array `targetIndices` of distinct indices in `[0, n - 1]`.

An operation removes the character at an index `idx` from `source`, where:
- `idx` is an element of `targetIndices`.
- `pattern` remains a subsequence of `source` after removing the character.

Removing a character does not shift the indices of the remaining characters.

Return the maximum number of operations that can be performed.

### Example

Input: `source = "abbaa", pattern = "aba", targetIndices = [0,1,2]`

Output: `1`

Explanation: We can remove `source[1]` or `source[2]`, but not both while keeping `"aba"` a subsequence, and not `source[0]`.

## Approach

Use dynamic programming over the position in `source` and the number of matched characters of `pattern`.

Let `dp[i][j]` be the maximum number of removals achievable after processing the first `i` characters of `source`, having matched the first `j` characters of `pattern`. For each position `i` (0-indexed) with current state `dp[i][j]`:
- **Keep** `source[i]`: this is always allowed. If it equals `pattern[j]`, we may optionally use it to match, advancing to `dp[i+1][j+1]`.
- **Remove** `source[i]`: only allowed if `i` is in `targetIndices`. This increases the removal count by 1 and does not advance the match pointer, since the character is gone.

The answer is `dp[n][m]` where `m = pattern.Length`.

## C# Solution

```csharp
public class Solution 
{
    public int MaxRemovals(string source, string pattern, int[] targetIndices) 
    {
        int n = source.Length, m = pattern.Length;
        bool[] isTarget = new bool[n];
        foreach (int idx in targetIndices) isTarget[idx] = true;

        int[,] dp = new int[n + 1, m + 1];
        for (int i = 0; i <= n; i++)
            for (int j = 0; j <= m; j++)
                dp[i, j] = -1;
        dp[0, 0] = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j <= m; j++)
            {
                if (dp[i, j] < 0) continue;
                int cur = dp[i, j];

                if (isTarget[i] && dp[i + 1, j] < cur + 1)
                {
                    dp[i + 1, j] = cur + 1;
                }

                if (dp[i + 1, j] < cur)
                {
                    dp[i + 1, j] = cur;
                }

                if (j < m && source[i] == pattern[j] && dp[i + 1, j + 1] < cur)
                {
                    dp[i + 1, j + 1] = cur;
                }
            }
        }

        return dp[n, m];
    }
}
```

## Complexity

- **Time:** O(n * m).
- **Space:** O(n * m).
