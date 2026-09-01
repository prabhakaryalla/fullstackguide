# 3770. Largest Prime from Consecutive Prime Sum

**Difficulty:** Medium
**Category:** Array, Math, Number Theory

## Problem

Given an integer `n`, return the largest prime number less than or equal to `n` that can be expressed as the sum of one or more consecutive primes starting from 2. If none exists, return `0`.

### Example

Input: `n = 20`
Output: `17`

`2 = 2`, `5 = 2+3`, `17 = 2+3+5+7` are all consecutive-prime sums `<= 20` that are themselves prime; the largest is 17.

## Approach

Sieve all primes up to `n`. Accumulate consecutive primes starting from 2 into a running sum; whenever the sum is `<= n` and is itself prime (checked via the sieve), update the answer. Stop once the running sum exceeds `n`.

## C# Solution

```csharp
public class Solution 
{
    public int LargestPrime(int n) 
    {
        if (n < 2) return 0;
        bool[] composite = new bool[n + 1];
        for (int i = 2; (long)i * i <= n; i++)
        {
            if (!composite[i])
                for (int j = i * i; j <= n; j += i)
                    composite[j] = true;
        }

        int best = 0;
        long sum = 0;
        for (int p = 2; p <= n; p++)
        {
            if (composite[p]) continue;
            sum += p;
            if (sum > n) break;
            if (!composite[(int)sum]) best = (int)sum;
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n log log n)
- **Space:** O(n)
