# 2741. Count the Number of Ideal Arrays

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Combinatorics, Number Theory

## Problem

You are given two integers `n` and `maxValue`, and you must create an array `arr` of size `n`.

An array is considered ideal if the following conditions hold:
1. Every `arr[i]` is a value from `1` to `maxValue`.
2. For all indices `i` from `0` to `n - 2`, `arr[i]` divides `arr[i + 1]`.

Return the number of distinct ideal arrays. Since the answer may be very large, return it modulo `10^9 + 7`.

### Example

```
Input: n = 2, maxValue = 5
Output: 10
Explanation: [1,1], [1,2], [1,3], [1,4], [1,5], [2,2], [2,4], [3,3], [4,4], [5,5]
```

## Approach

Use combinatorics with prime factorization. For each starting value, count the number of ways to extend the chain by multiplying by prime factors. Use dynamic programming to count sequences of length exactly `n`.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int IdealArrays(int n, int maxValue)
    {
        long result = 0;
        var dp = new long[maxValue + 1, 15];
        
        for (int i = 1; i <= maxValue; i++)
        {
            dp[i, 1] = 1;
        }
        
        for (int len = 1; len < Math.Min(n, 14); len++)
        {
            for (int val = 1; val <= maxValue; val++)
            {
                if (dp[val, len] == 0) continue;
                
                for (int mult = 2; val * mult <= maxValue; mult++)
                {
                    dp[val * mult, len + 1] = (dp[val * mult, len + 1] + dp[val, len]) % MOD;
                }
            }
        }
        
        for (int val = 1; val <= maxValue; val++)
        {
            for (int len = 1; len <= Math.Min(n, 14); len++)
            {
                result = (result + dp[val, len] * Comb(n - 1, len - 1)) % MOD;
            }
        }
        
        return (int)result;
    }
    
    private long Comb(int n, int k)
    {
        if (k > n || k < 0) return 0;
        if (k == 0 || k == n) return 1;
        
        long result = 1;
        for (int i = 0; i < k; i++)
        {
            result = result * (n - i) / (i + 1);
        }
        return result % MOD;
    }
}
```

## Complexity

- **Time:** O(maxValue × 14 × maxValue)
- **Space:** O(maxValue)
