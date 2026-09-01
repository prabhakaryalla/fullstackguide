# 2424. Maximum Deletions on a String

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Rolling Hash, Suffix Array, Hash Function

## Problem

You are given a string `s` consisting of only lowercase English letters. In one operation, you can:

- Delete the entire string `s`, or
- Delete the first `i` letters of `s` if the first `i` letters of `s` are equal to the following `i` letters in `s`, for any `i` in the range `1 <= i <= s.length / 2`.

Return the maximum number of operations needed to delete all of `s`.

### Example

```
Input: s = "abcabcdabc"
Output: 2
Explanation:
- Delete the first 3 letters ("abc") since the next 3 letters are also "abc". Now s = "abcdabc".
- Delete all of s. Total operations = 2.
```

## Approach

Use dynamic programming with longest common prefix (LCP) precomputation. For each position, try all possible prefix lengths that match the following substring, recursively computing the maximum operations.

## C# Solution

```csharp
public class Solution
{
    public int DeleteString(string s)
    {
        int n = s.Length;
        int[][] lcp = new int[n + 1][];
        for (int i = 0; i <= n; i++)
        {
            lcp[i] = new int[n + 1];
        }
        
        for (int i = n - 1; i >= 0; i--)
        {
            for (int j = n - 1; j >= 0; j--)
            {
                if (s[i] == s[j])
                {
                    lcp[i][j] = lcp[i + 1][j + 1] + 1;
                }
            }
        }
        
        int[] dp = new int[n];
        
        for (int i = n - 1; i >= 0; i--)
        {
            dp[i] = 1;
            for (int len = 1; len <= (n - i) / 2; len++)
            {
                if (lcp[i][i + len] >= len)
                {
                    dp[i] = Math.Max(dp[i], dp[i + len] + 1);
                }
            }
        }
        
        return dp[0];
    }
}
```

## Complexity

- **Time:** O(n^2) where n is the length of the string
- **Space:** O(n^2) for the LCP array
