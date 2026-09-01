# 3339. Find the Number of K-Even Arrays

**Difficulty:** Medium
**Category:** Math, Combinatorics
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given integers `n`, `m`, and `k`, count the number of arrays of length `n` where each element is an integer between `1` and `m` (inclusive), such that **exactly `k`** of the elements are even. Return the count modulo `10^9 + 7`.

### Example

Input: `n = 3, m = 4, k = 1`

Output: `24`

Explanation: There are `C(3,1) = 3` ways to choose which position is even, 2 even values (2 or 4) for that position, and 2 odd values (1 or 3) for each of the other two positions: `3 * 2 * 2 * 2 = 24`.

## Approach
This is a direct combinatorics count: choose which `k` of the `n` positions are even (`C(n, k)` ways), then independently assign each even position one of `⌊m/2⌋` even values and each odd position one of `m - ⌊m/2⌋` odd values. Multiply these together, computing the binomial coefficient and powers modulo `10^9 + 7` using a modular inverse (via Fermat's little theorem) for the division in `C(n, k)`.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int CountKEvenArrays(int n, int m, int k) 
    {
        long evenChoices = m / 2;
        long oddChoices = m - evenChoices;

        long ways = Combination(n, k);
        ways = ways * Power(evenChoices, k) % MOD;
        ways = ways * Power(oddChoices, n - k) % MOD;
        return (int)ways;
    }

    private long Combination(int n, int k) 
    {
        long num = 1, den = 1;
        for (int i = 0; i < k; i++) 
        {
            num = num * ((n - i) % MOD) % MOD;
            den = den * (i + 1) % MOD;
        }
        return num * Power(den, MOD - 2) % MOD;
    }

    private long Power(long b, long e) 
    {
        b %= MOD;
        long result = 1;
        while (e > 0) 
        {
            if ((e & 1) == 1) result = result * b % MOD;
            b = b * b % MOD;
            e >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(k + log MOD)
- **Space:** O(1)
