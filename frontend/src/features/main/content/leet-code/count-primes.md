# 204. Count Primes

**Difficulty:** Medium
**Category:** Array, Math, Enumeration, Number Theory

## Problem

Given an integer `n`, return the number of prime numbers strictly less than `n`.

### Example

```
n = 10 -> 4   (2, 3, 5, 7)
n = 0 -> 0
```

## Approach

Checking each number individually for primality is too slow at scale; instead use the Sieve of Eratosthenes: start assuming every number is prime, then for every prime found, mark all of its multiples as non-prime. Only need to sieve starting from `p * p` (smaller multiples are already marked by smaller primes), and only up to `sqrt(n)`.

## C# Solution

```csharp
public class Solution
{
    public int CountPrimes(int n)
    {
        if (n < 3) return 0;

        var isComposite = new bool[n];
        int count = 0;

        for (int i = 2; i < n; i++)
        {
            if (isComposite[i]) continue;

            count++;

            for (long j = (long)i * i; j < n; j += i)
            {
                isComposite[j] = true;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log log n)` — the classic sieve bound.
- **Space:** `O(n)` — for the composite-marking array.
