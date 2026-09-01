# 2464. Minimum Subarrays in a Valid Split

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Number Theory
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer array `nums`. A split of the array into contiguous subarrays is valid if, for every subarray, the greatest common divisor (GCD) of its first and last elements is greater than `1`. Return the minimum number of subarrays needed for a valid split, or `-1` if no valid split exists.

### Example

Input: `nums = [2,6,3,4,3]`
Output: `2`
Explanation: Split into `[2,6]` (gcd(2,6)=2 > 1) and `[3,4,3]` (gcd(3,3)=3 > 1).

## Approach

Use dynamic programming where `dp[i]` is the minimum number of valid subarrays needed to split the first `i` elements (`nums[0..i-1]`), with `dp[0] = 0`. For each `i`, try every possible previous split point `j` (`0 <= j < i`); if `gcd(nums[j], nums[i-1]) > 1`, the subarray `nums[j..i-1]` is valid on its own, so `dp[i] = min(dp[i], dp[j] + 1)`. The answer is `dp[n]`, or `-1` if it remains unreachable.

## C# Solution

```csharp
public class Solution 
{
    public int ValidSubarraySplit(int[] nums) 
    {
        int n = nums.Length;
        int[] dp = new int[n + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (dp[j] == int.MaxValue) continue;
                if (Gcd(nums[j], nums[i - 1]) > 1)
                {
                    dp[i] = Math.Min(dp[i], dp[j] + 1);
                }
            }
        }

        return dp[n] == int.MaxValue ? -1 : dp[n];
    }

    private int Gcd(int a, int b)
    {
        while (b != 0)
        {
            (a, b) = (b, a % b);
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n^2 * log(maxVal))
- **Space:** O(n)
