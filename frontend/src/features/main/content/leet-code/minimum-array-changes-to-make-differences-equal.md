# 3224. Minimum Array Changes to Make Differences Equal

**Difficulty:** Hard
**Category:** Array, Hash Table, Prefix Sum

## Problem
Given an even-length integer array `nums` (with values bounded between 0 and `k`) and the integer `k`, you may change any elements to any value in `[0, k]`. Consider all "mirror pairs" `(nums[i], nums[n-1-i])` for `i` from 0 to n/2 - 1; find the minimum number of element changes needed so that every mirror pair has the same absolute difference.

## Approach
For each mirror pair `(a, b)`, determine the target difference `d = |a - b|` that could be achieved with zero changes to this pair. Also, for each pair, determine the maximum achievable difference value (which is `max(a, b, k-a, k-b)`), representing a value achievable using only 1 change to that pair (by changing one of the two elements to 0 or k to maximize the gap). Build a frequency count of "zero-change achievable differences" across all pairs, and a frequency count of maximum "one-change achievable difference" per pair, then a suffix sum over the one-change achievable differences (from k down to 0) representing how many pairs can achieve at least that difference with only 1 change. For every candidate target difference from 0 to k, compute the total cost: pairs already matching that difference need 0 changes, pairs that could reach it with exactly one change need 1 change each, and all remaining pairs need 2 changes each; take the minimum total cost over all candidate target differences.

## C# Solution
```csharp
public class Solution {
    public int MinChanges(int[] nums, int k) {
        int n = nums.Length;
        int pairSize = n / 2;
        int ans = n;

        Dictionary<int, int> diffCount = new Dictionary<int, int>();
        int[] oneChangeCount = new int[k + 1];

        for (int i = 0; i < pairSize; i++) {
            int a = nums[i];
            int b = nums[n - 1 - i];
            int diff = Math.Abs(a - b);
            diffCount[diff] = diffCount.GetValueOrDefault(diff, 0) + 1;
            int maxAchievable = new[] { a, b, k - a, k - b }.Max();
            oneChangeCount[maxAchievable]++;
        }

        int[] prefixOneChangeCount = new int[k + 2];
        for (int i = 0; i <= k; i++)
            prefixOneChangeCount[i] = oneChangeCount[i];
        for (int i = k - 1; i >= 0; i--)
            prefixOneChangeCount[i] += prefixOneChangeCount[i + 1];

        foreach (var kv in diffCount) {
            int diff = kv.Key;
            int freq = kv.Value;
            int oneChange = prefixOneChangeCount[diff] - freq;
            int twoChanges = (pairSize - prefixOneChangeCount[diff]) * 2;
            ans = Math.Min(ans, oneChange + twoChanges);
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n + k)
- Space: O(n + k)
