# 1312. Minimum Insertion Steps to Make a String Palindrome

**Difficulty:** Hard
**Category:** Dynamic Programming, String

## Problem

Given a string `s`, return the minimum number of characters that must be inserted to make it a palindrome.

### Example

```
Input: s = "mbadm"
Output: 2
```

## Approach

The minimum insertions needed equals the string's length minus the length of the longest common subsequence between `s` and its reverse — that shared subsequence is the largest palindromic "skeleton" already present, and every other character needs a mirrored insertion.

## C# Solution

```csharp
public class Solution
{
    public int MinInsertions(string s)
    {
        int n = s.Length;
        var rev = new string(s.Reverse().ToArray());
        var dp = new int[n + 1, n + 1];

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                dp[i, j] = s[i - 1] == rev[j - 1]
                    ? dp[i - 1, j - 1] + 1
                    : Math.Max(dp[i - 1, j], dp[i, j - 1]);
            }
        }

        return n - dp[n, n];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the LCS table.
