# 2826. Sorting Three Groups

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given a 0-indexed array nums of length n consisting of positive integers. You can perform operations on the array:
- In one operation, choose an index i and change nums[i] to any positive integer.

Return the minimum number of operations needed to make the array nums non-decreasing such that all elements can be partitioned into at most three groups where:
- Group 1 contains only 1s
- Group 2 contains only 2s
- Group 3 contains only 3s

And the groups appear in order (all 1s before all 2s, all 2s before all 3s).

### Example

```
Input: nums = [2,1,3,2,1]
Output: 3
Explanation: Change indices 0, 1, 3 to get [1,1,3,3,3] or similar valid arrangement
```

## Approach

This is a dynamic programming problem. We need to find the minimum operations to transform the array into a non-decreasing sequence where each element is 1, 2, or 3.

We use dp[i][j] to represent the minimum operations needed to process the first i elements where the i-th element becomes j (where j ∈ {1, 2, 3}).

For each position i and target value j, we have:
- Cost of changing nums[i] to j (0 if nums[i] == j, otherwise 1)
- We can transition from previous state dp[i-1][k] where k <= j (non-decreasing property)

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperations(List<int> nums)
    {
        int n = nums.Count;
        int[,] dp = new int[n + 1, 4];
        
        for (int i = 0; i <= n; i++)
        {
            for (int j = 1; j <= 3; j++)
            {
                dp[i, j] = int.MaxValue / 2;
            }
        }
        
        dp[0, 1] = 0;
        dp[0, 2] = 0;
        dp[0, 3] = 0;
        
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= 3; j++)
            {
                int cost = nums[i - 1] == j ? 0 : 1;
                
                for (int k = 1; k <= j; k++)
                {
                    dp[i, j] = Math.Min(dp[i, j], dp[i - 1, k] + cost);
                }
            }
        }
        
        return Math.Min(dp[n, 1], Math.Min(dp[n, 2], dp[n, 3]));
    }
}
```

## Complexity

- **Time:** O(n * 9) = O(n) where n is the length of nums (3 choices for current, 3 choices for previous)
- **Space:** O(n) for DP table, can be optimized to O(1) with rolling array
