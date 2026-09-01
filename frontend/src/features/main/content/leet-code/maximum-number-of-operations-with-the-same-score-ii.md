# 3040. Maximum Number of Operations With the Same Score II

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Memoization

## Problem

You are given an array `nums`. In one operation you may remove **either** the first two elements, **or** the last two elements, **or** the first and last elements together — and that pair's sum becomes the operation's score. Every operation performed must have the same score as the very first one. Return the maximum number of operations that can be performed, choosing the best possible first operation (and best choices thereafter) to maximize the count.

## Approach

There are only three possible scores worth trying — whichever comes from the very first operation, which must be one of: removing the first two elements, removing the last two elements, or removing the first and last elements. For each of these three fixed target scores, run a memoized recursion over the remaining window `nums[i..j]`: at every step, try each of the three removal options that matches the fixed target score, recursing into the resulting smaller window, and take the best count. Memoize on `(i, j, score)` to avoid recomputation, then return the best result across all three initial score choices.

## C# Solution

```csharp
public class Solution {
    private Dictionary<(int, int, int), int> memo = new Dictionary<(int, int, int), int>();
    private int[] nums = Array.Empty<int>();

    public int MaxOperations(int[] nums) {
        this.nums = nums;
        int n = nums.Length;
        memo.Clear();
        return Math.Max(
            Solve(0, n - 1, nums[0] + nums[1]),
            Math.Max(
                Solve(0, n - 1, nums[n - 1] + nums[n - 2]),
                Solve(0, n - 1, nums[0] + nums[n - 1])));
    }

    // Returns the maximum number of operations performable on nums[i..j] with a fixed target score.
    private int Solve(int i, int j, int score) {
        if (i >= j)
            return 0;

        var key = (i, j, score);
        if (memo.TryGetValue(key, out int cached))
            return cached;

        int deleteFirstTwo = nums[i] + nums[i + 1] == score ? 1 + Solve(i + 2, j, score) : 0;
        int deleteLastTwo = nums[j] + nums[j - 1] == score ? 1 + Solve(i, j - 2, score) : 0;
        int deleteFirstAndLast = nums[i] + nums[j] == score ? 1 + Solve(i + 1, j - 1, score) : 0;

        int result = Math.Max(deleteFirstTwo, Math.Max(deleteLastTwo, deleteFirstAndLast));
        memo[key] = result;
        return result;
    }
}
```

## Complexity

- Time: O(n^2) — each `(i, j)` window pair is memoized once per fixed score.
- Space: O(n^2) — the memoization table.
