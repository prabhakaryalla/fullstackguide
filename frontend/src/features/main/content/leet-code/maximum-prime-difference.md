# 3115. Maximum Prime Difference

**Difficulty:** Easy
**Category:** Array, Math, Number Theory

## Problem

Given an integer array `nums`, return the maximum distance between the indices of two (not necessarily distinct) prime numbers in the array. There is guaranteed to be at least one prime.

### Example

```
Input: nums = [4,2,9,5,3]
Output: 3
Explanation: The primes are at indices 1 (2), 3 (5), and 4 (3). The max distance is 4 - 1 = 3.
```

## Approach

Precompute primality for every possible value up to the constraint bound with a sieve of Eratosthenes. Scan `nums` once, tracking the first index where a prime appears and continuously updating the last index where a prime appears. The answer is the difference between the last and first prime indices found.

## C# Solution

```csharp
public class Solution {
    public int MaximumPrimeDifference(int[] nums) {
        const int max = 100;
        bool[] isPrime = SieveEratosthenes(max + 1);
        int minPrimeIndex = -1, maxPrimeIndex = -1;

        for (int i = 0; i < nums.Length; i++) {
            if (isPrime[nums[i]]) {
                if (minPrimeIndex == -1)
                    minPrimeIndex = i;
                maxPrimeIndex = i;
            }
        }

        return maxPrimeIndex - minPrimeIndex;
    }

    private bool[] SieveEratosthenes(int n) {
        bool[] isPrime = new bool[n];
        Array.Fill(isPrime, true);
        isPrime[0] = false;
        isPrime[1] = false;
        for (int i = 2; (long)i * i < n; i++)
            if (isPrime[i])
                for (int j = i * i; j < n; j += i)
                    isPrime[j] = false;
        return isPrime;
    }
}
```

## Complexity

- Time: O(n + max log log max) — the sieve plus a linear scan of `nums`.
- Space: O(max) — the primality table.
