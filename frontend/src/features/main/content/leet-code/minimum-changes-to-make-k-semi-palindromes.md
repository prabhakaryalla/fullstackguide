# 2758. Minimum Changes to Make K Semi-palindromes

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

You are given a string `s` and an integer `k`. A semi-palindrome is a string that can be made a palindrome by changing at most one character.

Partition the string into exactly `k` non-empty semi-palindromes. Return the minimum number of character changes needed across all partitions.

### Example

```
Input: s = "abcac", k = 2
Output: 1
Explanation: Partition into "ab" and "cac". "cac" is already a palindrome. "ab" needs 1 change to become "aa" or "bb". Total: 1 change.
```

## Approach

Use dynamic programming with two dimensions:
- `dp[i][j]` = minimum changes to partition `s[0...i-1]` into exactly `j` semi-palindromes
- Pre-compute the cost to make any substring `s[l...r]` a palindrome
- For each partition point, try all possible last substrings and choose the minimum

A string is a semi-palindrome if it needs at most 1 change to become a palindrome. For a substring, count mismatched pairs and determine if ≤ 1 changes suffice.

## C# Solution

```csharp
public class Solution
{
    public int MinChanges(string s, int k)
    {
        int n = s.Length;
        int[,] cost = new int[n, n];
        
        for (int i = 0; i < n; i++)
        {
            for (int j = i; j < n; j++)
            {
                cost[i, j] = GetPalindromeCost(s, i, j);
            }
        }
        
        int[,] dp = new int[n + 1, k + 1];
        
        for (int i = 0; i <= n; i++)
        {
            for (int j = 0; j <= k; j++)
            {
                dp[i, j] = int.MaxValue / 2;
            }
        }
        
        dp[0, 0] = 0;
        
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= Math.Min(i, k); j++)
            {
                for (int l = j - 1; l < i; l++)
                {
                    if (dp[l, j - 1] != int.MaxValue / 2)
                    {
                        dp[i, j] = Math.Min(dp[i, j], dp[l, j - 1] + cost[l, i - 1]);
                    }
                }
            }
        }
        
        return dp[n, k];
    }
    
    private int GetPalindromeCost(string s, int left, int right)
    {
        int changes = 0;
        
        while (left < right)
        {
            if (s[left] != s[right])
            {
                changes++;
            }
            left++;
            right--;
        }
        
        return changes;
    }
}
```

## Complexity

- **Time:** O(n² * k) for DP with O(n²) preprocessing
- **Space:** O(n² + n*k) for cost array and DP table
