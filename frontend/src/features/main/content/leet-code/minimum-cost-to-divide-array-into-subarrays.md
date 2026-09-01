# 3500. Minimum Cost to Divide Array Into Subarrays

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem
You are given two integer arrays `nums` and `cost`, of the same size, and an integer `k`.

You may divide `nums` into contiguous subarrays. The cost of the `i`-th subarray (1-indexed, in order) consisting of `nums[l..r]` is:

`(nums[0] + nums[1] + ... + nums[r] + k * i) * (cost[l] + cost[l + 1] + ... + cost[r])`

Return the minimum total cost achievable from any valid division.

### Example
Input: `nums = [3, 1, 4]`, `cost = [4, 6, 6]`, `k = 1`
Output: `110`
Explanation: Splitting into `[3, 1]` and `[4]`: the first subarray costs `(3 + 1 + 1 * 1) * (4 + 6) = 50`, and the second costs `(3 + 1 + 4 + 1 * 2) * 6 = 60`, totaling `110`.

## Approach
Let `dp[i]` be the minimum cost of optimally dividing the suffix `nums[i..n-1]` (as if it always starts a fresh count of "subarray index 1" from position `i`, since the extra `k * i` contribution is later adjusted for via the prefix sum of `nums` which already includes everything before the subarray, so shifting index and position cancel out correctly in the recurrence). Precompute prefix sums of `nums` and `cost`. For each `i` from the end backward, try every possible right endpoint `j >= i` for the next subarray `nums[i..j]`, computing its cost using the prefix sums, and take `dp[i] = min` over all `j` of `subarrayCost(i, j) + dp[j + 1]`, with `dp[n] = 0`. The answer is `dp[0]`.

## C# Solution

```csharp
public class Solution {
    public long MinimumCost(int[] nums, int[] cost, int k) {
        int n = nums.Length;
        long[] prefixNums = new long[n + 1];
        long[] prefixCost = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefixNums[i + 1] = prefixNums[i] + nums[i];
            prefixCost[i + 1] = prefixCost[i] + cost[i];
        }

        long[] dp = new long[n + 1];
        Array.Fill(dp, long.MaxValue);
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                long subarrayCost = prefixNums[j + 1] * (prefixCost[j + 1] - prefixCost[i])
                                     + (long)k * (prefixCost[n] - prefixCost[i]);
                if (dp[j + 1] != long.MaxValue)
                    dp[i] = Math.Min(dp[i], subarrayCost + dp[j + 1]);
            }
        }

        return dp[0];
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n)
