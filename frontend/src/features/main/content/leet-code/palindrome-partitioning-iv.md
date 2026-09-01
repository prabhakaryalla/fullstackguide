# 1745. Palindrome Partitioning IV

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Given a string `s`, return `true` if it can be split into exactly three non-empty palindromic substrings.

### Example

```
Input: s = "abcbdd"
Output: true
```

## Approach

Precompute an `isPalindrome[i][j]` table in `O(n^2)` using the standard expand-length dynamic programming recurrence. Then try every pair of split points `(i, j)` with `0 < i < j < n`, checking whether `s[0..i-1]`, `s[i..j-1]`, and `s[j..n-1]` are all palindromes using the precomputed table.

## C# Solution

```csharp
public class Solution
{
    public bool CheckPartitioning(string s)
    {
        int n = s.Length;
        bool[,] isPal = new bool[n, n];
        for (int i = 0; i < n; i++) isPal[i, i] = true;

        for (int len = 2; len <= n; len++)
        {
            for (int i = 0; i + len - 1 < n; i++)
            {
                int j = i + len - 1;
                if (s[i] == s[j] && (len == 2 || isPal[i + 1, j - 1])) isPal[i, j] = true;
            }
        }

        for (int i = 1; i < n - 1; i++)
        {
            if (!isPal[0, i - 1]) continue;
            for (int j = i + 1; j < n; j++)
            {
                if (isPal[i, j - 1] && isPal[j, n - 1]) return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the palindrome table.
