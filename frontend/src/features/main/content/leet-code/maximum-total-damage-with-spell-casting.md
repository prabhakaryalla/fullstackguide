# 3186. Maximum Total Damage With Spell Casting

**Difficulty:** Medium
**Category:** Array, Binary Search, Counting, Dynamic Programming, Hash Table, Sorting

## Problem
You are given an array of spell damage values. Casting a spell with damage value `d` deals `d` damage for every spell of that same value cast (i.e., duplicates all contribute), but casting a spell of value `d` prevents casting any spell with damage value `d-1`, `d-2`, `d+1`, or `d+2`. Determine the maximum total damage achievable by choosing a subset of distinct damage values to fully cast (using all copies of each chosen value).

## Approach
First, count occurrences of each distinct damage value, then get the sorted list of unique damage values. Use dynamic programming over this sorted unique list, where for each unique value, we decide whether to include all its casts or skip it. If chosen, its total contribution is `damage * count[damage]`, but we must then skip back to the most recent unique value that is not within 2 of the current one (avoiding the forbidden ranges) to combine with the best prior achievable total. Track running best-so-far values state so lookups for "skip" versus "use" transitions are O(1) per step.

## C# Solution
```csharp
public class Solution {
    public long MaximumTotalDamage(int[] power) {
        Dictionary<int, long> count = new Dictionary<int, long>();
        foreach (int damage in power)
            count[damage] = count.GetValueOrDefault(damage, 0) + 1;

        List<int> uniqueDamages = new List<int>(count.Keys);
        uniqueDamages.Sort();
        int n = uniqueDamages.Count;
        long[,] dp = new long[n, 2];

        for (int i = 0; i < n; i++) {
            long damage = uniqueDamages[i];
            if (i == 0) {
                dp[0, 0] = 0;
                dp[0, 1] = damage * count[(int)damage];
                continue;
            }
            dp[i, 0] = Math.Max(dp[i - 1, 0], dp[i - 1, 1]);
            dp[i, 1] = damage * count[(int)damage];

            if (i >= 1 && uniqueDamages[i - 1] != damage - 1 && uniqueDamages[i - 1] != damage - 2) {
                dp[i, 1] += Math.Max(dp[i - 1, 0], dp[i - 1, 1]);
            } else if (i >= 2 && uniqueDamages[i - 2] != damage - 2) {
                dp[i, 1] += Math.Max(dp[i - 2, 0], dp[i - 2, 1]);
            } else if (i >= 3) {
                dp[i, 1] += Math.Max(dp[i - 3, 0], dp[i - 3, 1]);
            }
        }

        return Math.Max(dp[n - 1, 0], dp[n - 1, 1]);
    }
}
```

## Complexity
- Time: O(n log n) due to sorting the unique values
- Space: O(n)
