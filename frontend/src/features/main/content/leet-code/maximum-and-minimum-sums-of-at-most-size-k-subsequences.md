# 3428. Maximum and Minimum Sums of at Most Size K Subsequences

**Difficulty:** Medium
**Category:** Array, Math, Combinatorics

## Problem

You are given an integer array `nums` and an integer `k`. Return the sum, over every non-empty subsequence of `nums` with size **at most** `k`, of `(max(subsequence) + min(subsequence))`, modulo `10^9 + 7`.

### Example

`nums = [1,2,3]`, `k = 2`

Subsequences of size at most 2 (by chosen indices): `[1]`,`[2]`,`[3]`,`[1,2]`,`[1,3]`,`[2,3]`.
`max+min` values: `2, 4, 6, 3, 4, 5`. Sum = `24`.

## Approach

Sort `nums`. For each index `i` (0-indexed, ascending), consider `nums[i]` as the **maximum** of a subsequence: the other elements must come from the `i` elements before it. Choosing `s` of those (where subsequence size is `s+1 <= k`) contributes `C(i, s)` subsequences with `nums[i]` as max, for `s` from `0` to `min(k-1, i)`.

Symmetrically, consider `nums[i]` as the **minimum**: the other elements come from the `n-1-i` elements after it, contributing `C(n-1-i, s)` subsequences for `s` from `0` to `min(k-1, n-1-i)`.

Sum `nums[i] * (ways as max)` and `nums[i] * (ways as min)` over all `i`, using precomputed factorials/inverse factorials modulo `10^9+7` for the binomial coefficients.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int MinMaxSums(int[] nums, int k) 
    {
        int n = nums.Length;
        Array.Sort(nums);

        long[] fact = new long[n + 1];
        long[] invFact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) 
        {
            fact[i] = fact[i - 1] * i % MOD;
        }
        invFact[n] = ModPow(fact[n], MOD - 2, MOD);
        for (int i = n - 1; i >= 0; i--) 
        {
            invFact[i] = invFact[i + 1] * (i + 1) % MOD;
        }

        long totalMax = 0;
        long totalMin = 0;

        for (int i = 0; i < n; i++) 
        {
            int maxChooseFrom = i;
            int minChooseFrom = n - 1 - i;

            long waysAsMax = SumCombinations(fact, invFact, maxChooseFrom, Math.Min(k - 1, maxChooseFrom));
            long waysAsMin = SumCombinations(fact, invFact, minChooseFrom, Math.Min(k - 1, minChooseFrom));

            totalMax = (totalMax + (long)nums[i] * waysAsMax) % MOD;
            totalMin = (totalMin + (long)nums[i] * waysAsMin) % MOD;
        }

        return (int)((totalMax + totalMin) % MOD);
    }

    private long SumCombinations(long[] fact, long[] invFact, int total, int maxS) 
    {
        long sum = 0;
        for (int s = 0; s <= maxS; s++) 
        {
            sum = (sum + Combination(fact, invFact, total, s)) % MOD;
        }
        return sum;
    }

    private long Combination(long[] fact, long[] invFact, int total, int choose) 
    {
        if (choose < 0 || choose > total) 
        {
            return 0;
        }
        return fact[total] * invFact[choose] % MOD * invFact[total - choose] % MOD;
    }

    private long ModPow(long baseVal, long exp, long mod) 
    {
        long result = 1;
        baseVal %= mod;
        while (exp > 0) 
        {
            if ((exp & 1) == 1) 
            {
                result = result * baseVal % mod;
            }
            baseVal = baseVal * baseVal % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n * k)
- **Space:** O(n)
