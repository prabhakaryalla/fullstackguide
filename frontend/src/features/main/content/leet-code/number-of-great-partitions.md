# 2518. Number of Great Partitions

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

You are given an array `nums` consisting of positive integers and an integer `k`.

Partition the array into two ordered groups such that:
- Each element is in exactly one group
- The sum of elements in each group is greater than or equal to `k`

Return the number of possible partitions. The answer may be large, so return it modulo 10⁹ + 7.

### Example

```
Input: nums = [1,2,3,4], k = 4
Output: 6
Explanation: Valid partitions include:
([1,4], [2,3]), ([2,4], [1,3]), etc.

Input: nums = [3,3,3], k = 4
Output: 0
```

## Approach

Use complementary counting with dynamic programming:
1. If total sum < 2k, return 0 (impossible)
2. Count total ways to partition (2^n)
3. Subtract invalid partitions where at least one group has sum < k
4. Use DP to count subsets with sum < k
5. Answer = 2^n - 2 × (count of subsets with sum < k)

The factor of 2 accounts for which subset becomes the first vs second group.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int CountPartitions(int[] nums, int k)
    {
        long total = 0;
        foreach (int num in nums)
        {
            total += num;
        }
        
        if (total < 2L * k)
        {
            return 0;
        }
        
        int n = nums.Length;
        long totalWays = ModPow(2, n, MOD);
        
        var dp = new long[k];
        dp[0] = 1;
        
        foreach (int num in nums)
        {
            for (int sum = k - 1; sum >= num; sum--)
            {
                dp[sum] = (dp[sum] + dp[sum - num]) % MOD;
            }
        }
        
        long invalidWays = 0;
        for (int sum = 0; sum < k; sum++)
        {
            invalidWays = (invalidWays + dp[sum]) % MOD;
        }
        
        invalidWays = (invalidWays * 2) % MOD;
        
        long result = (totalWays - invalidWays + MOD) % MOD;
        return (int)result;
    }
    
    private long ModPow(long baseNum, int exp, int mod)
    {
        long result = 1;
        baseNum %= mod;
        
        while (exp > 0)
        {
            if ((exp & 1) == 1)
            {
                result = (result * baseNum) % mod;
            }
            baseNum = (baseNum * baseNum) % mod;
            exp >>= 1;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n × k) for the DP computation
- **Space:** O(k) for the DP array
