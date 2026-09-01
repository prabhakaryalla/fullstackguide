# 3489. Zero Array Transformation IV

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem
You are given an integer array `nums` of length `n` and a 2D array `queries`, where `queries[i] = [l, r, val]`.

Each `queries[i]` lets you select **any subset** of indices in `[l, r]` and decrement each selected index's value by exactly `val`. A "Zero Array" is one where every element equals 0.

Return the minimum non-negative `k` such that, after processing only the first `k` queries (in order, each still allowing you to choose any subset of its range), `nums` can become a Zero Array. Return -1 if no such `k` exists.

### Example
Input: `nums = [2, 0, 2]`, `queries = [[0, 2, 1], [0, 2, 1], [1, 1, 3]]`
Output: `2`
Explanation: Using only the first two queries, apply both to indices 0 and 2 (subtracting 1 twice from each), turning `[2, 0, 2]` into `[0, 0, 0]`. So `k = 2` suffices.

## Approach
For each index `i`, track the set of sums achievable by combining a subset of the `val`s from queries processed so far whose range covers `i` (a subset-sum reachable set, starting at `{0}`). After processing each query `k`, update the reachable-sum sets for every index in its range by adding the new `val` to each existing achievable sum. As soon as every index's reachable set contains its own `nums[i]` value, `k + 1` (1-indexed count of queries used) is the answer.

## C# Solution

```csharp
public class Solution {
    public int MinZeroArray(int[] nums, int[][] queries) {
        bool allZero = true;
        foreach (int num in nums) if (num != 0) { allZero = false; break; }
        if (allZero) return 0;

        int n = nums.Length;
        HashSet<int>[] subsetSums = new HashSet<int>[n];
        for (int i = 0; i < n; i++) subsetSums[i] = new HashSet<int> { 0 };

        for (int k = 0; k < queries.Length; k++) {
            int l = queries[k][0], r = queries[k][1], val = queries[k][2];
            for (int i = l; i <= r; i++) {
                var toAdd = new List<int>();
                foreach (int sum in subsetSums[i]) toAdd.Add(sum + val);
                foreach (int sum in toAdd) subsetSums[i].Add(sum);
            }
            if (CanFormAll(subsetSums, nums)) return k + 1;
        }

        return -1;
    }

    private bool CanFormAll(HashSet<int>[] subsetSums, int[] nums) {
        for (int i = 0; i < nums.Length; i++)
            if (!subsetSums[i].Contains(nums[i])) return false;
        return true;
    }
}
```

## Complexity

- **Time:** O(q * n * S), where q is the number of queries and S is the number of distinct achievable subset sums per index
- **Space:** O(n * S)
