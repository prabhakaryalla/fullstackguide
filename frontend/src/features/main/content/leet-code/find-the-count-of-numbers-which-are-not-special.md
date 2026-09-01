# 3233. Find the Count of Numbers Which Are Not Special

**Difficulty:** Medium
**Category:** Array, Math, Number Theory

## Problem
Given two positive integers `l` and `r`, call a number "special" if it has exactly 2 divisors (i.e., it's the square of a prime number, since a number with exactly 2 divisors total, counting itself, must be `p^2` for prime `p` — actually here "special" specifically means the number's square root is prime). Return the count of integers in the range `[l, r]` that are NOT special.

## Approach
A number `x` in `[l, r]` is special if and only if its square root is an integer and that integer is a prime number. Use the Sieve of Eratosthenes to precompute primality up to the square root of `r`. Then, count how many integers `p` (where `p` is prime and `p * p` falls within `[l, r]`) produce a special number. Subtract this count of special numbers from the total count of numbers in the range to get the count of non-special numbers.

## C# Solution
```csharp
public class Solution {
    public int NonSpecialCount(int l, int r) {
        int maxRoot = (int)Math.Sqrt(r);
        bool[] isPrime = SieveEratosthenes(maxRoot + 1);
        int specialCount = 0;

        for (int num = 2; (long)num * num <= r; num++)
            if (num <= maxRoot && isPrime[num] && l <= (long)num * num && (long)num * num <= r)
                specialCount++;

        return r - l + 1 - specialCount;
    }

    private bool[] SieveEratosthenes(int n) {
        bool[] isPrime = new bool[n];
        for (int i = 2; i < n; i++)
            isPrime[i] = true;
        for (int i = 2; (long)i * i < n; i++)
            if (isPrime[i])
                for (int j = i * i; j < n; j += i)
                    isPrime[j] = false;
        return isPrime;
    }
}
```

## Complexity
- Time: O(sqrt(r) log log sqrt(r))
- Space: O(sqrt(r))
