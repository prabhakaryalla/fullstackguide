# 132. Palindrome Partitioning II

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Given a string `s`, partition it such that every substring of the partition is a palindrome. Return the minimum number of cuts needed to achieve a palindrome partitioning of `s`.

### Example 1

```
Input: s = "aab"
Output: 1
Explanation: One cut gives "aa" and "b", both palindromes.
```

### Example 2

```
Input: s = "a"
Output: 0
```

### Constraints

- `1 <= s.length <= 2000`
- `s` consists of lowercase English letters only.

## Approach

First build an `isPalindrome[i][j]` table via the standard expand-outward DP (a substring is a palindrome if its endpoints match and the inner substring is also a palindrome). Then compute `minCuts[i]` — the minimum cuts needed for `s[0..i]` — by trying every possible last palindrome segment ending at `i`: if `s[j..i]` is a palindrome, `minCuts[i]` can be `minCuts[j-1] + 1` (or `0` cuts if the whole prefix `s[0..i]` is itself a palindrome).

## C# Solution

```csharp
public class Solution
{
    public int MinCut(string s)
    {
        int n = s.Length;
        var isPalindrome = new bool[n, n];

        for (int end = 0; end < n; end++)
        {
            for (int start = end; start >= 0; start--)
            {
                if (s[start] == s[end] && (end - start <= 2 || isPalindrome[start + 1, end - 1]))
                {
                    isPalindrome[start, end] = true;
                }
            }
        }

        var minCuts = new int[n];

        for (int i = 0; i < n; i++)
        {
            if (isPalindrome[0, i])
            {
                minCuts[i] = 0;
                continue;
            }

            minCuts[i] = int.MaxValue;

            for (int j = 1; j <= i; j++)
            {
                if (isPalindrome[j, i])
                {
                    minCuts[i] = Math.Min(minCuts[i], minCuts[j - 1] + 1);
                }
            }
        }

        return minCuts[n - 1];
    }
}
```

## Complexity

- **Time:** `O(n^2)` — building the palindrome table and the cuts array are both quadratic.
- **Space:** `O(n^2)` — for the palindrome lookup table.
