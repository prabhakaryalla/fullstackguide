# 3730. Maximum Calories Burnt From Jumps

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Monotonic Queue
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `calories` and an integer `maxJump`. Starting at index `0`, you may repeatedly jump forward to any index within `maxJump` steps ahead. Every time you land on an index, you burn that index's calorie value (each index's calories can only be collected once, the first and only time you land on it).

You must eventually land exactly on the last index. Return the maximum total calories you can burn.

## Approach
This is a classic "constrained maximum subsequence sum" dynamic programming problem. Let `dp[i]` be the best total achievable when landing on index `i`. Then `dp[i] = calories[i] + max(dp[j])` for `j` in the window `[i - maxJump, i - 1]`.

Maintain a monotonic decreasing deque of indices (by `dp` value) representing the sliding window of the last `maxJump` positions, so the maximum of the window can be retrieved in O(1) and updated in amortized O(1) per index.

## C# Solution

```csharp
public class Solution
{
    public long MaxCaloriesBurnt(int[] calories, int maxJump)
    {
        int n = calories.Length;
        long[] dp = new long[n];
        dp[0] = calories[0];

        var deque = new LinkedList<int>(); // indices, dp-values kept decreasing
        deque.AddLast(0);

        for (int i = 1; i < n; i++)
        {
            while (deque.Count > 0 && deque.First.Value < i - maxJump)
            {
                deque.RemoveFirst();
            }

            dp[i] = dp[deque.First.Value] + calories[i];

            while (deque.Count > 0 && dp[deque.Last.Value] <= dp[i])
            {
                deque.RemoveLast();
            }
            deque.AddLast(i);
        }

        return dp[n - 1];
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
