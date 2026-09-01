# 3610. Minimum Number of Primes to Sum to Target

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer `target`. You need to find the minimum number of prime numbers (not necessarily distinct) that sum up to `target`. Return the minimum count of primes required. If it is impossible, return -1.

### Example
Input: `target = 10`
Output: `2`
Explanation: `10 = 5 + 5` or `10 = 3 + 7`, using 2 primes.

## Approach
This is a classic unbounded coin-change style dynamic programming problem where the "coins" are prime numbers up to `target`.
1. Generate all primes up to `target` using a Sieve of Eratosthenes.
2. Use DP where `dp[i]` represents the minimum number of primes summing to `i`. Initialize `dp[0] = 0` and all others to infinity.
3. For each prime `p`, and for each value `i` from `p` to `target`, update `dp[i] = min(dp[i], dp[i - p] + 1)`.
4. Return `dp[target]` if it is finite, otherwise -1.

## C# Solution

```csharp
public class Solution 
{
    public int MinNumberOfPrimes(int target) 
    {
        bool[] isComposite = new bool[target + 1];
        var primes = new List<int>();
        for (int i = 2; i <= target; i++) 
        {
            if (!isComposite[i]) 
            {
                primes.Add(i);
                for (long j = (long)i * i; j <= target; j += i) 
                {
                    isComposite[j] = true;
                }
            }
        }

        int[] dp = new int[target + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        foreach (int p in primes) 
        {
            for (int i = p; i <= target; i++) 
            {
                if (dp[i - p] != int.MaxValue) 
                {
                    dp[i] = Math.Min(dp[i], dp[i - p] + 1);
                }
            }
        }

        return dp[target] == int.MaxValue ? -1 : dp[target];
    }
}
```

## Complexity

- **Time:** O(target * log(log(target)) + target * π(target)) where π(target) is the number of primes up to target
- **Space:** O(target)
