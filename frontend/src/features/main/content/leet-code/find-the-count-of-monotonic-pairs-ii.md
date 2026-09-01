# 3251. Find the Count of Monotonic Pairs II

**Difficulty:** Hard
**Category:** Array, Combinatorics, Dynamic Programming, Math, Prefix Sum

## Problem
This is the larger-constraints version of "Find the Count of Monotonic Pairs I": given an array of non-negative integers, count the number of ways to split each element into two non-negative parts such that one resulting array is non-decreasing and the other is non-increasing, modulo `10^9 + 7`, now for a larger array size.

## Approach
The identical dynamic programming approach from the smaller-constraints version applies directly, since it already runs in O(n * max(nums)) time using a running-pointer technique to avoid repeated inner-loop scans. Maintain `dp[i][num]` for the number of valid configurations ending with `arr1[i] = num`, using the same incrementally-advancing `prevNum` pointer per row transition to keep the overall complexity linear in `max(nums)` per row.

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
