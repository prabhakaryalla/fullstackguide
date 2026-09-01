# 1155. Number of Dice Rolls With Target Sum

**Difficulty:** Medium
**Category:** Dynamic Programming

## Problem

Given `n` dice, each with `k` faces numbered `1` to `k`, return the number of ways to roll the dice so the sum of the face values equals `target`. Return the answer modulo `10^9 + 7`.

### Example

```
Input: n = 2, k = 6, target = 7
Output: 6
```

## Approach

Use a 2D DP table where `dp[dice][sum]` is the number of ways to reach `sum` using exactly `dice` dice. Starting from `dp[0][0] = 1`, build up each additional die by trying every face value `1..k` and adding the ways to reach the remaining sum with one fewer die, taking the result modulo `10^9 + 7` throughout.

## C# Solution

```csharp
public class Solution
{
    public int NumRollsToTarget(int n, int k, int target)
    {
        const int MOD = 1_000_000_007;
        int[,] dp = new int[n + 1, target + 1];
        dp[0, 0] = 1;

        for (int dice = 1; dice <= n; dice++)
        {
            for (int sum = 1; sum <= target; sum++)
            {
                long ways = 0;
                for (int face = 1; face <= k && face <= sum; face++)
                {
                    ways += dp[dice - 1, sum - face];
                }
                dp[dice, sum] = (int)(ways % MOD);
            }
        }

        return dp[n, target];
    }
}
```

## Complexity

- **Time:** `O(n · target · k)`.
- **Space:** `O(n · target)`.
