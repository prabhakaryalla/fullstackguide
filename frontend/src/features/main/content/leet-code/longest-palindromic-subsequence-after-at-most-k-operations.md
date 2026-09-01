# 3472. Longest Palindromic Subsequence After at Most K Operations

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem
You are given a string `s` consisting of lowercase English letters, and an integer `k`.

In one operation you may choose any index and replace the letter there with the previous or next letter in the alphabet, treated cyclically (`'a'` can become `'z'` or `'b'`, `'z'` can become `'y'` or `'a'`). Performing an operation once counts as one unit of cost.

Return the length of the longest palindromic subsequence of `s` that can be obtained after performing **at most** `k` total operations (the cost to turn one character into another equals the minimum number of cyclic steps between them).

### Example
Input: `s = "ace"`, `k = 2`
Output: `3`
Explanation: The cyclic distance between `'a'` and `'e'` is `min(4, 22) = 4`, but between `'a'` and `'c'` it is `2`. Changing `s[2]` from `'e'` to `'a'` (cost 2) turns the whole string into `"aca"`, a palindrome of length 3, using exactly `k = 2` operations.

## Approach
Use interval dynamic programming over `dp[i][j][op]`, the length of the longest palindromic subsequence of `s[i..j]` using at most `op` operations.

- Base case: `dp[i][i][op] = 1` for every `op`.
- If `s[i] == s[j]`, pairing them is free: `dp[i][j][op] = 2 + dp[i+1][j-1][op]`.
- Otherwise, either skip one end (`dp[i+1][j][op]` or `dp[i][j-1][op]`), or pay the cyclic distance `cost(s[i], s[j])` to force a match: `dp[i][j][op] = max(..., 2 + dp[i+1][j-1][op - cost])` when `cost <= op`.

The answer is `dp[0][n-1][k]`.

## C# Solution

```csharp
public class Solution {
    public int LongestPalindromicSubsequence(string s, int k) {
        int n = s.Length;
        int[,,] dp = new int[n, n, k + 1];
        for (int i = 0; i < n; i++)
            for (int op = 0; op <= k; op++)
                dp[i, i, op] = 1;

        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                for (int op = 0; op <= k; op++) {
                    if (s[i] == s[j]) {
                        dp[i, j, op] = 2 + (i + 1 <= j - 1 ? dp[i + 1, j - 1, op] : 0);
                    } else {
                        int best = Math.Max(dp[i + 1, j, op], dp[i, j - 1, op]);
                        int cost = GetCost(s[i], s[j]);
                        if (cost <= op) {
                            int inner = i + 1 <= j - 1 ? dp[i + 1, j - 1, op - cost] : 0;
                            best = Math.Max(best, 2 + inner);
                        }
                        dp[i, j, op] = best;
                    }
                }
            }
        }

        return dp[0, n - 1, k];
    }

    private int GetCost(char a, char b) {
        int dist = Math.Abs(a - b);
        return Math.Min(dist, 26 - dist);
    }
}
```

## Complexity

- **Time:** O(n^2 * k)
- **Space:** O(n^2 * k)
