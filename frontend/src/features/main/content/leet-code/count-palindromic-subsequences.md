# 2484. Count Palindromic Subsequences

**Difficulty:** Hard
**Category:** String, Dynamic Programming

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a string of digits `s`. Return the number of palindromic subsequences of `s` having length 5.

The answer may be large, so return it modulo 10⁹ + 7.

A subsequence is palindromic if it reads the same forwards and backwards.

### Example

```
Input: s = "103301"
Output: 2
Explanation: The palindromic subsequences of length 5 are "10301" and "03030"
```

## Approach

Use dynamic programming to count palindromic subsequences:
1. A length-5 palindrome has pattern: a-b-c-b-a
2. Fix the middle digit c at each position
3. Count pairs of (a,b) to the left and (b,a) to the right
4. Use prefix/suffix frequency arrays to count efficiently

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int CountPalindromes(string s)
    {
        int n = s.Length;
        if (n < 5) return 0;
        
        var prefixPairs = new long[n];
        var suffixPairs = new long[n];
        var prefixCount = new int[10];
        var suffixCount = new int[10];
        
        for (int i = 0; i < n; i++)
        {
            int digit = s[i] - '0';
            
            if (i > 0)
            {
                prefixPairs[i] = prefixPairs[i - 1];
                for (int d = 0; d < 10; d++)
                {
                    prefixPairs[i] = (prefixPairs[i] + prefixCount[d]) % MOD;
                }
            }
            
            prefixCount[digit]++;
        }
        
        Array.Fill(suffixCount, 0);
        
        for (int i = n - 1; i >= 0; i--)
        {
            int digit = s[i] - '0';
            
            if (i < n - 1)
            {
                suffixPairs[i] = suffixPairs[i + 1];
                for (int d = 0; d < 10; d++)
                {
                    suffixPairs[i] = (suffixPairs[i] + suffixCount[d]) % MOD;
                }
            }
            
            suffixCount[digit]++;
        }
        
        long result = 0;
        for (int i = 2; i < n - 2; i++)
        {
            long contribution = (prefixPairs[i - 1] * suffixPairs[i + 1]) % MOD;
            result = (result + contribution) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the prefix and suffix arrays
