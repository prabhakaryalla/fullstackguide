# 1735. Count Ways to Make Array With Product

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Combinatorics, Number Theory

## Problem

Given `queries` where `queries[i] = [ni, ki]`, for each query count the number of arrays of `ni` positive integers whose product equals `ki`, modulo `10^9 + 7`.

### Example

```
Input: queries = [[2,6],[5,1],[73,660]]
Output: [4,1,50734910]
```

## Approach

Factorize `k` into primes. Distributing the exponent `e` of a prime among `n` distinguishable array slots is a classic stars-and-bars count: `C(e + n - 1, n - 1)`. Multiply the counts across all prime factors of `k` (they are independent). Precompute factorials and inverse factorials up to a safe bound to answer each binomial coefficient in `O(1)`.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;
    private const int MaxN = 20000;
    private static readonly long[] Fact = new long[MaxN + 1];
    private static readonly long[] InvFact = new long[MaxN + 1];

    static Solution()
    {
        Fact[0] = 1;
        for (int i = 1; i <= MaxN; i++) Fact[i] = Fact[i - 1] * i % Mod;
        InvFact[MaxN] = ModPow(Fact[MaxN], Mod - 2, Mod);
        for (int i = MaxN; i > 0; i--) InvFact[i - 1] = InvFact[i] * i % Mod;
    }

    public IList<int> WaysToFillArray(int[][] queries)
    {
        var result = new List<int>();
        foreach (var q in queries)
        {
            int n = q[0], k = q[1];
            long ways = 1;
            int num = k;

            for (int p = 2; (long)p * p <= num; p++)
            {
                if (num % p == 0)
                {
                    int exp = 0;
                    while (num % p == 0) { num /= p; exp++; }
                    ways = ways * NCR(exp + n - 1, n - 1) % Mod;
                }
            }
            if (num > 1) ways = ways * NCR(n, n - 1) % Mod;

            result.Add((int)ways);
        }
        return result;
    }

    private static long NCR(int a, int b)
    {
        if (b < 0 || b > a) return 0;
        return Fact[a] * InvFact[b] % Mod * InvFact[a - b] % Mod;
    }

    private static long ModPow(long baseValue, long exp, long mod)
    {
        long result = 1;
        baseValue %= mod;
        while (exp > 0)
        {
            if ((exp & 1) == 1) result = result * baseValue % mod;
            baseValue = baseValue * baseValue % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** `O(sqrt(k))` per query after `O(MaxN)` precomputation.
- **Space:** `O(MaxN)` for the factorial tables.
