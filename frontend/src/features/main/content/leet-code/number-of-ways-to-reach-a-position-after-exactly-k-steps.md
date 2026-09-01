# 2400. Number of Ways to Reach a Position After Exactly k Steps

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Combinatorics

## Problem

You are given two positive integers `startPos` and `endPos`. Initially, you are standing at position `startPos` on an infinite number line. With one step, you can move either one position to the left or one position to the right.

Given a positive integer `k`, return the number of different ways to reach the position `endPos` starting from `startPos`, such that you perform exactly `k` steps. Since the answer may be very large, return it modulo `10^9 + 7`.

### Example

```
Input: startPos = 1, endPos = 2, k = 3
Output: 3
Explanation: Three ways: 1->2->1->2, 1->2->3->2, 1->0->1->2
```

## Approach

The difference between start and end determines minimum steps needed. Use combinatorics: if we need `diff` net right moves out of `k` total steps, we need `(k + diff) / 2` right steps and `(k - diff) / 2` left steps. Calculate using combinations with modular arithmetic.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int NumberOfWays(int startPos, int endPos, int k)
    {
        int diff = Math.Abs(endPos - startPos);
        
        if (diff > k || (k - diff) % 2 != 0)
        {
            return 0;
        }
        
        int right = (k + diff) / 2;
        int left = (k - diff) / 2;
        
        return (int)Combination(k, right);
    }
    
    private long Combination(int n, int k)
    {
        if (k > n - k) k = n - k;
        
        long result = 1;
        for (int i = 0; i < k; i++)
        {
            result = result * (n - i) % MOD;
            result = result * ModInverse(i + 1, MOD) % MOD;
        }
        
        return result;
    }
    
    private long ModInverse(long a, long mod)
    {
        return Power(a, mod - 2, mod);
    }
    
    private long Power(long x, long y, long mod)
    {
        long result = 1;
        x %= mod;
        
        while (y > 0)
        {
            if ((y & 1) == 1)
            {
                result = result * x % mod;
            }
            x = x * x % mod;
            y >>= 1;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(k)
- **Space:** O(1)
