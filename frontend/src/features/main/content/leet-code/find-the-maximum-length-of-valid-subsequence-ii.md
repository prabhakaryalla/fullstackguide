# 3202. Find the Maximum Length of Valid Subsequence II

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Math

## Problem
This is the generalized version of "Find the Maximum Length of Valid Subsequence I": given an integer array `nums` and an integer `k`, a subsequence is "valid" if the sum of every pair of consecutive elements in the subsequence, taken modulo `k`, is the same constant value. Return the length of the longest valid subsequence.

## Approach
Generalize the parity-transition DP idea to modulo `k` instead of modulo 2. Maintain a `k x k` table `dp[i][j]`, representing the longest valid subsequence ending with a number congruent to `i` mod `k`, where the next number needed must be congruent to `j` mod `k` (so that `i + j` is fixed as the required constant sum mod k for the whole subsequence). For each number `x` in the array, and each possible `y` from 0 to k-1, update `dp[x%k][y] = dp[y][x%k] + 1`. The final answer is the maximum value found across the entire table.

## C# Solution
```csharp
public class Solution {
    public int MaximumLength(int[] nums, int k) {
        int[,] dp = new int[k, k];

        foreach (int x in nums) {
            for (int y = 0; y < k; y++)
                dp[x % k, y] = dp[y, x % k] + 1;
        }

        int ans = 0;
        for (int i = 0; i < k; i++)
            for (int j = 0; j < k; j++)
                ans = Math.Max(ans, dp[i, j]);

        return ans;
    }
}
```

## Complexity
- Time: O(k^2 + n * k)
- Space: O(k^2)
