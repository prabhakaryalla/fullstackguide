# 3504. Longest Palindrome After Substring Concatenation II

**Difficulty:** Hard
**Category:** Dynamic Programming, String

## Problem
You are given two strings `s` and `t`. You may select a substring (possibly empty) from `s` and a substring (possibly empty) from `t`, then concatenate them in that order to form a new string. Return the length of the longest palindrome that can be formed this way.

This is the same problem as "Longest Palindrome After Substring Concatenation I", but with much longer strings, requiring an O(|s| * |t|) solution instead of a brute-force enumeration of all substring pairs.

### Example
Input: `s = "abcde"`, `t = "ecdba"`
Output: `5`
Explanation: Concatenating `"abc"` from `s` with `"ba"` from `t` gives `"abcba"`, a palindrome of length 5.

## Approach
Identical to Part I: precompute the longest palindromic substring starting at each index of `s` and ending at each index of `t`. Then run an O(|s| * |t|) DP where `dp[i][j]` (for `s[i] == t[j]`) equals `2 + dp[i-1][j+1]`, representing a palindrome built by matching characters inward from `s[i]` and `t[j]`. At each match, extend the palindrome using the precomputed longest palindromic suffix of `s` (starting after `i`) or prefix of `t` (ending before `j`), and update the global answer. The DP table is filled once in O(|s| * |t|) time, which comfortably handles the larger constraints of this version.

## C# Solution

```csharp
public class Solution {
    public int LongestPalindrome(string s, string t) {
        int m = s.Length, n = t.Length;
        int[] suffix = GetPalindromeLengths(s, true);
        int[] prefix = GetPalindromeLengths(t, false);
        int ans = Math.Max(Max(suffix), Max(prefix));

        int[,] dp = new int[m, n];
        for (int i = 0; i < m; i++) {
            for (int j = n - 1; j >= 0; j--) {
                if (s[i] == t[j]) {
                    dp[i, j] = 2 + (i > 0 && j < n - 1 ? dp[i - 1, j + 1] : 0);
                    int extend = Math.Max(i + 1 < m ? suffix[i + 1] : 0, j > 0 ? prefix[j - 1] : 0);
                    ans = Math.Max(ans, dp[i, j] + extend);
                }
            }
        }
        return ans;
    }

    private int[] GetPalindromeLengths(string s, bool isSuffix) {
        int n = s.Length;
        bool[,] isPal = new bool[n, n];
        int[] lengths = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                if (s[i] == s[j] && (j - i < 2 || isPal[i + 1, j - 1])) {
                    isPal[i, j] = true;
                    int index = isSuffix ? i : j;
                    lengths[index] = Math.Max(lengths[index], j - i + 1);
                }
            }
        }
        return lengths;
    }

    private int Max(int[] arr) {
        int m = 0;
        foreach (int v in arr) m = Math.Max(m, v);
        return m;
    }
}
```

## Complexity

- **Time:** O(|s| * |t|)
- **Space:** O(|s| * |t|)
