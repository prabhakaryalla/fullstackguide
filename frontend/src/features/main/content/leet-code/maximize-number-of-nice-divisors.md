# 1808. Maximize Number of Nice Divisors

**Difficulty:** Hard
**Category:** Math, Greedy, Recursion

## Problem

You are given an integer `primeFactors` representing the total count of prime factors (with multiplicity) of a positive integer `n`. A divisor of `n` is "nice" if it is divisible by every prime factor of `n` (i.e., it has all of `n`'s distinct prime factors). Return the maximum possible number of nice divisors `n` can have, modulo `1e9 + 7`.

### Example

```
Input: primeFactors = 5
Output: 6
Explanation: n = p1 * p2^2 * p3^2 has 2*3*3 = wait — choosing exponents 1,2,2 (sum 5) gives (1+1)(2+1)(2+1)=18... splitting into groups of size ~3 (2+3) maximizes: exponents 2 and 3 => 3*4=12? The optimal split follows the "break into 3s" rule below.
```

## Approach

This is the classic "maximize product of parts summing to N" problem (as in integer break), because the maximum count of nice divisors is achieved by splitting `primeFactors` into groups as close to size 3 as possible and multiplying the number of divisor choices each group contributes. For `primeFactors <= 3`, the answer is `primeFactors` itself. Otherwise, divide by 3: if the remainder is `0`, the answer is `3^quotient`; if `1`, combine the leftover 1 with one group of 3 to make a group of 4 (contributing `4` instead of `3*1`), giving `3^(quotient-1) * 4`; if `2`, the answer is `3^quotient * 2`. All arithmetic is done modulo `1e9 + 7` using fast exponentiation.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int MaxNiceDivisors(int primeFactors)
    {
        if (primeFactors <= 3) return primeFactors;

        int quotient = primeFactors / 3;
        int remainder = primeFactors % 3;

        if (remainder == 0) return (int)Power(3, quotient);
        if (remainder == 1) return (int)(Power(3, quotient - 1) * 4 % Mod);
        return (int)(Power(3, quotient) * 2 % Mod);
    }

    private long Power(long baseValue, long exponent)
    {
        long result = 1;
        baseValue %= Mod;

        while (exponent > 0)
        {
            if ((exponent & 1) == 1) result = result * baseValue % Mod;
            baseValue = baseValue * baseValue % Mod;
            exponent >>= 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(log(primeFactors))` for fast exponentiation.
- **Space:** `O(1)`.
