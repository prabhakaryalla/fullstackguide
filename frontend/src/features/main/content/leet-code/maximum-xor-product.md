# 2939. Maximum Xor Product

**Difficulty:** Medium
**Category:** Bit Manipulation, Greedy

## Problem

Given three integers `a`, `b`, and `n`, find a value `x` (0 <= x < 2^n) that maximizes `(a XOR x) * (b XOR x)`. Return the maximum product modulo 10^9 + 7.

### Example

```
Input: a = 12, b = 5, n = 4
Output: 98
Explanation: Choose x = 2, giving (12 XOR 2) * (5 XOR 2) = 14 * 7 = 98.
```

## Approach

For bits >= n, they are fixed in a and b. For bits < n, we can choose each bit of x to maximize the product. Use a greedy approach: for each bit position from high to low, try setting it to maximize the product of the two XOR results. Generally, balance the two numbers to avoid one being much smaller.

## C# Solution

```csharp
public class Solution 
{
    public int MaximumXorProduct(long a, long b, int n) 
    {
        const long MOD = 1000000007;
        
        for (int i = n - 1; i >= 0; i--) 
        {
            long bit = 1L << i;
            long aBit = a & bit;
            long bBit = b & bit;
            
            if (aBit == bBit) 
            {
                a |= bit;
                b |= bit;
            } 
            else 
            {
                if (a < b) 
                {
                    a |= bit;
                    b &= ~bit;
                } 
                else 
                {
                    b |= bit;
                    a &= ~bit;
                }
            }
        }
        
        a %= MOD;
        b %= MOD;
        return (int)((a * b) % MOD);
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
