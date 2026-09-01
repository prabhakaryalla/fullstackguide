# 2601. Prime Subtraction Operation

**Difficulty:** Medium
**Category:** Array, Math, Binary Search, Greedy, Number Theory

## Problem

You are given a 0-indexed integer array `nums` of length `n`. You can perform the following operation on the array any number of times:

- Pick an index `i` that you haven't picked before and choose a prime number `p` strictly less than `nums[i]`, then subtract `p` from `nums[i]`.

Return `true` if you can make `nums` a strictly increasing array using these operations, otherwise return `false`. A strictly increasing array is one where each element is strictly greater than its preceding element.

### Example

```
Input: nums = [4,9,6,10]
Output: true
Explanation: We can subtract primes to make [1,2,3,10], which is strictly increasing.
```

## Approach

Work from right to left through the array. For each element, greedily subtract the largest possible prime that keeps the element strictly less than the next element. Use the Sieve of Eratosthenes to precompute all primes up to 1000. If at any point an element cannot be made strictly less than its successor, return false.

## C# Solution

```csharp
public class Solution
{
    public bool PrimeSubOperation(int[] nums)
    {
        int maxVal = nums.Max();
        bool[] isPrime = SieveOfEratosthenes(maxVal);
        
        for (int i = nums.Length - 2; i >= 0; i--)
        {
            if (nums[i] < nums[i + 1])
                continue;
            
            bool found = false;
            for (int p = nums[i] - 1; p >= 2; p--)
            {
                if (isPrime[p] && nums[i] - p < nums[i + 1])
                {
                    nums[i] -= p;
                    found = true;
                    break;
                }
            }
            
            if (!found)
                return false;
        }
        
        return true;
    }
    
    private bool[] SieveOfEratosthenes(int n)
    {
        bool[] isPrime = new bool[n + 1];
        for (int i = 2; i <= n; i++)
            isPrime[i] = true;
        
        for (int i = 2; i * i <= n; i++)
        {
            if (isPrime[i])
            {
                for (int j = i * i; j <= n; j += i)
                    isPrime[j] = false;
            }
        }
        
        return isPrime;
    }
}
```

## Complexity

- **Time:** O(n × maxVal + maxVal log log maxVal) — sieve construction plus checking primes for each element
- **Space:** O(maxVal) — for the sieve array
