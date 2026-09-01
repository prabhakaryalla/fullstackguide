# 3466. Maximum Coin Collection

**Difficulty:** Medium
**Category:** Array, Prefix Sum, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given two 0-indexed integer arrays `fortune1` and `fortune2`, each of length `n`, representing the coin values available in two parallel lanes at `n` sequential positions. A robot travels through positions `0` to `n - 1` in order. At each position `i`, the robot is in exactly one of the two lanes and collects `fortune1[i]` or `fortune2[i]` accordingly.

The robot may switch lanes **at most once** during the entire trip (it may also never switch). Return the maximum total number of coins the robot can collect.

## Approach
If the robot switches lanes right before position `j` (0 ≤ j ≤ n), it spends `[0, j)` in one lane and `[j, n)` in the other. Using prefix sums `prefix1` and `prefix2` for the two arrays, the two possible totals for a given switch point `j` are:
- Start in lane 1, switch to lane 2: `prefix1[j] + (total2 - prefix2[j])`
- Start in lane 2, switch to lane 1: `prefix2[j] + (total1 - prefix1[j])`

Trying every `j` from `0` to `n` (inclusive) covers "never switch" (`j = 0` or `j = n`) as well as every possible single switch point, and prefix sums make each candidate O(1) to evaluate.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumCoins(int[] fortune1, int[] fortune2)
    {
        int n = fortune1.Length;
        var prefix1 = new long[n + 1];
        var prefix2 = new long[n + 1];
        for (int i = 0; i < n; i++)
        {
            prefix1[i + 1] = prefix1[i] + fortune1[i];
            prefix2[i + 1] = prefix2[i] + fortune2[i];
        }

        long total1 = prefix1[n];
        long total2 = prefix2[n];
        long best = long.MinValue;

        for (int j = 0; j <= n; j++)
        {
            long optionA = prefix1[j] + (total2 - prefix2[j]);
            long optionB = prefix2[j] + (total1 - prefix1[j]);
            best = Math.Max(best, Math.Max(optionA, optionB));
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n) for the prefix sum arrays.
