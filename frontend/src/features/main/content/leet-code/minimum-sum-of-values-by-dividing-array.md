# 3117. Minimum Sum of Values by Dividing Array

**Difficulty:** Hard
**Category:** Array, Binary Search, Bit Manipulation, Dynamic Programming

## Problem

You are given arrays `nums` and `andValues`. Split `nums` into exactly `andValues.Length` contiguous, non-empty subarrays (in order) such that the `j`-th subarray's bitwise AND equals `andValues[j]`. The "value" of a subarray is its **last** element. Return the minimum possible sum of values across all subarrays achieving this, or `-1` if impossible.

## Approach

Use memoized recursion over `(i, j, mask)`: `i` is the current position in `nums`, `j` is which `andValues` target we're currently trying to satisfy, and `mask` is the running AND of the current (still open) subarray. At each step, AND in `nums[i]`; if the running AND drops below the target `andValues[j]` (impossible to recover, since AND only clears bits), this path fails. If it exactly matches the target, there's a choice: keep extending the subarray hoping a later cut is cheaper, or close the subarray right here (paying `nums[i]` as its value) and start fresh for the next target. If it's still above the target, just keep going (no valid cut here yet). Take the minimum over both choices when a match occurs.

## C# Solution

```csharp
public class Solution {
    private const int Inf = 1_000_000_000;
    private const int FullMask = (1 << 17) - 1;
    private int[] nums = Array.Empty<int>();
    private int[] andValues = Array.Empty<int>();
    private Dictionary<int, int>[,] memo = new Dictionary<int, int>[0, 0];

    public int MinimumValueSum(int[] nums, int[] andValues) {
        this.nums = nums;
        this.andValues = andValues;
        memo = new Dictionary<int, int>[nums.Length, andValues.Length];
        for (int i = 0; i < nums.Length; i++)
            for (int j = 0; j < andValues.Length; j++)
                memo[i, j] = new Dictionary<int, int>();

        int ans = Solve(0, 0, FullMask);
        return ans >= Inf ? -1 : ans;
    }

    // Returns the minimum value sum splitting nums[i..n) to satisfy
    // andValues[j..m), where `mask` is the running AND of the open subarray.
    private int Solve(int i, int j, int mask) {
        if (i == nums.Length && j == andValues.Length)
            return 0;
        if (i == nums.Length || j == andValues.Length)
            return Inf;

        if (memo[i, j].TryGetValue(mask, out int cached))
            return cached;

        int newMask = mask & nums[i];
        int result;
        if (newMask < andValues[j]) {
            result = Inf;
        } else if (newMask == andValues[j]) {
            int keepGoing = Solve(i + 1, j, newMask);
            int endHere = nums[i] + Solve(i + 1, j + 1, FullMask);
            result = Math.Min(keepGoing, endHere);
        } else {
            result = Solve(i + 1, j, newMask);
        }

        memo[i, j][mask] = result;
        return result;
    }
}
```

## Complexity

- Time: O(n * m * 2^17) worst case — bounded by the distinct `(index, target, mask)` states.
- Space: O(n * m * 2^17) worst case for the memoization table.
