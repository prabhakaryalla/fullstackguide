# 2507. Smallest Value After Replacing With Sum of Prime Factors

**Difficulty:** Medium
**Category:** Array, Math, Number Theory

## Problem

You are given a positive integer `n`. Continuously replace `n` with the sum of its prime factors. Repeat this operation until `n` does not change anymore. Return the smallest value `n` will take on.

### Example

```
Input: n = 15
Output: 5
Explanation: 
15 = 3 × 5, sum = 3 + 5 = 8
8 = 2 × 2 × 2, sum = 2 + 2 + 2 = 6
6 = 2 × 3, sum = 2 + 3 = 5
5 is prime, so we stop. Answer is 5.
```

## Approach

Repeatedly factorize the number and sum its prime factors (with multiplicity). Continue until the value stabilizes (i.e., when the number becomes prime or reaches a fixed point). To factorize, divide by all primes starting from 2.

## C# Solution

```csharp
public class Solution
{
    public int SmallestValue(int n)
    {
        while (true)
        {
            int sum = GetPrimeFactorSum(n);
            if (sum == n) break;
            n = sum;
        }
        return n;
    }
    
    private int GetPrimeFactorSum(int n)
    {
        int sum = 0;
        
        for (int i = 2; i * i <= n; i++)
        {
            while (n % i == 0)
            {
                sum += i;
                n /= i;
            }
        }
        
        if (n > 1)
        {
            sum += n;
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(sqrt(n) × log(n)) for the factorization iterations
- **Space:** O(1)
