# 3336. Find the Number of Subsequences With Equal GCD

**Difficulty:** Hard
**Category:** Array, Math, Dynamic Programming, Number Theory

## Problem

Given an integer array `nums`, count the number of pairs of non-empty, disjoint subsequences `(seq1, seq2)` (no shared index) such that `gcd(seq1) == gcd(seq2)`. Return the count modulo `10^9 + 7`.

### Example

Input: `nums = [1,1,1,1]`

Output: `50`

## Approach

Use DP over states `(g1, g2)` representing "current GCD of elements assigned to seq1" and "current GCD of elements assigned to seq2", where `0` means the sequence hasn't been started yet. Process `nums` one element at a time; for each existing state, the current element can be:
- Skipped entirely.
- Added to seq1, updating `g1` to `gcd(g1, nums[i])` (or just `nums[i]` if `g1` was 0).
- Added to seq2, updating `g2` symmetrically.

At the end, sum `dp[g][g]` over all `g >= 1` (both sequences non-empty and equal GCD).

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int SubsequencePairCount(int[] nums) 
    {
        int maxVal = 200;
        int n = nums.Length;
        long[,] dp = new long[maxVal + 1, maxVal + 1];
        dp[0, 0] = 1;

        for (int idx = 0; idx < n; idx++)
        {
            int v = nums[idx];
            long[,] ndp = new long[maxVal + 1, maxVal + 1];
            for (int g1 = 0; g1 <= maxVal; g1++)
            {
                for (int g2 = 0; g2 <= maxVal; g2++)
                {
                    long ways = dp[g1, g2];
                    if (ways == 0) continue;

                    ndp[g1, g2] = (ndp[g1, g2] + ways) % MOD;

                    int ng1 = g1 == 0 ? v : Gcd(g1, v);
                    ndp[ng1, g2] = (ndp[ng1, g2] + ways) % MOD;

                    int ng2 = g2 == 0 ? v : Gcd(g2, v);
                    ndp[g1, ng2] = (ndp[g1, ng2] + ways) % MOD;
                }
            }
            dp = ndp;
        }

        long ans = 0;
        for (int g = 1; g <= maxVal; g++) ans = (ans + dp[g, g]) % MOD;
        return (int)ans;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** O(n * maxVal^2) where maxVal = 200.
- **Space:** O(maxVal^2) for the DP table.
