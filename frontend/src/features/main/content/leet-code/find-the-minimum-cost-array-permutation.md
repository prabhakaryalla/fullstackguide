# 3149. Find the Minimum Cost Array Permutation

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bitmask

## Problem

Given an array `nums` of `n` distinct integers `0..n-1`, arrange them into a permutation `perm` to minimize the cyclic score `sum(|perm[i] - nums[perm[i+1]]|)` (indices wrap around, so the last term compares back to `perm[0]`). Return the permutation achieving the minimum score (any valid minimum-scoring permutation).

## Approach

Since the score is cyclic (rotating the whole permutation doesn't change it), fix `perm[0] = 0` without loss of generality — this eliminates redundant rotations from the search space. Use a bitmask DP over `(lastChosen, mask)`: the minimum additional score to complete the permutation given that `lastChosen` was just placed and `mask` tracks which numbers have been used so far. At each step, try every unused number as the next pick, recursing, and once all numbers are used the cycle closes by adding `|lastChosen - nums[0]|`. Track the best next choice at each state (`bestPick`) during the DP so the actual permutation can be reconstructed afterward by following the chain of best picks from the start.

## C# Solution

```csharp
public class Solution {
    private int[,] mem;
    private int[,] bestPick;
    private int[] nums;

    public int[] FindPermutation(int[] nums) {
        int n = nums.Length;
        this.nums = nums;
        mem = new int[n, 1 << n];
        bestPick = new int[n, 1 << n];

        // Fix perm[0] = 0 since the score function is cyclic.
        GetScore(0, 1);
        return Construct();
    }

    // Returns the minimum score, where `last` is the last chosen number and
    // `mask` is the bitmask of chosen numbers.
    private int GetScore(int last, int mask) {
        if (System.Numerics.BitOperations.PopCount((uint)mask) == nums.Length)
            return Math.Abs(last - nums[0]);
        if (mem[last, mask] > 0)
            return mem[last, mask];

        int minScore = int.MaxValue;
        for (int i = 1; i < nums.Length; i++) {
            if (((mask >> i) & 1) == 1)
                continue;
            int nextMinScore = Math.Abs(last - nums[i]) + GetScore(i, mask | (1 << i));
            if (nextMinScore < minScore) {
                minScore = nextMinScore;
                bestPick[last, mask] = i;
            }
        }

        return mem[last, mask] = minScore;
    }

    private int[] Construct() {
        int[] ans = new int[nums.Length];
        int last = 0, mask = 1;
        for (int i = 0; i < nums.Length; i++) {
            ans[i] = last;
            last = bestPick[last, mask];
            mask |= 1 << last;
        }
        return ans;
    }
}
```

## Complexity

- Time: O(2^n * n^2) — bounded by the distinct `(last, mask)` states, each trying up to n next picks.
- Space: O(2^n * n) — the memoization and best-pick tables.
