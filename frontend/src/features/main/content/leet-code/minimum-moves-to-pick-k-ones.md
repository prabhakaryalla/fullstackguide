# 3086. Minimum Moves to Pick K Ones

**Difficulty:** Hard
**Category:** Array, Greedy, Prefix Sum, Sliding Window

## Problem

You are given a 0-indexed binary array `nums`, and integers `k` and `maxChanges`. You (starting at any index) may repeatedly perform one of: (1) if the current index holds `0` and `maxChanges > 0`, flip it to `1` (using up one change) and immediately collect it for free — cost `0`, or (2) move to an adjacent index — cost `1` per step — collecting a `1` if present. Return the minimum total cost to collect exactly `k` ones.

## Approach

Every collected "1" is gathered either by a free flip-and-collect near the starting position (cost `2` each once you also account for arriving there) or by physically walking to an existing `1` (cost equal to distance). The optimal strategy picks a small window of existing ones around a chosen center, walking to collect them (cost = sum of distances, minimized by centering the window at its median), and uses flips for the rest (up to `maxChanges`, each flip-collect costing exactly `2`). Precompute prefix sums of the one-indices, then try every valid split between "collected by walking" (a contiguous window of already-present ones) and "collected by flipping," taking the minimum total cost.

## C# Solution

```csharp
public class Solution {
    public long MinimumMoves(int[] nums, int k, int maxChanges) {
        const int kNumOfIndicesWithinOneDistance = 3;
        long ans = long.MaxValue;

        var oneIndices = new List<int>();
        for (int i = 0; i < nums.Length; i++)
            if (nums[i] == 1)
                oneIndices.Add(i);

        var prefix = new List<long> { 0 };
        foreach (int oneIndex in oneIndices)
            prefix.Add(prefix[^1] + oneIndex);

        int minOnesByTwo = Math.Max(0, k - maxChanges);
        int maxOnesByTwo = Math.Min(k, Math.Min(minOnesByTwo + kNumOfIndicesWithinOneDistance, oneIndices.Count));

        for (int onesByTwo = minOnesByTwo; onesByTwo <= maxOnesByTwo; onesByTwo++) {
            for (int l = 0; l + onesByTwo < prefix.Count; l++) {
                int r = l + onesByTwo;
                long cost1 = (long)(k - onesByTwo) * 2;
                long cost2 = (prefix[r] - prefix[(l + r) / 2]) - (prefix[(l + r + 1) / 2] - prefix[l]);
                ans = Math.Min(ans, cost1 + cost2);
            }
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n) — the window search is bounded by a small constant range of `onesByTwo` values.
- Space: O(n) — the list of one-indices and their prefix sums.
