# 3147. Taking Maximum Energy From the Mystic Dungeon

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

You are given an array `energy` and an integer `k`. Starting at any chosen index, you must repeatedly jump exactly `k` positions forward, collecting the energy at each visited index, until you'd step out of bounds. Return the maximum total energy obtainable by choosing the best starting index.

## Approach

Work backward: let `dp[i]` be the maximum total energy obtainable starting from index `i` (following the fixed `+k` jump pattern to the end). For the last `k` indices (where `i + k` is out of bounds), `dp[i]` is simply `energy[i]`. For earlier indices, `dp[i] = energy[i] + dp[i + k]`, since after collecting `energy[i]` the rest of the path is identical to starting from `i + k`. The answer is the maximum value across all `dp[i]`.

## C# Solution

```csharp
public class Solution {
    public int MaximumEnergy(int[] energy, int k) {
        int[] dp = (int[])energy.Clone();

        for (int i = energy.Length - 1 - k; i >= 0; i--)
            dp[i] += dp[i + k];

        return dp.Max();
    }
}
```

## Complexity

- Time: O(n) — one backward pass over the array.
- Space: O(n) — the `dp` array (a copy of `energy`).
