# 2930. Number of Strings Which Can Be Rearranged to Contain Substring

**Difficulty:** Medium
**Category:** Math, Combinatorics, String

## Problem

Return the number of strings of length `n` using lowercase English letters that can be rearranged to contain the substring "leet". Answer modulo 10^9 + 7.

### Example

```
Input: n = 4
Output: 12
Explanation: Strings like "eetl", "eelt", "leet", etc. can form "leet".
```

## Approach

Use inclusion-exclusion. Total strings of length n is 26^n. Subtract strings missing at least one of 'l', 'e', 'e', 't'. A string must have at least 1 'l', 2 'e's, and 1 't'. Use PIE to count strings missing required characters.

## C# Solution

```csharp
public class Solution 
{
    public int StringCount(int n) 
    {
        const long MOD = 1000000007;
        
        long total = ModPow(26, n, MOD);
        long without_l = ModPow(25, n, MOD);
        long without_e = ModPow(25, n, MOD);
        long without_e_twice = (n * ModPow(25, n - 1, MOD)) % MOD;
        long without_t = ModPow(25, n, MOD);
        
        long result = total;
        result = (result - without_l + MOD) % MOD;
        result = (result - without_e + MOD) % MOD;
        result = (result - without_t + MOD) % MOD;
        result = (result - without_e_twice + MOD) % MOD;
        
        long with_l_only = ModPow(24, n, MOD);
        result = (result + 3 * with_l_only) % MOD;
        
        long with_le = (n * ModPow(24, n - 1, MOD)) % MOD;
        result = (result + 3 * with_le) % MOD;
        
        long with_all_but_2e = (n * (n - 1) / 2 % MOD * ModPow(24, n - 2, MOD)) % MOD;
        result = (result - with_all_but_2e + MOD) % MOD;
        
        return (int)result;
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

- **Time:** O(log n)
- **Space:** O(1)
