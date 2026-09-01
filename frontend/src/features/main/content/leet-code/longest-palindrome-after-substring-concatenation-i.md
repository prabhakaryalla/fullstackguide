# 3503. Longest Palindrome After Substring Concatenation I

**Difficulty:** Medium
**Category:** Two Pointers, String, Dynamic Programming, Enumeration

## Problem
You are given two strings `s` and `t`. You may select a substring (possibly empty) from `s` and a substring (possibly empty) from `t`, then concatenate them in that order to form a new string. Return the length of the longest palindrome that can be formed this way.

### Example
Input: `s = "abcde"`, `t = "ecdba"`
Output: `5`
Explanation: Concatenating `"abc"` from `s` with `"ba"` from `t` gives `"abcba"`, a palindrome of length 5.

## Approach
Precompute, for `s`, the length of the longest palindromic substring **starting** at each index (used as a "free extension" available when appending a suffix of `s` alone), and for `t`, the length of the longest palindromic substring **ending** at each index (used similarly for a prefix of `t` alone). Initialize the answer with the best of these single-string palindromes.

Then, for every pair `(i, j)` with `s[i] == t[j]`, grow a palindrome symmetrically inward-out: `dp[i][j] = 2 + dp[i-1][j+1]` (matching characters extend a smaller palindrome centered between `s` and `t`). At each such match, the palindrome can additionally be extended further using either a palindromic suffix of `s` starting right after `i`, or a palindromic prefix of `t` ending right before `j` — take the better of the two extensions and update the answer.

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

- **Time:** O(|s| * |t| + |s|^2 + |t|^2)
- **Space:** O(|s| * |t|)
