# 3654. Minimum Sum After Divisible Sum Deletions

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Sum, Hash Map

## Problem
You are given an integer array `nums` and an integer `k`. You may repeatedly delete any contiguous subarray whose sum is divisible by `k` (the subarray must be non-empty). After performing any number of such deletions (the remaining elements re-concatenate after each deletion), you want to minimize the sum of the elements that remain. Return the minimum possible sum of the remaining array.

## Approach
Deleting a contiguous subarray with sum divisible by `k` is equivalent, in terms of final achievable remaining sums, to choosing a subsequence of indices to delete such that the deleted indices can be partitioned into contiguous (in the original array) runs whose sums are each divisible by `k`. A classic way to model "maximize total deleted sum" is with prefix sums modulo `k`: consider prefix sum array `P[0..n]`. Any subarray `(i+1..j)` with sum divisible by `k` corresponds to `P[j] ≡ P[i] (mod k)`. We want to select a maximum-weight set of non-overlapping such intervals to delete, maximizing total deleted sum, then the answer is `totalSum - maxDeletedSum`.

Use dynamic programming: let `dp[j]` = the maximum sum that can be deleted using array positions `1..j` (prefix index). `dp[j] = max(dp[j-1], max over i < j with P[i] ≡ P[j] (mod k) of dp[i] + (P[j] - P[i]))`. Rewrite as `dp[j] = max(dp[j-1], P[j] + max over i with P[i] ≡ P[j] (mod k) of (dp[i] - P[i]))`. Maintain, for each residue class mod `k`, the best value of `dp[i] - P[i]` seen so far, updated as `j` increases. This gives an O(n) (after grouping by residue with a hash map) DP. Final answer is `totalSum - dp[n]`.

## C# Solution

```csharp
public class Solution 
{
    public long MinArraySum(int[] nums, int k) 
    {
        int n = nums.Length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

        long totalSum = prefix[n];
        long[] dp = new long[n + 1];
        // bestByResidue[r] = max(dp[i] - prefix[i]) among i processed so far with prefix[i] % k == r
        var bestByResidue = new Dictionary<long, long>();

        int Mod(long p, int m) => (int)(((p % m) + m) % m);

        bestByResidue[Mod(prefix[0], k)] = dp[0] - prefix[0];

        for (int j = 1; j <= n; j++)
        {
            dp[j] = dp[j - 1];
            int residue = Mod(prefix[j], k);
            if (bestByResidue.TryGetValue(residue, out long best))
            {
                dp[j] = Math.Max(dp[j], prefix[j] + best);
            }

            long candidate = dp[j] - prefix[j];
            if (!bestByResidue.TryGetValue(residue, out long existing) || candidate > existing)
            {
                bestByResidue[residue] = candidate;
            }
        }

        return totalSum - dp[n];
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(k) for the residue map (at most k distinct residues, plus O(n) for prefix/dp arrays)
