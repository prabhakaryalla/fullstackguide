# 3107. Minimum Operations to Make Median of Array Equal to K

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

You are given an integer array `nums` and an integer `k`. In one operation you may increase or decrease any element by `1`. Return the minimum number of operations needed so that the median of `nums` equals `k`.

## Approach

Sort the array. The median lives at index `n / 2` (using integer division for the standard "lower/at" median convention). Every element at or before the median position must end up `>= k` (otherwise the median couldn't be `k`), so only elements below `k` there need raising; every element at or after the median position must end up `<= k`, so only elements above `k` there need lowering. Sum the required changes: `max(0, nums[i] - k)` for the lower half's excess above `k` (elements before the median must not exceed... more precisely, for the first half up to the median, any value already `>= k` needs no change since the median only cares about position n/2 itself and the elements before it just need to not force the median down — the standard technique sums `max(0, nums[i]-k)` for indices `<= n/2` and `max(0, k-nums[i])` for indices `>= n/2`, which correctly zeroes out already-compliant elements).

## C# Solution

```csharp
public class Solution {
    public long MinOperationsToMakeMedianK(int[] nums, int k) {
        int n = nums.Length;
        long ans = 0;
        Array.Sort(nums);

        for (int i = 0; i <= n / 2; i++)
            ans += Math.Max(0, nums[i] - k);
        for (int i = n / 2; i < n; i++)
            ans += Math.Max(0, k - nums[i]);

        return ans;
    }
}
```

## Complexity

- Time: O(n log n) — dominated by sorting.
- Space: O(1) — beyond the input array.
