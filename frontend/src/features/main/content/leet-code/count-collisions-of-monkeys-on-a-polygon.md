# 2550. Count Collisions of Monkeys on a Polygon

**Difficulty:** Medium
**Category:** Math, Recursion

## Problem

There are `n` monkeys standing at the vertices of a convex polygon. Each monkey moves clockwise to the next vertex at the same time. We want to count how many ways the monkeys can move such that at least two monkeys collide (meet at the same vertex at some point).

Return the count modulo `10^9 + 7`.

### Example

```
Input: n = 3
Output: 6
Explanation: Total ways = 2^n = 8. Ways without collision = 2 (all clockwise or all counter-clockwise). Collisions = 8 - 2 = 6.
```

## Approach

Each monkey can move in 2 directions independently, giving `2^n` total configurations. Only 2 configurations avoid collisions: all move clockwise, or all move counter-clockwise. The answer is `2^n - 2`.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int MonkeyMove(int n)
    {
        long total = ModPow(2, n, MOD);
        long result = (total - 2 + MOD) % MOD;
        return (int)result;
    }
    
    private long ModPow(long baseVal, int exp, long mod)
    {
        long result = 1;
        baseVal %= mod;
        
        while (exp > 0)
        {
            if (exp % 2 == 1)
            {
                result = (result * baseVal) % mod;
            }
            baseVal = (baseVal * baseVal) % mod;
            exp /= 2;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
