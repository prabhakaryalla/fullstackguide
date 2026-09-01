# 3201. Find the Maximum Length of Valid Subsequence I

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem
Given an integer array `nums`, a subsequence is "valid" if the parity of the sum of every pair of consecutive elements in the subsequence is the same (i.e., `(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ...`). Return the length of the longest valid subsequence.

## Approach
A valid subsequence's consecutive-pair parity pattern is fully determined by tracking, for each parity transition `(lastParity, nextDesiredParity)`, the best achievable length so far. Maintain a 2x2 table `dp[i][j]` representing the longest valid subsequence ending with a number of parity `i`, where the next number needed to continue the pattern must have parity `j` (to preserve a consistent alternating-or-repeating parity-sum pattern). For each number in the array, update `dp[x%2][y] = dp[y][x%2] + 1` for every possible `y` in {0, 1}, extending previously built patterns. The final answer is the maximum value across the entire table.

## C# Solution
```csharp
public class Solution {
    public int MaximumLength(int[] nums) {
        int[,] dp = new int[2, 2];

        foreach (int x in nums) {
            for (int y = 0; y < 2; y++)
                dp[x % 2, y] = dp[y, x % 2] + 1;
        }

        int ans = 0;
        for (int i = 0; i < 2; i++)
            for (int j = 0; j < 2; j++)
                ans = Math.Max(ans, dp[i, j]);

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
