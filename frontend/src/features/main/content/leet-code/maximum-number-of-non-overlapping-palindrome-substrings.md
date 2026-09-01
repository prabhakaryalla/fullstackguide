# 2472. Maximum Number of Non-overlapping Palindrome Substrings

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Greedy

## Problem

You are given a string `s` and a positive integer `k`. Select a set of non-overlapping substrings such that:

- Each substring has a length of at least `k`
- Each substring is a palindrome

Return the maximum number of non-overlapping palindrome substrings you can select.

### Example

```
Input: s = "abaccdbbd", k = 3
Output: 2
Explanation: Select "aba" and "dbbd" (palindrome of length 4).
```

## Approach

Use greedy strategy with dynamic programming to identify palindromes. Precompute all palindromes of length ≥ k. Then, greedily select palindromes from left to right: always pick the earliest ending palindrome to leave more room for future selections.

## C# Solution

```csharp
public class Solution
{
    public int MaxPalindromes(string s, int k)
    {
        int n = s.Length;
        bool[,] isPalin = new bool[n, n];
        
        // Precompute palindromes
        for (int len = 1; len <= n; len++)
        {
            for (int i = 0; i + len <= n; i++)
            {
                int j = i + len - 1;
                if (len == 1)
                {
                    isPalin[i, j] = true;
                }
                else if (len == 2)
                {
                    isPalin[i, j] = s[i] == s[j];
                }
                else
                {
                    isPalin[i, j] = s[i] == s[j] && isPalin[i + 1, j - 1];
                }
            }
        }
        
        // Greedy selection
        int count = 0;
        int lastEnd = -1;
        
        for (int i = 0; i < n; i++)
        {
            if (i <= lastEnd) continue;
            
            // Try to find shortest valid palindrome starting at or after lastEnd+1
            for (int j = i + k - 1; j < n; j++)
            {
                if (isPalin[i, j])
                {
                    count++;
                    lastEnd = j;
                    break;
                }
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n²) for palindrome precomputation
- **Space:** O(n²) for the palindrome table
