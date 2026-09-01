# 2584. Split the Array to Make Coprime Products

**Difficulty:** Hard
**Category:** Array, Math, Number Theory

## Problem

You are given a 0-indexed integer array `nums` of length `n`. A split at an index `i` where `0 <= i <= n - 2` is valid if the product of the first `i + 1` elements and the product of the remaining elements are coprime (their greatest common divisor is 1).

Return the smallest index `i` at which the array can be split validly, or -1 if no such split exists.

### Example

```
Input: nums = [4,7,8,15,3,5]
Output: 2
Explanation: 
Product of nums[0..2] = 4 * 7 * 8 = 224
Product of nums[3..5] = 15 * 3 * 5 = 225
GCD(224, 225) = 1, so they are coprime
```

## Approach

Instead of calculating actual products (which can overflow), we track the prime factors that appear in each segment. A split is valid if the left and right segments share no prime factors. We use a set to track which primes appear on the right, and for each potential split, check if any prime from the left also appears on the right.

For each number, we find its prime factors. We precompute all primes appearing in the right segment, then iterate left-to-right, moving primes from right to left and checking for overlap.

## C# Solution

```csharp
public class Solution
{
    public int FindValidSplit(int[] nums)
    {
        int n = nums.Length;
        var rightPrimes = new Dictionary<int, int>();
        
        for (int i = 0; i < n; i++)
        {
            foreach (int prime in GetPrimeFactors(nums[i]))
            {
                rightPrimes[prime] = rightPrimes.GetValueOrDefault(prime) + 1;
            }
        }
        
        var leftPrimes = new HashSet<int>();
        
        for (int i = 0; i < n - 1; i++)
        {
            foreach (int prime in GetPrimeFactors(nums[i]))
            {
                leftPrimes.Add(prime);
                rightPrimes[prime]--;
                if (rightPrimes[prime] == 0)
                {
                    rightPrimes.Remove(prime);
                }
            }
            
            bool coprime = true;
            foreach (int prime in leftPrimes)
            {
                if (rightPrimes.ContainsKey(prime))
                {
                    coprime = false;
                    break;
                }
            }
            
            if (coprime) return i;
        }
        
        return -1;
    }
    
    private List<int> GetPrimeFactors(int num)
    {
        var factors = new List<int>();
        
        for (int i = 2; i * i <= num; i++)
        {
            if (num % i == 0)
            {
                factors.Add(i);
                while (num % i == 0)
                {
                    num /= i;
                }
            }
        }
        
        if (num > 1) factors.Add(num);
        
        return factors;
    }
}
```

## Complexity

- **Time:** O(n * sqrt(M)) where M is the maximum value in nums
- **Space:** O(n * P) where P is the average number of prime factors per number
