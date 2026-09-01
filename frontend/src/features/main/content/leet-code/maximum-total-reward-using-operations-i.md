# 3180. Maximum Total Reward Using Operations I

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem
You are given an array of distinct reward values. You may repeatedly pick any reward value that is strictly greater than your current total accumulated reward, and add it to your total. Determine the maximum total reward achievable using this rule, given that each value can only be used once.

## Approach
Since each `rewardValues[i]` is bounded, the maximum possible achievable total is less than double the maximum single reward value. Use a bitset-style boolean DP array `dp` where `dp[x]` indicates whether total reward `x` is currently achievable. Initialize `dp[0] = true`. Process reward values in increasing order (this ordering is essential, since the rule requires the picked value to exceed the current total, meaning any achievable total using only smaller or equal values remains valid as a "starting point" before adding the current, larger value). For each value `num`, take all currently-achievable totals strictly less than `num` (since only those satisfy the "strictly greater" condition relative to `num`... more precisely, the achievable totals we're allowed to extend are those less than `num`), and mark achievable the totals extended by `num`. The final answer is the largest index in `dp` marked true.

## C# Solution
```csharp
public class Solution {
    public int MaxTotalReward(int[] rewardValues) {
        const int kPossibleRewards = 100_000;
        bool[] dp = new bool[kPossibleRewards];
        dp[0] = true;

        Array.Sort(rewardValues);

        foreach (int num in rewardValues) {
            for (int total = Math.Min(kPossibleRewards, 2 * num) - 1; total >= num; total--) {
                if (dp[total - num])
                    dp[total] = true;
            }
        }

        for (int ans = kPossibleRewards - 1; ans >= 0; ans--)
            if (dp[ans])
                return ans;

        return 0;
    }
}
```

## Complexity
- Time: O(n * maxReward)
- Space: O(maxReward)
