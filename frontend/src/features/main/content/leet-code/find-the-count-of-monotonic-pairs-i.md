# 3250. Find the Count of Monotonic Pairs I

**Difficulty:** Hard
**Category:** Array, Combinatorics, Dynamic Programming, Math, Prefix Sum

## Problem
Given an array of non-negative integers, count the number of ways to split each element `nums[i]` into two non-negative parts `arr1[i] + arr2[i] = nums[i]`, such that the resulting array `arr1` is non-decreasing and `arr2` is non-increasing. Return the count modulo `10^9 + 7`.

## Approach
Use dynamic programming where `dp[i][num]` represents the number of valid ways to fill `arr1` and `arr2` up to index `i`, given that `arr1[i] = num`. For the base case, any value of `arr1[0]` from 0 to `nums[0]` is valid (one way each). For subsequent indices, `arr1[i] = num` is valid if there's a compatible `arr1[i-1] = prevNum` such that `prevNum <= num` (non-decreasing arr1) and `nums[i-1] - prevNum >= nums[i] - num` (non-increasing arr2, rearranged as `prevNum <= num - (nums[i] - nums[i-1])`). Since the valid range of `prevNum` only grows by at most 1 as `num` increases by 1, maintain a running cumulative sum (`ways`) and a pointer (`prevNum`) that only ever increments, avoiding the need for a full nested loop. Sum all `dp[n-1][*]` values for the final answer.

## C# Solution
```csharp
public class Solution {
    public int CountOfPairs(int[] nums) {
        const int kMod = 1_000_000_007;
        const int kMax = 1000;
        int n = nums.Length;
        int ans = 0;
        int[][] dp = new int[n][];
        for (int i = 0; i < n; i++) dp[i] = new int[kMax + 1];

        for (int num = 0; num <= nums[0]; num++)
            dp[0][num] = 1;

        for (int i = 1; i < n; i++) {
            int ways = 0;
            int prevNum = 0;
            for (int num = 0; num <= nums[i]; num++) {
                if (prevNum <= Math.Min(num, num - (nums[i] - nums[i - 1]))) {
                    ways = (ways + dp[i - 1][prevNum]) % kMod;
                    prevNum++;
                }
                dp[i][num] = ways;
            }
        }

        for (int i = 0; i <= kMax; i++)
            ans = (int)((ans + (long)dp[n - 1][i]) % kMod);

        return ans;
    }
}
```

## Complexity
- Time: O(n * max(nums))
- Space: O(n * max(nums))
