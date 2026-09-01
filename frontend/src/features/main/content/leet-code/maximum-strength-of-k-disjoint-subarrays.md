# 3077. Maximum Strength of K Disjoint Subarrays

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

Given a 0-indexed integer array `nums` and an integer `k`, choose `k` disjoint, non-empty subarrays `s1, s2, ..., sk` (in left-to-right order). The "strength" of the selection is the alternating-sign weighted sum: `sum1*k - sum2*(k-1) + sum3*(k-2) - ... `, where `sumi` is the sum of the `i`-th chosen subarray. Return the maximum strength achievable.

## Approach

Use memoized recursion over the state `(index, remainingSubarrays, isFreshStart)`, mirroring a "choose k disjoint subarrays" DP: at each position, either skip it (only allowed right after finishing a subarray), include it while continuing the current subarray, or include it while starting a brand-new subarray (consuming one of the `remainingSubarrays` slots). The sign and multiplier for including `nums[i]` depend only on how many subarrays remain to be chosen (`remainingSubarrays`), since the weighting is based on subarray order from left to right.

## C# Solution

```csharp
public class Solution {
    private const long KMin = long.MinValue / 2;
    private int[] nums = Array.Empty<int>();
    private Dictionary<long, long> memo = new Dictionary<long, long>();

    public long MaximumStrength(int[] nums, int k) {
        this.nums = nums;
        memo.Clear();
        return Solve(0, k, true);
    }

    // Returns the maximum strength achievable from nums[i..n) using `remaining`
    // more subarrays, where `fresh` means we may start a brand-new subarray here.
    private long Solve(int i, int remaining, bool fresh) {
        if (nums.Length - i < remaining)
            return KMin;
        if (remaining == 0)
            return 0;
        if (i == nums.Length)
            return KMin;

        long key = ((long)i << 20) | ((long)remaining << 1) | (fresh ? 1 : 0);
        if (memo.TryGetValue(key, out long cached))
            return cached;

        long skip = fresh ? Solve(i + 1, remaining, true) : KMin;
        long gain = (remaining % 2 == 0 ? -1L : 1L) * nums[i] * remaining;
        long includeAndContinue = Solve(i + 1, remaining, false) + gain;
        long includeAndFreshStart = Solve(i + 1, remaining - 1, true) + gain;

        long result = Math.Max(skip, Math.Max(includeAndContinue, includeAndFreshStart));
        memo[key] = result;
        return result;
    }
}
```

## Complexity

- Time: O(n * k) — bounded by the number of distinct `(index, remaining, fresh)` states.
- Space: O(n * k) — the memoization table.
