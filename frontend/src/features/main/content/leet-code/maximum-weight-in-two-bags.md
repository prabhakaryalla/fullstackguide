# 3647. Maximum Weight in Two Bags

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given `n` items, each with a `weight` and a `value`, and two bags with capacities `capacity1` and `capacity2`. Each item can be placed into at most one of the two bags (or left out entirely). You want to choose a distribution of items into the two bags such that the total weight in each bag does not exceed its capacity, and the total value of all placed items is maximized. Return the maximum total value achievable.

## Approach
Since items may go into either bag or neither, and the number of items and capacities can be moderate, use dynamic programming over combined capacity states. Let `dp[c1][c2]` represent the max value achievable using capacity `c1` in bag 1 and `c2` in bag 2 considering items processed so far. For each item, transition: skip it, put it in bag 1 (if weight fits), or put it in bag 2 (if weight fits). Iterate capacities in decreasing order (like 0/1 knapsack) to avoid reusing an item twice. Final answer is `dp[capacity1][capacity2]`.

## C# Solution

```csharp
public class Solution 
{
    public int MaxWeight(int[] weight, int[] value, int capacity1, int capacity2) 
    {
        int n = weight.Length;
        int[,] dp = new int[capacity1 + 1, capacity2 + 1];

        for (int i = 0; i < n; i++)
        {
            int w = weight[i], v = value[i];
            for (int c1 = capacity1; c1 >= 0; c1--)
            {
                for (int c2 = capacity2; c2 >= 0; c2--)
                {
                    int best = dp[c1, c2];
                    if (c1 >= w) best = Math.Max(best, dp[c1 - w, c2] + v);
                    if (c2 >= w) best = Math.Max(best, dp[c1, c2 - w] + v);
                    dp[c1, c2] = best;
                }
            }
        }

        return dp[capacity1, capacity2];
    }
}
```

## Complexity

- **Time:** O(n * capacity1 * capacity2)
- **Space:** O(capacity1 * capacity2)
