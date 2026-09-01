# 494. Target Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Backtracking

## Problem

Given an integer array `nums` and an integer `target`, assign either a `+` or `-` sign to each integer and return the number of ways to assign signs so the resulting expression evaluates to `target`.

### Example

```
Input: nums = [1,1,1,1,1], target = 3
Output: 5
```

### Constraints

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums[i]) <= 1000`
- `-1000 <= target <= 1000`

## Approach

Split `nums` into a "positive" subset `P` and a "negative" subset `N`, where `sum(P) - sum(N) = target` and `sum(P) + sum(N) = totalSum`. Solving gives `sum(P) = (totalSum + target) / 2`, reducing the problem to counting subsets that sum to this fixed value — a classic 0/1 knapsack counting DP, where `dp[i]` tracks the number of ways to reach sum `i` using items processed so far.

## C# Solution

```csharp
public class Solution
{
    public int FindTargetSumWays(int[] nums, int target)
    {
        int sum = nums.Sum();
        if (Math.Abs(target) > sum || (sum + target) % 2 != 0) return 0;

        int positiveSum = (sum + target) / 2;
        var dp = new int[positiveSum + 1];
        dp[0] = 1;

        foreach (var num in nums)
        {
            for (int i = positiveSum; i >= num; i--)
                dp[i] += dp[i - num];
        }

        return dp[positiveSum];
    }
}
```

## Complexity

- **Time:** `O(n * positiveSum)`.
- **Space:** `O(positiveSum)` for the DP array.
