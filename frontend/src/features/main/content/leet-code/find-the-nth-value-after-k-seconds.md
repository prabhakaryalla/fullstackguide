# 3179. Find the N-th Value After K Seconds

**Difficulty:** Medium
**Category:** Array, Math, Combinatorics, Prefix Sum, Simulation

## Problem
You start with an array of `n` ones. Every second, each element is updated to be the sum of all elements from the beginning of the array up to and including itself from the previous second (i.e., a running prefix sum transformation applied simultaneously to the whole array). After `k` seconds, return the value of the last element, modulo `10^9 + 7`.

## Approach
Applying the prefix-sum transformation repeatedly for `k` steps to an all-ones array of length `n` produces a well-known combinatorial identity: the value of the last element after `k` steps equals `C(n + k - 1, n - 1)`, a "stars and bars" style binomial coefficient. Precompute factorials and modular inverse factorials up to `n + k - 1` using Fermat's little theorem (since the modulus is prime), then compute the binomial coefficient directly using these precomputed values.

## C# Solution
```csharp
public class Solution {
    private const long kMod = 1_000_000_007;

    public int ValueAfterKSeconds(int n, int k) {
        int limit = n + k - 1;
        long[] fact = new long[limit + 1];
        long[] invFact = new long[limit + 1];
        fact[0] = 1;
        for (int i = 1; i <= limit; i++)
            fact[i] = fact[i - 1] * i % kMod;
        invFact[limit] = ModPow(fact[limit], kMod - 2, kMod);
        for (int i = limit; i > 0; i--)
            invFact[i - 1] = invFact[i] * i % kMod;

        return (int)NCk(limit, n - 1, fact, invFact);
    }

    private long NCk(int n, int k, long[] fact, long[] invFact) {
        if (k < 0 || k > n) return 0;
        return fact[n] * invFact[k] % kMod * invFact[n - k] % kMod;
    }

    private long ModPow(long baseVal, long exp, long mod) {
        long result = 1;
        baseVal %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1)
                result = result * baseVal % mod;
            baseVal = baseVal * baseVal % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity
- Time: O(n + k)
- Space: O(n + k)
