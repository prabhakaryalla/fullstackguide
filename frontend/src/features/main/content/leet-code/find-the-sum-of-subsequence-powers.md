# 3098. Find the Sum of Subsequence Powers

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Sorting

## Problem

You are given an integer array `nums` and an integer `k`. The "power" of a sequence of `k` numbers is the minimum absolute difference between any two of its elements. Consider every subsequence of `nums` with exactly `k` elements; return the sum of the powers of all such subsequences, modulo `10^9 + 7`.

## Approach

Sort `nums` first — the minimum pairwise difference within any chosen subset only depends on **consecutive** elements once sorted, so tracking the previous picked value's index is enough context. Use memoized recursion over `(index, remainingToPick, lastPickedIndex, currentMinDiff)`: at each index, either skip it, or pick it (decrementing `remainingToPick`, and updating `currentMinDiff` with the gap to the last picked element). When `remainingToPick` reaches `0`, the accumulated `currentMinDiff` is exactly that subsequence's power, contributing to the sum.

## C# Solution

```csharp
public class Solution {
    private const int Mod = 1_000_000_007;
    private int[] nums = Array.Empty<int>();
    private int n;
    private Dictionary<(int i, int k, int lastPickIndex, long minDiff), long> memo =
        new Dictionary<(int, int, int, long), long>();

    public int SumOfPowers(int[] nums, int k) {
        Array.Sort(nums);
        this.nums = nums;
        n = nums.Length;
        memo.Clear();
        return (int)Dp(0, k, -1, long.MaxValue);
    }

    // Returns the sum of powers of all ways to pick `k` more elements from
    // nums[i..n), given the index of the last picked element and the minimum
    // gap accumulated so far.
    private long Dp(int i, int k, int lastPickIndex, long minDiff) {
        if (k == 0)
            return minDiff;
        if (i == n)
            return 0;

        var key = (i, k, lastPickIndex, minDiff);
        if (memo.TryGetValue(key, out long cached))
            return cached;

        long newMinDiff = lastPickIndex == -1
            ? minDiff
            : Math.Min(minDiff, nums[i] - nums[lastPickIndex]);

        long pick = Dp(i + 1, k - 1, i, newMinDiff);
        long skip = Dp(i + 1, k, lastPickIndex, minDiff);
        long result = (pick + skip) % Mod;

        memo[key] = result;
        return result;
    }
}
```

## Complexity

- Time: O(n^2 * k) — bounded by the distinct `(index, remaining, lastPickIndex)` states, each considering O(n) possible minDiff values.
- Space: O(n^2 * k) — the memoization table.
