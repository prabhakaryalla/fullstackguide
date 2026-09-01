# 2761. Prime Pairs With Target Sum

**Difficulty:** Medium
**Category:** Array, Math, Enumeration, Number Theory

## Problem

You are given an integer `n`. We say that two integers `x` and `y` form a prime number pair if:
- `1 <= x <= y <= n`
- `x + y == n`
- `x` and `y` are prime numbers

Return the 2D sorted list of prime number pairs `[xi, yi]`. The list should be sorted in increasing order of `xi`. If there are no prime number pairs at all, return an empty array.

### Example

```
Input: n = 10
Output: [[3,7],[5,5]]
Explanation: 3+7=10 and 5+5=10, both pairs consist of primes.
```

## Approach

Use Sieve of Eratosthenes to find all primes up to `n`. Then iterate through primes up to `n/2` and check if `n - prime` is also prime.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FindPrimePairs(int n)
    {
        var result = new List<IList<int>>();
        
        if (n <= 2) return result;
        
        var isPrime = SieveOfEratosthenes(n);
        
        for (int x = 2; x <= n / 2; x++)
        {
            if (isPrime[x] && isPrime[n - x])
            {
                result.Add(new List<int> { x, n - x });
            }
        }
        
        return result;
    }
    
    private bool[] SieveOfEratosthenes(int n)
    {
        var isPrime = new bool[n + 1];
        Array.Fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        
        for (int i = 2; i * i <= n; i++)
        {
            if (isPrime[i])
            {
                for (int j = i * i; j <= n; j += i)
                {
                    isPrime[j] = false;
                }
            }
        }
        
        return isPrime;
    }
}
```

## Complexity

- **Time:** O(n log log n)
- **Space:** O(n)
