# 3176. Find the Maximum Length of a Good Subsequence I

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Hash Table

## Problem
Given an integer array `nums` and an integer `k`, find the length of the longest subsequence such that there are at most `k` indices in the subsequence where consecutive elements differ (i.e., the subsequence is allowed to have up to `k` "breaks" where `seq[i] != seq[i + 1]`).

## Approach
Use dynamic programming where `dp[count][num]` tracks the maximum length of a good subsequence that uses exactly `count` mismatches so far and currently ends with value `num`. Also maintain `maxLen[count]`, the best subsequence length achievable using at most `count` mismatches overall. Process the array left to right; for each number, and for each mismatch budget from `k` down to `0`, first try extending a same-valued subsequence ending in `num` by one (a "free" append with no new mismatch), then try extending the best subsequence with one fewer mismatch budget by switching to `num` (introducing a new mismatch). Update `dp` and `maxLen` accordingly. The final answer is `maxLen[k]`.

## C# Solution
```csharp
public class Solution {
    public int MaximumLength(int[] nums, int k) {
        Dictionary<int, int>[] dp = new Dictionary<int, int>[k + 1];
        for (int i = 0; i <= k; i++)
            dp[i] = new Dictionary<int, int>();
        int[] maxLen = new int[k + 1];

        foreach (int num in nums) {
            for (int count = k; count >= 0; count--) {
                int cur = dp[count].GetValueOrDefault(num, 0) + 1;
                if (count > 0)
                    cur = Math.Max(cur, maxLen[count - 1] + 1);
                dp[count][num] = cur;
                maxLen[count] = Math.Max(maxLen[count], cur);
            }
        }

        return maxLen[k];
    }
}
```

## Complexity
- Time: O(n * k)
- Space: O(n * k)
