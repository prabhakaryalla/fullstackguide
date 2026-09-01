# 3410. Maximize Subarray Sum After Removing All Occurrences of One Element

**Difficulty:** Medium
**Category:** Array, Hash Table, Dynamic Programming, Prefix Sum

## Problem
You are given an integer array `nums`. You may perform the following operation at most once: choose an integer `x` and remove every occurrence of `x` from `nums`. Return the maximum possible subarray sum obtainable from the resulting array (equivalently, the best subarray sum of the original array if occurrences of the chosen `x`, if any, are treated as contributing `0` within that subarray).

## Approach
Track two things while scanning left to right:
- `cur`: the standard Kadane running best subarray sum ending at the current position with no deletions applied.
- For every distinct value `x`, `curDel[x]`: the best subarray sum ending at the current position assuming all occurrences of `x` inside that subarray are skipped (contribute `0`).

When processing element `v`, every `curDel[x]` for `x != v` should simply increase by `v` (the element is not being deleted for those choices), while `curDel[v]` gets a special update: either continue an existing "delete v" run unchanged (since `v` contributes 0), start a fresh "delete v" run from the best plain Kadane value just before this element, or start completely fresh at `0`.

Updating every `x` individually would be too slow, so store values relative to a global running `offset` (the total sum processed so far): `curDel[x] = adj[x] + offset`. Incrementing `offset` by `v` automatically applies the "+v" to every `x` at once; only `adj[v]` needs an explicit correction each step. The overall answer tracks the best of `cur` and `offset + max(adj[x])` seen at any point.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumSubarraySum(int[] nums) 
    {
        var adj = new Dictionary<int, long>();
        long offset = 0;
        long bestAdj = long.MinValue;
        long cur = 0;
        long ans = long.MinValue;

        foreach (int v in nums)
        {
            long curPrev = cur;
            offset += v;

            long oldValV = adj.TryGetValue(v, out long a) ? a + (offset - v) : long.MinValue;
            long newValV = Math.Max(Math.Max(oldValV, curPrev), 0);
            long newAdjV = newValV - offset;
            adj[v] = newAdjV;
            if (newAdjV > bestAdj) bestAdj = newAdjV;

            cur = Math.Max(curPrev + v, v);

            long bestDelOverall = bestAdj == long.MinValue ? long.MinValue : offset + bestAdj;
            ans = Math.Max(ans, Math.Max(cur, bestDelOverall));
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
