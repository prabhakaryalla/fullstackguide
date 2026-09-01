# 2926. Maximum Balanced Subsequence Sum

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Binary Indexed Tree

## Problem

You are given an array `nums`. A subsequence is balanced if for every pair of adjacent elements in the subsequence at indices i and j (i < j), we have `nums[j] - nums[i] >= j - i`. Return the maximum sum of a balanced subsequence.

### Example

```
Input: nums = [3,3,5,6]
Output: 14
Explanation: The subsequence [3,5,6] is balanced: 5-3>=1, 6-5>=1. Sum is 14.
```

## Approach

Transform the problem by defining `a[i] = nums[i] - i`. A subsequence is balanced if when sorted by indices, each `nums[j] - nums[i] >= j - i`, which becomes `a[j] >= a[i]`. Use coordinate compression and a segment tree or BIT to track maximum sums for each transformed value, ensuring we only extend from smaller or equal transformed values.

## C# Solution

```csharp
public class Solution 
{
    public long MaxBalancedSubsequenceSum(int[] nums) 
    {
        int n = nums.Length;
        var items = new List<(long val, int idx)>();
        
        for (int i = 0; i < n; i++) 
        {
            items.Add((nums[i] - i, i));
        }
        
        items.Sort();
        
        var dp = new Dictionary<long, long>();
        long result = long.MinValue;
        
        for (int i = 0; i < n; i++) 
        {
            long transformed = nums[i] - i;
            long maxPrev = 0;
            
            foreach (var kvp in dp) 
            {
                if (kvp.Key <= transformed) 
                {
                    maxPrev = Math.Max(maxPrev, kvp.Value);
                }
            }
            
            long current = maxPrev + nums[i];
            dp[transformed] = Math.Max(dp.GetValueOrDefault(transformed, 0), current);
            result = Math.Max(result, current);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n^2) - can be optimized to O(n log n) with segment tree
- **Space:** O(n)
