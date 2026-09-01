# 3317. Find the Number of Possible Ways for an Event

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Combinatorics

## Problem

You are given three integers `n`, `x`, and `y`.

An event is held for `n` performers, each assigned to one of `x` stages (some stages may remain empty). Each resulting band (a non-empty group of performers on the same stage) is awarded a score in `[1, y]`.

Return the total number of possible ways the event can take place, modulo `10^9 + 7`.

### Example

Input: `n = 1, x = 2, y = 3`

Output: `6`

Explanation: 2 ways to assign the stage, times 3 possible scores.

## Approach

Fix the number of stages `k` that actually end up with at least one performer, for `k` from `1` to `min(n, x)`:
- Choose which `k` of the `x` stages are used: `C(x, k)` ways.
- Count the number of ways to assign `n` performers onto exactly `k` labeled stages such that none is empty (a surjection count), using inclusion–exclusion: `surj(n, k) = sum_{i=0}^{k} (-1)^i * C(k, i) * (k - i)^n`.
- Each of the `k` bands gets an independent score in `[1, y]`: `y^k` ways.

Sum `C(x, k) * surj(n, k) * y^k` over all valid `k`, modulo `10^9 + 7`.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int NumberOfWays(int n, int x, int y) 
    {
        int maxN = Math.Max(n, x);
        long[] fact = new long[maxN + 1];
        long[] invFact = new long[maxN + 1];
        fact[0] = 1;
        for (int i = 1; i <= maxN; i++) fact[i] = fact[i - 1] * i % MOD;
        invFact[maxN] = ModPow(fact[maxN], MOD - 2);
        for (int i = maxN; i > 0; i--) invFact[i - 1] = invFact[i] * i % MOD;

        long C(int a, int b)
        {
            if (b < 0 || b > a) return 0;
            return fact[a] * invFact[b] % MOD * invFact[a - b] % MOD;
        }

        long ans = 0;
        int limit = Math.Min(n, x);
        for (int k = 1; k <= limit; k++)
        {
            long surj = 0;
            for (int i = 0; i <= k; i++)
            {
                long term = C(k, i) * ModPow(k - i, n) % MOD;
                surj = i % 2 == 0 ? (surj + term) % MOD : (surj - term + MOD) % MOD;
            }
            long ways = C(x, k) * surj % MOD * ModPow(y, k) % MOD;
            ans = (ans + ways) % MOD;
        }
        return (int)ans;
    }

    private long ModPow(long b, long e)
    {
        long r = 1;
        b %= MOD;
        if (b < 0) b += MOD;
        while (e > 0)
        {
            if ((e & 1) == 1) r = r * b % MOD;
            b = b * b % MOD;
            e >>= 1;
        }
        return r;
    }
}
```

## Complexity

- **Time:** O(min(n, x)^2 * log n) dominated by the modular exponentiation inside the double loop.
- **Space:** O(max(n, x)) for factorial tables.
