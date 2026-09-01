# 2915. Length of the Longest Subsequence That Sums to Target

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given an array of integers `nums` and a target integer `target`. Return the length of the longest subsequence of `nums` that sums to `target`. If no such subsequence exists, return -1.

### Example

```
Input: nums = [1,2,3,4,5], target = 9
Output: 3
Explanation: [2,3,4] sums to 9 with length 3.
```

## Approach

Use dynamic programming with a knapsack-style approach. Let `dp[sum]` represent the maximum length of a subsequence that sums to `sum`. For each number in `nums`, update the DP array by considering including that number. Initialize `dp[0] = 0` (empty subsequence), and all others to -1 (impossible).

## C# Solution

```csharp
public class Solution 
{
    public int LengthOfLongestSubsequence(IList<int> nums, int target) 
    {
        int[] dp = new int[target + 1];
        Array.Fill(dp, -1);
        dp[0] = 0;
        
        foreach (int num in nums) 
        {
            for (int sum = target; sum >= num; sum--) 
            {
                if (dp[sum - num] != -1) 
                {
                    dp[sum] = Math.Max(dp[sum], dp[sum - num] + 1);
                }
            }
        }
        
        return dp[target];
    }
}
```

## Complexity

- **Time:** O(n * target)
- **Space:** O(target)
