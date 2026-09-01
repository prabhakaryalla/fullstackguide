# 2572. Count the Number of Square-Free Subsets

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Bit Manipulation, Bitmask

## Problem

You are given a positive integer array `nums`.

An element in the array is square-free if it is not divisible by any perfect square other than 1.

Return the number of subsets of `nums` that are square-free. Since the answer may be too large, return it modulo `10^9 + 7`.

A subset is a selection of elements (possibly none) from `nums` where every element appears at most once.

### Example

```
Input: nums = [3,4,4,5]
Output: 3
Explanation:
Square-free subsets: [], [3], [5], [3,5]
Wait, 4 is not square-free (divisible by 4)
Actually count all valid subsets carefully

Input: nums = [1]
Output: 2
Explanation: [] and [1]
```

## Approach

Use bitmask DP. Represent the prime factorization of each number as a bitmask (only primes up to 30 matter for numbers ≤ 30).

For each number:
- If it contains a squared prime factor, skip it
- Otherwise, compute its prime bitmask
- Use DP: `dp[mask]` = number of ways to form subsets with prime set `mask`

Special case: The number 1 can be added to any subset, multiplying the count by powers of 2.

## C# Solution

```csharp
public class Solution
{
    public int SquareFreeSubsets(int[] nums)
    {
        const int MOD = 1_000_000_007;
        int[] primes = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 };
        
        // Precompute masks for numbers 2-30
        int[] masks = new int[31];
        for (int i = 2; i <= 30; i++)
        {
            int mask = 0;
            int temp = i;
            bool isSquareFree = true;
            
            for (int j = 0; j < primes.Length && primes[j] * primes[j] <= temp; j++)
            {
                int count = 0;
                while (temp % primes[j] == 0)
                {
                    count++;
                    temp /= primes[j];
                }
                if (count > 1)
                {
                    isSquareFree = false;
                    break;
                }
                if (count == 1)
                    mask |= (1 << j);
            }
            
            if (temp > 1)
            {
                for (int j = 0; j < primes.Length; j++)
                {
                    if (primes[j] == temp)
                    {
                        mask |= (1 << j);
                        break;
                    }
                }
            }
            
            masks[i] = isSquareFree ? mask : -1;
        }
        
        long[] dp = new long[1024];
        dp[0] = 1;
        int ones = 0;
        
        foreach (int num in nums)
        {
            if (num == 1)
            {
                ones++;
            }
            else if (num <= 30 && masks[num] != -1)
            {
                int mask = masks[num];
                for (int prev = 1023; prev >= 0; prev--)
                {
                    if ((prev & mask) == 0)
                    {
                        dp[prev | mask] = (dp[prev | mask] + dp[prev]) % MOD;
                    }
                }
            }
        }
        
        long result = 0;
        for (int i = 0; i < 1024; i++)
            result = (result + dp[i]) % MOD;
        
        // Multiply by 2^ones (each 1 can be included or not)
        for (int i = 0; i < ones; i++)
            result = (result * 2) % MOD;
        
        return (int)((result - 1 + MOD) % MOD); // Subtract empty subset
    }
}
```

## Complexity

- **Time:** O(n × 2^10) where 10 is the number of primes ≤ 30
- **Space:** O(2^10) for DP array
