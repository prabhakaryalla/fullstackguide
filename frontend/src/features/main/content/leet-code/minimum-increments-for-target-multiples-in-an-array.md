# 3444. Minimum Increments for Target Multiples in an Array

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation, Bitmask

## Problem
You are given two arrays `nums` and `target`. In one operation you may increment any element of `nums` by 1. Return the minimum number of operations such that for every element `t` in `target`, there exists at least one element in `nums` that is divisible by `t`.

## Approach
Use bitmask DP over the elements of `target` (size up to 4). For each element of `nums`, and for each non-empty subset `mask` of `target` indices, compute the cost to round that element up to the LCM of the subset (the minimum increments needed to become divisible by all targets in that subset). Then run a DP over `nums` where `dp[i][mask]` = minimum cost using the first `i` numbers to have covered `mask` of the target indices. Transition: skip the current number (`dp[i-1][mask]`), or assign it to cover subset `sub` of the remaining uncovered targets, paying the precomputed rounding cost, combined with `dp[i-1][mask \ sub]`. The answer is `dp[n][fullMask]`.

## C# Solution

```csharp
public class Solution 
{
    public long MinimumIncrements(int[] nums, int[] target) 
    {
        int n = nums.Length;
        int m = target.Length;
        int fullMask = (1 << m) - 1;

        // Precompute LCM for every subset of target
        long[] lcm = new long[1 << m];
        lcm[0] = 1;
        for (int mask = 1; mask <= fullMask; mask++)
        {
            int lowBit = mask & (-mask);
            int idx = System.Numerics.BitOperations.TrailingZeroCount(lowBit);
            lcm[mask] = Lcm(lcm[mask & (mask - 1)], target[idx]);
            if (lcm[mask] > 100000) lcm[mask] = 100001; // cap to avoid overflow blowup
        }

        long[] dp = new long[1 << m];
        for (int mask = 1; mask <= fullMask; mask++) dp[mask] = long.MaxValue / 2;
        dp[0] = 0;

        foreach (int num in nums)
        {
            long[] ndp = (long[])dp.Clone();
            for (int mask = 0; mask <= fullMask; mask++)
            {
                if (dp[mask] == long.MaxValue / 2) continue;
                int remaining = fullMask & ~mask;
                for (int sub = remaining; sub > 0; sub = (sub - 1) & remaining)
                {
                    long l = lcm[sub];
                    long cost = (l - (num % l)) % l;
                    long total = dp[mask] + cost;
                    int newMask = mask | sub;
                    if (total < ndp[newMask]) ndp[newMask] = total;
                }
            }
            dp = ndp;
        }

        return dp[fullMask];
    }

    private long Gcd(long a, long b) => b == 0 ? a : Gcd(b, a % b);
    private long Lcm(long a, long b) => a / Gcd(a, b) * b;
}
```

## Complexity

- **Time:** O(n * 3^m) where m = target.Length (subset enumeration over remaining bits)
- **Space:** O(2^m)
