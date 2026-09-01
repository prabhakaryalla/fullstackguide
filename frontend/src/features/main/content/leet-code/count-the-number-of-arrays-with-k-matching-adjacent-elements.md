# 3405. Count the Number of Arrays with K Matching Adjacent Elements

**Difficulty:** Hard
**Category:** Math, Combinatorics

## Problem

You are given three integers `n`, `m`, and `k`. Consider all arrays of size `n` where each element is an integer from `1` to `m`. Return the number of such arrays where exactly `k` indices `i` (where `1 <= i < n`) satisfy `arr[i-1] == arr[i]`.

Since the answer may be large, return it modulo `10^9 + 7`.

### Example

`n = 3`, `m = 2`, `k = 1`

We need exactly 1 adjacent matching pair among the 2 adjacent gaps. Choose which of the 2 gaps is "equal": `C(2,1) = 2` ways. The first element has `m = 2` choices, and each of the remaining `2 - 1 = 1` "different" transitions has `m - 1 = 1` choice. Total: `2 * 2 * 1 = 4`.

## Approach

Choose which `k` of the `n-1` adjacent gaps are "equal" transitions: `C(n-1, k)` ways. The first element has `m` possible values. Every one of the remaining `n-1-k` gaps must be a "different" transition, each independently offering `m-1` choices (regardless of grouping, since it only needs to differ from its immediate predecessor).

This gives the closed-form formula:

$$
\text{answer} = C(n-1, k) \cdot m \cdot (m-1)^{n-1-k} \pmod{10^9+7}
$$

Precompute factorials and modular inverses (via Fermat's little theorem, since the modulus is prime) to compute the binomial coefficient, and use fast exponentiation for the power term.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int CountGoodArrays(int n, int m, int k) 
    {
        if (k < 0 || k > n - 1) 
        {
            return 0;
        }

        long[] fact = new long[n];
        long[] invFact = new long[n];
        fact[0] = 1;
        for (int i = 1; i < n; i++) 
        {
            fact[i] = fact[i - 1] * i % MOD;
        }
        invFact[n - 1] = ModPow(fact[n - 1], MOD - 2, MOD);
        for (int i = n - 2; i >= 0; i--) 
        {
            invFact[i] = invFact[i + 1] * (i + 1) % MOD;
        }

        long comb = fact[n - 1] * invFact[k] % MOD * invFact[n - 1 - k] % MOD;
        long result = comb * m % MOD;
        result = result * ModPow(m - 1, n - 1 - k, MOD) % MOD;
        return (int)result;
    }

    private long ModPow(long baseVal, long exp, long mod) 
    {
        baseVal %= mod;
        if (baseVal < 0) 
        {
            baseVal += mod;
        }
        long result = 1;
        while (exp > 0) 
        {
            if ((exp & 1) == 1) 
            {
                result = result * baseVal % mod;
            }
            baseVal = baseVal * baseVal % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
