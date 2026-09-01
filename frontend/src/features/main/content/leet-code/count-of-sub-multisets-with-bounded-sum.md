# 2902. Count of Sub-Multisets With Bounded Sum

**Difficulty:** Hard
**Category:** Array, Hash Table, Dynamic Programming, Sliding Window

## Problem

You are given a multiset `nums` (a collection where elements can repeat) of non-negative integers and two integers `l` and `r`. Your task is to count how many sub-multisets of `nums` have a sum between `l` and `r` (inclusive). Return the count modulo 10^9 + 7.

A sub-multiset is a subset where you can choose each distinct element any number of times from 0 up to its frequency in the original multiset.

### Example

```
Input: nums = [1,2,2,3], l = 6, r = 6
Output: 1
Explanation: The only sub-multiset with sum 6 is {1, 2, 3}.
```

## Approach

This is a bounded knapsack counting problem with repeated items. Use dynamic programming where `dp[sum]` represents the number of ways to form that sum. For each distinct number with frequency `freq`, we can include it 0 to `freq` times. Use a sliding window technique to efficiently update the DP array for each distinct element. Handle zeros separately since they don't affect the sum but multiply the count by `(zeroCount + 1)`.

## C# Solution

```csharp
public class Solution 
{
    public int CountSubMultisets(IList<int> nums, int l, int r) 
    {
        const int MOD = 1000000007;
        var freq = new Dictionary<int, int>();
        int zeros = 0;
        
        foreach (int num in nums) 
        {
            if (num == 0) zeros++;
            else freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        }
        
        long[] dp = new long[r + 1];
        dp[0] = 1;
        
        foreach (var (num, count) in freq) 
        {
            long[] newDp = new long[r + 1];
            Array.Copy(dp, newDp, r + 1);
            
            for (int sum = num; sum <= r; sum++) 
            {
                newDp[sum] = (newDp[sum] + dp[sum - num]) % MOD;
                if (sum >= (count + 1) * num) 
                {
                    newDp[sum] = (newDp[sum] - dp[sum - (count + 1) * num] + MOD) % MOD;
                }
            }
            dp = newDp;
        }
        
        long result = 0;
        for (int sum = l; sum <= r; sum++) 
        {
            result = (result + dp[sum]) % MOD;
        }
        
        return (int)((result * (zeros + 1)) % MOD);
    }
}
```

## Complexity

- **Time:** O(n + d * r) where n is array length, d is distinct non-zero numbers
- **Space:** O(r)
