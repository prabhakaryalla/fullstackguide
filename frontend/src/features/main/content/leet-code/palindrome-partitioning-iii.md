# 1278. Palindrome Partitioning III

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Given a string `s` and an integer `k`, partition `s` into exactly `k` non-empty, disjoint contiguous substrings and change as few characters as necessary so every substring is a palindrome. Return the minimum total number of character changes needed.

### Example

```
Input: s = "abc", k = 2
Output: 1
```

## Approach

First precompute `cost[i][j]`, the minimum number of character changes needed to turn `s[i..j]` into a palindrome, using the standard two-pointer interval recurrence: `cost[i][j] = cost[i+1][j-1] + (s[i] != s[j] ? 1 : 0)`. Then run a second DP over `(prefix length, number of parts used)`: `dp[i][p]` is the minimum total changes to partition the first `i` characters into `p` palindromic pieces, computed by trying every possible split point `j` for the final piece and taking `dp[j][p-1] + cost[j][i-1]`.

## C# Solution

```csharp
public class Solution
{
    public int PalindromePartition(string s, int k)
    {
        int n = s.Length;
        var cost = new int[n, n];

        for (int length = 2; length <= n; length++)
        {
            for (int i = 0; i + length - 1 < n; i++)
            {
                int j = i + length - 1;
                cost[i, j] = (i + 1 <= j - 1 ? cost[i + 1, j - 1] : 0) + (s[i] == s[j] ? 0 : 1);
            }
        }

        const int Infinity = int.MaxValue / 2;
        var dp = new int[n + 1, k + 1];
        for (int i = 0; i <= n; i++)
            for (int p = 0; p <= k; p++)
                dp[i, p] = Infinity;
        dp[0, 0] = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int p = 1; p <= Math.Min(i, k); p++)
            {
                for (int j = p - 1; j < i; j++)
                {
                    if (dp[j, p - 1] == Infinity) continue;
                    dp[i, p] = Math.Min(dp[i, p], dp[j, p - 1] + cost[j, i - 1]);
                }
            }
        }

        return dp[n, k];
    }
}
```

## Complexity

- **Time:** `O(n^2 * k)`.
- **Space:** `O(n^2)`.
