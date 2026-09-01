# 3141. Maximum Hamming Distances

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Breadth-First Search, Dynamic Programming

## Problem

You are given an integer array `nums` where every value fits in `m` bits, and an integer `m`. For every element of `nums`, return the maximum Hamming distance (number of differing bits) to **any** value in `nums` (including possibly itself), among all `2^m` possible `m`-bit values — but the answer is the maximum distance from that element's value to the *closest* value actually present in `nums`... more precisely: for each `nums[i]`, return the maximum over all numbers in `nums` of the Hamming distance to `nums[i]`.

## Approach

Think of this as a multi-source shortest-path / DP over the hypercube of `m`-bit values: `dp[mask]` will represent the maximum Hamming distance from `mask` to the *nearest* value present in `nums` (seed `dp[num] = 0` for every value actually in `nums`, everything else starts at negative infinity). Process bit by bit: for each bit position, relaxing `dp[mask] = max(dp[mask], dp[mask XOR bit] + 1)` propagates the best achievable distance one hop across the hypercube per bit dimension, and after processing all `m` bits, `dp[mask]` holds the maximum Hamming distance from `mask` to the closest occupied value — repeated for every bit this effectively computes the maximum over *all* possible flip-distances (since this DP variant maximizes rather than minimizes, it ends up finding, for each mask, the best "farthest reachable in each hop" rather than nearest, matching the problem's "maximum Hamming distance to some value in nums" requirement).

## C# Solution

```csharp
public class Solution {
    public int[] MaxHammingDistances(int[] nums, int m) {
        int maxMask = 1 << m;
        int[] dp = new int[maxMask];
        Array.Fill(dp, int.MinValue);

        foreach (int num in nums)
            dp[num] = 0;

        for (int bit = 0; bit < m; bit++) {
            int[] newDp = new int[maxMask];
            for (int mask = 0; mask < maxMask; mask++)
                newDp[mask] = Math.Max(dp[mask], dp[mask ^ (1 << bit)] + 1);
            dp = newDp;
        }

        int[] ans = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++)
            ans[i] = dp[nums[i]];

        return ans;
    }
}
```

## Complexity

- Time: O(m * 2^m) — m passes over all 2^m masks.
- Space: O(2^m) — the DP array.
