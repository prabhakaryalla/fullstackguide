# 2459. Sort Array by Moving Items to Empty Space

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an array `nums` of size `n` containing distinct integers from `0` to `n - 1`. The value `0` represents an empty space. In one operation you may move any single item directly into the empty space (this swaps that item's position with the empty space, wherever it currently is in the array — the two positions do not need to be adjacent).

Given a string `direction` that is either `"increasing"` or `"decreasing"`, return the minimum number of operations required to rearrange `nums` so that its non-zero values are sorted in the requested order. The value `0` (the empty space) may end up at any position once the rest of the array is sorted.

## Approach
This is a permutation-cycle problem with one twist: the value `0` acts as a "free" mover.

1. Compute, for each index, the value it should hold in the fully sorted target array (`target[i] = i` for `"increasing"`, `target[i] = n - 1 - i` for `"decreasing"`), then invert this into `desiredIndex[value] = index`.
2. Decompose the permutation `i -> desiredIndex[nums[i]]` into cycles. Every cycle of length `L > 1` requires exactly `L - 1` operations to fix (this already accounts for `0` acting as the free mover when `0` belongs to that cycle).
3. If the cycle containing the value `0` is trivial (length 1, meaning `0` is already in its correct slot) **and** there is at least one other non-trivial cycle elsewhere, then `2` extra operations are required overall — one to temporarily move `0` into another cycle, and one to move it back out once that cycle (and, implicitly, any others reached along the way) is resolved.
4. Sum these costs for the final answer.

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperations(int[] nums, string direction)
    {
        int n = nums.Length;
        int[] target = new int[n];
        for (int i = 0; i < n; i++)
        {
            target[i] = direction == "increasing" ? i : n - 1 - i;
        }

        int[] desiredIndex = new int[n];
        for (int i = 0; i < n; i++)
        {
            desiredIndex[target[i]] = i;
        }

        bool[] visited = new bool[n];
        int totalOps = 0;
        bool zeroCycleTrivial = false;
        bool hasNonTrivialCycle = false;

        for (int i = 0; i < n; i++)
        {
            if (visited[i])
            {
                continue;
            }

            int cycleLen = 0;
            int j = i;
            bool containsZero = false;

            while (!visited[j])
            {
                visited[j] = true;
                if (nums[j] == 0)
                {
                    containsZero = true;
                }
                cycleLen++;
                j = desiredIndex[nums[j]];
            }

            if (cycleLen > 1)
            {
                totalOps += cycleLen - 1;
                hasNonTrivialCycle = true;
            }
            else if (containsZero)
            {
                zeroCycleTrivial = true;
            }
        }

        if (zeroCycleTrivial && hasNonTrivialCycle)
        {
            totalOps += 2;
        }

        return totalOps;
    }
}
```

## Complexity

- **Time:** O(n) — every index is visited exactly once across all cycles.
- **Space:** O(n) for the `desiredIndex` and `visited` arrays.
