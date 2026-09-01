# 1175. Prime Arrangements

**Difficulty:** Easy
**Category:** Math

## Problem

Return the number of permutations of the integers `1` to `n` such that every prime number ends up at a prime index, modulo `10^9 + 7`.

### Example

```
Input: n = 5
Output: 12
```

## Approach

Prime numbers must occupy prime-indexed positions, and composite numbers (plus `1`) must occupy the remaining positions — the two groups of positions can independently be filled in any order. Count how many primes exist in `[2, n]`; the answer is `(count of primes)! * (count of non-primes)! mod (10^9 + 7)`.

## C# Solution

```csharp
public class Solution
{
    public int NumPrimeArrangements(int n)
    {
        const int MOD = 1_000_000_007;
        int primeCount = 0;

        for (int i = 2; i <= n; i++)
        {
            if (IsPrime(i)) primeCount++;
        }

        long result = Factorial(primeCount, MOD) * Factorial(n - primeCount, MOD) % MOD;
        return (int)result;
    }

    private bool IsPrime(int num)
    {
        if (num < 2) return false;
        for (int i = 2; (long)i * i <= num; i++)
        {
            if (num % i == 0) return false;
        }
        return true;
    }

    private long Factorial(int num, int mod)
    {
        long result = 1;
        for (int i = 2; i <= num; i++) result = result * i % mod;
        return result;
    }
}
```

## Complexity

- **Time:** `O(n√n)` for the prime sieve-by-trial-division.
- **Space:** `O(1)`.
