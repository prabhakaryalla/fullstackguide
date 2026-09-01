# 2919. Minimum Increment Operations to Make Array Beautiful

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy

## Problem

You are given an array `nums` and an integer `k`. In one operation, you can increment any element by 1. An array is beautiful if every contiguous subarray of length 3 has at least one element greater than or equal to `k`. Return the minimum number of operations to make the array beautiful.

### Example

```
Input: nums = [2,3,0,0,2], k = 4
Output: 3
Explanation: Increment nums[2] to 4, nums[3] to 4, and nums[4] to 4 for a total of 3 operations.
```

## Approach

Use dynamic programming. For each position, we must ensure that at least one of the last three positions has a value >= k. Use DP where `dp[i]` represents the minimum operations to make the array valid up to index i. At each position, consider making the current element >= k or relying on previous positions.

## C# Solution

```csharp
public class Solution 
{
    public long MinIncrementOperations(int[] nums, int k) 
    {
        int n = nums.Length;
        long[] dp = new long[n + 3];
        
        for (int i = 0; i < n; i++) 
        {
            long cost = Math.Max(0, k - nums[i]);
            long minPrev = Math.Min(dp[i], Math.Min(dp[i + 1], dp[i + 2]));
            dp[i + 3] = minPrev + cost;
        }
        
        return Math.Min(dp[n], Math.Min(dp[n + 1], dp[n + 2]));
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
