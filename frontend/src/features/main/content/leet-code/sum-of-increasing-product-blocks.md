# 3792. Sum of Increasing Product Blocks

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` of length `n`. A **block** is a contiguous subarray. Split `nums` into consecutive, non-overlapping blocks that together cover the entire array, such that the **product of elements within each block**, read from the first block to the last block, forms a strictly increasing sequence. Among all such valid full partitions, return the **maximum possible sum** of the block products, modulo `10^9 + 7`. (Splitting the whole array into a single block is always a valid partition, so an answer always exists.)

## Approach
Use dynamic programming over prefix boundaries. Let `dp[i]` be the maximum achievable sum of block products for a valid partition of the prefix `nums[0..i-1]`, and let `lastProd[i]` be the product of the final block used to achieve that maximum for `dp[i]`. To compute `dp[i]`, try every previous split point `j` from `0` to `i - 1`: the candidate last block is `nums[j..i-1]`, whose product can be computed incrementally. This new block is only a legal extension of the partition ending at `j` if its product is strictly greater than `lastProd[j]` (or `j == 0`, meaning this is the first block with no constraint). Among all valid `j`, choose the one maximizing `dp[j] + product`, and record that `product` as the new `lastProd[i]`. The final answer is `dp[n]`.

## C# Solution

```csharp
public class Solution 
{
    public int SumOfIncreasingProductBlocks(int[] nums)
    {
        const long Mod = 1_000_000_007;
        int n = nums.Length;

        long[] dp = new long[n + 1];
        long[] lastProduct = new long[n + 1];
        bool[] reachable = new bool[n + 1];

        reachable[0] = true;
        lastProduct[0] = 0; // no previous block yet, so any first block product is allowed

        for (int i = 1; i <= n; i++)
        {
            long bestDp = -1;
            long bestLastProduct = 0;

            for (int j = 0; j < i; j++)
            {
                if (!reachable[j]) continue;

                long product = 1;
                for (int k = j; k < i; k++)
                {
                    product *= nums[k];
                }

                if (j == 0 || product > lastProduct[j])
                {
                    long candidate = (dp[j] + product) % Mod;
                    if (candidate > bestDp)
                    {
                        bestDp = candidate;
                        bestLastProduct = product;
                    }
                }
            }

            if (bestDp >= 0)
            {
                dp[i] = bestDp;
                lastProduct[i] = bestLastProduct;
                reachable[i] = true;
            }
        }

        return (int)(dp[n] % Mod);
    }
}
```

## Complexity

- **Time:** O(n^3) in the worst case (n split points, each recomputing a block product)
- **Space:** O(n)
