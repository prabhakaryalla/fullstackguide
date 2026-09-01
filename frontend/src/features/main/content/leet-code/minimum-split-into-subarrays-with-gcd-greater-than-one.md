# 2436. Minimum Split Into Subarrays With GCD Greater Than One

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Number Theory

## Problem

You are given an array `nums` consisting of positive integers. Split the array into one or more disjoint subarrays such that:

- Each element of the array belongs to exactly one subarray, and
- The GCD of the elements of each subarray is strictly greater than `1`.

Return the minimum number of subarrays that can be obtained after the split.

### Example

```
Input: nums = [12,6,3,14,8]
Output: 2
Explanation: We can split the array into [12,6,3] and [14,8].
- GCD(12, 6, 3) = 3 > 1
- GCD(14, 8) = 2 > 1
```

## Approach

Use dynamic programming where `dp[i]` represents the minimum number of subarrays to split `nums[0...i-1]`. For each position, try all possible previous split points and check if the GCD of the subarray is greater than 1.

## C# Solution

```csharp
public class Solution
{
    public int MinimumSplits(int[] nums)
    {
        int n = nums.Length;
        int[] dp = new int[n + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;
        
        for (int i = 1; i <= n; i++)
        {
            int gcd = 0;
            for (int j = i - 1; j >= 0; j--)
            {
                gcd = GCD(gcd, nums[j]);
                if (gcd > 1 && dp[j] != int.MaxValue)
                {
                    dp[i] = Math.Min(dp[i], dp[j] + 1);
                }
            }
        }
        
        return dp[n];
    }
    
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n^2 log m) where n is the array length and m is the maximum value
- **Space:** O(n) for the dp array
