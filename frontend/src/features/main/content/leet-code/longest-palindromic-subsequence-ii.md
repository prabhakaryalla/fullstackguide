# 1682. Longest Palindromic Subsequence II

**Difficulty:** Medium
**Category:** String, Dynamic Programming

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A "good" palindromic subsequence of `s` has length at least 2, and no two of its immediately-nested matching pairs (i.e., no two consecutive layers, with nothing chosen in between them) reuse the same character. Return the length of the longest good palindromic subsequence of `s`, or `0` if none exists.

### Example

```
Input: s = "bbabab"
Output: 4
```

## Approach

Use interval DP with an extra dimension tracking the character used by the immediately enclosing pair (or a sentinel for "no restriction" at the top level). For interval `[i, j]` with forbidden character `k`: if `s[i] == s[j]` and that character differs from `k`, use this pair (add 2) and recurse into `[i+1, j-1]` forbidding `s[i]` for the next layer. Otherwise, shrink the interval from either side and take the best result, still respecting the same forbidden character `k`. The base case (`i >= j`) contributes 0.

## C# Solution

```csharp
public class Solution
{
    private int[,,] memo;
    private string s;

    public int LongestPalindromeSubseq(string s)
    {
        this.s = s;
        int n = s.Length;
        memo = new int[n, n, 27];

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                for (int k = 0; k < 27; k++)
                {
                    memo[i, j, k] = -1;
                }
            }
        }

        return Lps(0, n - 1, 26);
    }

    private int Lps(int i, int j, int k)
    {
        if (i >= j)
        {
            return 0;
        }

        if (memo[i, j, k] != -1)
        {
            return memo[i, j, k];
        }

        int result;

        if (s[i] == s[j] && s[i] != 'a' + k)
        {
            result = Lps(i + 1, j - 1, s[i] - 'a') + 2;
        }
        else
        {
            result = Math.Max(Lps(i + 1, j, k), Lps(i, j - 1, k));
        }

        memo[i, j, k] = result;
        return result;
    }
}
```

## Complexity

- **Time:** `O(26 * n^2)`.
- **Space:** `O(26 * n^2)` for the memoization table.
