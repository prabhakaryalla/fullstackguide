# 2422. Check if There is a Valid Partition For The Array

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given a 0-indexed integer array `nums`. You have to partition the array into one or more contiguous subarrays.

We call a partition of the array valid if each of the obtained subarrays satisfies one of the following conditions:

1. The subarray consists of exactly 2 equal elements. For example, `[2,2]`.
2. The subarray consists of exactly 3 equal elements. For example, `[4,4,4]`.
3. The subarray consists of exactly 3 consecutive increasing elements with a difference of 1. For example, `[3,4,5]`.

Return `true` if the array has at least one valid partition. Otherwise, return `false`.

### Example

```
Input: nums = [4,4,4,5,6]
Output: true
Explanation: The array can be partitioned into [4,4] and [4,5,6]. This is a valid partition.
```

## Approach

Use dynamic programming where `dp[i]` indicates whether the prefix `nums[0...i-1]` can be validly partitioned. Check the three conditions for each position.

## C# Solution

```csharp
public class Solution
{
    public bool ValidPartition(int[] nums)
    {
        int n = nums.Length;
        bool[] dp = new bool[n + 1];
        dp[0] = true;
        
        for (int i = 2; i <= n; i++)
        {
            if (i >= 2 && dp[i - 2] && nums[i - 1] == nums[i - 2])
            {
                dp[i] = true;
            }
            
            if (i >= 3 && dp[i - 3])
            {
                if (nums[i - 1] == nums[i - 2] && nums[i - 2] == nums[i - 3])
                {
                    dp[i] = true;
                }
                
                if (nums[i - 1] == nums[i - 2] + 1 && nums[i - 2] == nums[i - 3] + 1)
                {
                    dp[i] = true;
                }
            }
        }
        
        return dp[n];
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(n) for the dp array
