# 3469. Find Minimum Cost to Remove Array Elements

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy

## Problem
You are given a 0-indexed integer array `nums`. You must remove all elements from `nums` by repeatedly performing the following operation until it is empty:
- Look at up to three "active" elements: one optional **held** element carried over from the previous operation, plus the next two unprocessed elements from the front of `nums` (fewer if the array is nearly exhausted).
- Remove exactly two of the active elements, paying a cost equal to the **maximum** of the two removed values. The one remaining active element (if any) becomes the held element for the next operation.
- If at some point only a single element remains overall, it is removed for free.

Return the minimum possible total cost to remove every element of `nums`.

## Approach
This is a small-state dynamic programming problem. At any point the state is fully described by the current index `i` into `nums` and the (optional) held value. From a state, gather the up-to-three active candidates (held value, `nums[i]`, `nums[i+1]`), and:
- If only two candidates are available, they must both be removed — cost is their max, move to `i + 2` with no held value.
- If three candidates are available, try each of the three choices of which one to keep as the new held value, paying the max of the other two, and take the best of the three options.

Memoize on `(i, held)` since the same state can be reached via different removal orders.

## C# Solution

```csharp
public class Solution 
{
    private Dictionary<(int, int), long> memo;
    private int[] nums;
    private int n;

    public long MinCost(int[] nums)
    {
        this.nums = nums;
        this.n = nums.Length;
        memo = new Dictionary<(int, int), long>();
        return Solve(0, int.MinValue); // int.MinValue is the sentinel for "no held element"
    }

    private long Solve(int i, int held)
    {
        int remaining = (n - i) + (held == int.MinValue ? 0 : 1);
        if (remaining <= 1) return 0;

        var key = (i, held);
        if (memo.TryGetValue(key, out long cached)) return cached;

        var candidates = new List<int>();
        if (held != int.MinValue) candidates.Add(held);
        if (i < n) candidates.Add(nums[i]);
        if (i + 1 < n) candidates.Add(nums[i + 1]);

        int nextIndex = i + 2;
        long best;

        if (candidates.Count == 2)
        {
            best = Math.Max(candidates[0], candidates[1]) + Solve(nextIndex, int.MinValue);
        }
        else
        {
            best = long.MaxValue;
            for (int keep = 0; keep < 3; keep++)
            {
                long removedMax = long.MinValue;
                for (int j = 0; j < 3; j++)
                {
                    if (j == keep) continue;
                    removedMax = Math.Max(removedMax, candidates[j]);
                }
                long cost = removedMax + Solve(nextIndex, candidates[keep]);
                best = Math.Min(best, cost);
            }
        }

        memo[key] = best;
        return best;
    }
}
```

## Complexity

- **Time:** O(n) — the number of distinct reachable `(index, held)` states is linear in `n` because at most three held values can arise per index.
- **Space:** O(n) for the memoization table and recursion stack.
