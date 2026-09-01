# 2927. Distribute Candies Among Children III

**Difficulty:** Hard
**Category:** Math, Combinatorics
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You have `n` candies and want to distribute them among 3 children such that no child gets more than `limit` candies. Return the number of ways to distribute the candies. Answer modulo 10^9 + 7.

### Example

```
Input: n = 5, limit = 2
Output: 3
Explanation: (2,2,1), (2,1,2), (1,2,2) are valid distributions.
```

## Approach

Use stars and bars combinatorics with inclusion-exclusion principle. Total ways without limits is C(n+2, 2). Subtract cases where at least one child exceeds the limit using inclusion-exclusion. For each child exceeding, calculate C(n-limit-1+2, 2) and apply PIE.

## C# Solution

```csharp
public class Solution 
{
    public long DistributeCandies(int n, int limit) 
    {
        const long MOD = 1000000007;
        
        long total = Combination(n + 2, 2, MOD);
        long exceed1 = Combination(n - limit - 1 + 2, 2, MOD);
        long exceed2 = Combination(n - 2 * (limit + 1) + 2, 2, MOD);
        
        long result = (total - 3 * exceed1 + 3 * exceed2 + MOD * 3) % MOD;
        return result;
    }
    
    private long Combination(int n, int r, long mod) 
    {
        if (n < r || n < 0 || r < 0) return 0;
        if (r == 0 || r == n) return 1;
        
        long numerator = 1;
        for (int i = 0; i < r; i++) 
        {
            numerator = (numerator * (n - i)) % mod;
        }
        
        long denominator = 1;
        for (int i = 1; i <= r; i++) 
        {
            denominator = (denominator * i) % mod;
        }
        
        return (numerator * ModInverse(denominator, mod)) % mod;
    }
    
    private long ModInverse(long a, long mod) 
    {
        return ModPow(a, mod - 2, mod);
    }
    
    private long ModPow(long baseNum, long exp, long mod) 
    {
        long result = 1;
        baseNum %= mod;
        while (exp > 0) 
        {
            if ((exp & 1) == 1) result = (result * baseNum) % mod;
            baseNum = (baseNum * baseNum) % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(limit + log MOD)
- **Space:** O(1)
