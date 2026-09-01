# 3013. Divide an Array Into Subarrays With Minimum Cost II

**Difficulty:** Hard
**Category:** Array, Hash Table, Sliding Window, Heap (Priority Queue)

## Problem

You are given a 0-indexed array `nums` of `n` integers, and integers `k` and `dist`. Split `nums` into exactly `k` disjoint contiguous subarrays such that the first subarray always starts at index `0`, and the starting indices of the remaining `k - 1` subarrays are all within a window of size `dist` (the largest chosen starting index minus the smallest chosen starting index, among those `k - 1` indices, is at most `dist`). The cost of a split is the sum of the first elements of all `k` subarrays. Return the minimum possible cost.

## Approach

Because the first subarray is fixed at index `0`, the problem reduces to: choose `k - 1` starting indices from `nums[1..]` such that they all fit inside some window of length `dist + 1`, minimizing their sum (plus the fixed `nums[0]`).

Slide a window of size `dist + 1` over `nums[1..]`. For each window, maintain two ordered multisets:

- `selected`: the `k - 1` smallest values currently in the window (the candidates for the split).
- `candidates`: the rest of the window's values, kept ready to promote if a smaller value leaves `selected`.

As the window slides, remove the value that fell out (from whichever set holds it) and insert the new value into `selected` if it beats the current maximum there, otherwise into `candidates`; then rebalance so `selected` always holds exactly `k - 1` elements — the smallest available. Track the minimum sum of `selected` seen across all valid windows.

C# has no built-in multiset, so pair each value with its array index to keep entries unique inside a `SortedSet<(int val, int idx)>`, which sorts by value first (ties broken by index).

## C# Solution

```csharp
public class Solution {
    public long MinimumCost(int[] nums, int k, int dist) {
        int n = nums.Length;
        var selected = new SortedSet<(int val, int idx)>();
        var candidates = new SortedSet<(int val, int idx)>();
        long windowSum = 0;

        for (int i = 1; i <= dist + 1; i++) {
            windowSum += nums[i];
            selected.Add((nums[i], i));
        }
        windowSum = Balance(windowSum, selected, candidates, k);
        long minWindowSum = windowSum;

        for (int i = dist + 2; i < n; i++) {
            int outIdx = i - dist - 1;
            var outEntry = (nums[outIdx], outIdx);
            if (selected.Contains(outEntry)) {
                windowSum -= nums[outIdx];
                selected.Remove(outEntry);
            } else {
                candidates.Remove(outEntry);
            }

            if (selected.Count == 0 || nums[i] < selected.Max.val) {
                windowSum += nums[i];
                selected.Add((nums[i], i));
            } else {
                candidates.Add((nums[i], i));
            }

            windowSum = Balance(windowSum, selected, candidates, k);
            minWindowSum = Math.Min(minWindowSum, windowSum);
        }

        return nums[0] + minWindowSum;
    }

    // Keeps `selected` at exactly k - 1 of the smallest available values, returning the updated sum.
    private long Balance(long windowSum, SortedSet<(int val, int idx)> selected,
                          SortedSet<(int val, int idx)> candidates, int k) {
        while (selected.Count < k - 1 && candidates.Count > 0) {
            var minCandidate = candidates.Min;
            windowSum += minCandidate.val;
            selected.Add(minCandidate);
            candidates.Remove(minCandidate);
        }
        while (selected.Count > k - 1) {
            var maxSelected = selected.Max;
            windowSum -= maxSelected.val;
            selected.Remove(maxSelected);
            candidates.Add(maxSelected);
        }
        return windowSum;
    }
}
```

## Complexity

- Time: O(n log n) — each element enters and leaves the balanced sets a constant number of times.
- Space: O(dist) — the size of the sliding window's tracked sets.
