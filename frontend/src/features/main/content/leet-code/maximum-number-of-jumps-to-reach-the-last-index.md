# 2770. Maximum Number of Jumps to Reach the Last Index

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given a 0-indexed array `nums` of `n` integers and an integer `target`. You start at index 0 and want to reach index `n - 1`.

In one jump from index `i`, you can jump to any index `j` where:
- `i < j < n`
- `|nums[j] - nums[i]| <= target`

Return the maximum number of jumps needed to reach the last index, or -1 if it's impossible.

### Example

```
Input: nums = [1,3,6,4,1,2], target = 2
Output: 3
Explanation: Jump from 0→1→3→5. Each jump satisfies |diff| <= 2.
```

## Approach

Use dynamic programming where `dp[i]` represents the maximum number of jumps to reach index `i`. Initialize `dp[0] = 0` and all others to -1.

For each index `i` where `dp[i] != -1`, try jumping to all valid indices `j > i` where `|nums[j] - nums[i]| <= target`. Update `dp[j] = max(dp[j], dp[i] + 1)`.

## C# Solution

```csharp
public class Solution
{
    public int MaximumJumps(int[] nums, int target)
    {
        int n = nums.Length;
        int[] dp = new int[n];
        Array.Fill(dp, -1);
        dp[0] = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (dp[i] == -1) continue;
            
            for (int j = i + 1; j < n; j++)
            {
                if (Math.Abs(nums[j] - nums[i]) <= target)
                {
                    dp[j] = Math.Max(dp[j], dp[i] + 1);
                }
            }
        }
        
        return dp[n - 1];
    }
}
```

## Complexity

- **Time:** O(n²) checking all pairs of indices
- **Space:** O(n) for the dp array
