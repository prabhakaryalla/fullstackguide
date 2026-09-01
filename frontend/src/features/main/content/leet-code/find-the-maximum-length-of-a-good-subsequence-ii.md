# 3177. Find the Maximum Length of a Good Subsequence II

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Hash Table

## Problem
This is the harder-constraints version of "Find the Maximum Length of a Good Subsequence I": given an integer array `nums` and an integer `k`, find the length of the longest subsequence with at most `k` indices where consecutive elements in the subsequence differ, but now with a much larger array size requiring an efficient solution.

## Approach
The same dynamic programming idea from the easier version applies, since it already runs in roughly O(n * k) time using hash maps rather than allocating full O(n * k) arrays. Maintain `dp[count]`, a map from a value to the best subsequence length ending in that value using exactly `count` mismatches, plus a rolling `maxLen[count]` array tracking the best overall length using at most `count` mismatches. For each element in the array, iterate mismatch counts from `k` down to `0`, updating both the per-value map and the rolling maximum, exactly as before. Because the array only needs to touch actual encountered values (via dictionaries) rather than the full value range, this comfortably scales to the larger constraints.

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
- Space: O(n * k) in the worst case, but typically much less since only encountered values are stored
