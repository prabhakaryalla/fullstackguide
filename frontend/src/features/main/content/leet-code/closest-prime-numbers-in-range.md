# 2523. Closest Prime Numbers in Range

**Difficulty:** Medium
**Category:** Math, Number Theory

## Problem

Given two positive integers `left` and `right`, find the two prime numbers `num1` and `num2` in the inclusive range `[left, right]` such that:
- `num1 < num2`
- `num2 - num1` is the minimum distance
- If there are multiple pairs with the same minimum distance, return the pair with the smaller `num1`

If there are fewer than two primes in the range, return `[-1, -1]`.

### Example

```
Input: left = 10, right = 19
Output: [11,13]
Explanation: The primes in [10,19] are 11, 13, 17, 19. The closest pair is (11,13) with distance 2.
```

## Approach

Use the Sieve of Eratosthenes to find all primes in the range. Then iterate through the primes to find the pair with minimum distance. Keep track of the best pair seen so far.

## C# Solution

```csharp
public class Solution
{
    public int[] ClosestPrimes(int left, int right)
    {
        List<int> primes = GetPrimes(left, right);
        
        if (primes.Count < 2)
        {
            return new int[] { -1, -1 };
        }
        
        int minDist = int.MaxValue;
        int[] result = { -1, -1 };
        
        for (int i = 1; i < primes.Count; i++)
        {
            int dist = primes[i] - primes[i - 1];
            if (dist < minDist)
            {
                minDist = dist;
                result[0] = primes[i - 1];
                result[1] = primes[i];
            }
        }
        
        return result;
    }
    
    private List<int> GetPrimes(int left, int right)
    {
        bool[] isPrime = new bool[right + 1];
        for (int i = 2; i <= right; i++)
        {
            isPrime[i] = true;
        }
        
        for (int i = 2; i * i <= right; i++)
        {
            if (isPrime[i])
            {
                for (int j = i * i; j <= right; j += i)
                {
                    isPrime[j] = false;
                }
            }
        }
        
        List<int> primes = new List<int>();
        for (int i = Math.Max(2, left); i <= right; i++)
        {
            if (isPrime[i])
            {
                primes.Add(i);
            }
        }
        
        return primes;
    }
}
```

## Complexity

- **Time:** O(n × log(log n)) for sieve where n = right
- **Space:** O(n) for the boolean array
