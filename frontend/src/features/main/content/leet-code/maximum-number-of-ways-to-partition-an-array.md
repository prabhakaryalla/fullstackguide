# 2025. Maximum Number of Ways to Partition an Array

**Difficulty:** Hard
**Category:** Array, Hash Table, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums` of length `n` and an integer `k`. A partition point `i` (`1 <= i <= n - 1`) splits the array into `nums[0..i-1]` and `nums[i..n-1]`; it is a **good** partition point if the two parts have equal sums. You may change **at most one** element of `nums` to `k` (or leave the array unchanged). Return *the maximum possible number of good partition points achievable*.

## Approach

Let `total` be the sum of `nums`, and `prefix[i]` the prefix sum up to index `i` (0-indexed, inclusive). Without any change, position `i` (splitting after index `i`, for `0 <= i <= n - 2`) is good exactly when `2 * prefix[i] == total`; count these as the `baseline`.

For a candidate change at index `idx` (replacing `nums[idx]` with `k`), let `diff = k - nums[idx]`. For a split after index `i`:
- If `i >= idx` (the changed element sits in the left part), the left sum becomes `prefix[i] + diff`, so the split is good when `2 * prefix[i] == total - diff`.
- If `i < idx` (the changed element sits in the right part), the right sum changes instead, so the split is good when `2 * prefix[i] == total + diff`.

Maintain two frequency maps over the value `2 * prefix[i]`: one for positions with `i >= idx` (`countGE`) and one for `i < idx` (`countLT`). Initialize `countGE` with every valid split position (since at `idx = 0`, all splits satisfy `i >= 0`). Sweep `idx` from `0` to `n - 1`; at each step look up `countGE[total - diff] + countLT[total + diff]` to get the number of good splits achievable by changing this index, then move split position `idx` itself from the `countGE` group into the `countLT` group before advancing to `idx + 1` (since for the next index, that split now satisfies `i < idx + 1`). Track the running maximum, including the `baseline`.

## C# Solution

```csharp
public class Solution
{
    public int WaysToPartition(int[] nums, int k)
    {
        int n = nums.Length;
        var prefix = new long[n];
        prefix[0] = nums[0];
        for (int i = 1; i < n; i++) prefix[i] = prefix[i - 1] + nums[i];
        long total = prefix[n - 1];

        int baseline = 0;
        for (int i = 0; i < n - 1; i++)
            if (prefix[i] * 2 == total) baseline++;

        var countGE = new Dictionary<long, int>();
        for (int i = 0; i < n - 1; i++)
        {
            long v = prefix[i] * 2;
            countGE[v] = countGE.GetValueOrDefault(v) + 1;
        }
        var countLT = new Dictionary<long, int>();

        int best = baseline;

        for (int idx = 0; idx < n; idx++)
        {
            long diff = (long)k - nums[idx];
            long targetGE = total - diff;
            long targetLT = total + diff;

            int cnt = countGE.GetValueOrDefault(targetGE) + countLT.GetValueOrDefault(targetLT);
            best = Math.Max(best, cnt);

            if (idx < n - 1)
            {
                long v = prefix[idx] * 2;
                countGE[v]--;
                countLT[v] = countLT.GetValueOrDefault(v) + 1;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix array and frequency maps.
