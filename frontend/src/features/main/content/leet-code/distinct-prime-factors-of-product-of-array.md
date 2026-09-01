# 2521. Distinct Prime Factors of Product of Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Number Theory

## Problem

Given an array of positive integers `nums`, return the number of distinct prime factors in the product of all elements in `nums`.

### Example

```
Input: nums = [2,4,3,7,10,6]
Output: 4
Explanation: The product is 2×4×3×7×10×6 = 10080 = 2^5 × 3^2 × 5 × 7. The distinct prime factors are {2, 3, 5, 7}, so the answer is 4.
```

## Approach

Instead of computing the entire product (which can overflow), find the prime factors of each individual number and collect all distinct primes in a set. For each number, factorize it and add all its prime factors to the set. The size of the set is the answer.

## C# Solution

```csharp
public class Solution
{
    public int DistinctPrimeFactors(int[] nums)
    {
        HashSet<int> primes = new HashSet<int>();
        
        foreach (int num in nums)
        {
            int n = num;
            
            for (int i = 2; i * i <= n; i++)
            {
                if (n % i == 0)
                {
                    primes.Add(i);
                    while (n % i == 0)
                    {
                        n /= i;
                    }
                }
            }
            
            if (n > 1)
            {
                primes.Add(n);
            }
        }
        
        return primes.Count;
    }
}
```

## Complexity

- **Time:** O(n × sqrt(max_num)) where n is the length of nums
- **Space:** O(k) where k is the number of distinct prime factors
