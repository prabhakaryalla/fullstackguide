# 3364. Minimum Positive Sum Subarray

**Difficulty:** Easy
**Category:** Array, Sliding Window, Prefix Sum

## Problem

Given an array `nums` and integers `k1`, `k2`, find the minimum sum among all subarrays whose length is between `k1` and `k2` (inclusive) and whose sum is strictly positive. Return `-1` if no such subarray exists.

### Example

Input: `nums = [3,-1,-1,1,-1,2]`, `k1 = 2`, `k2 = 3`
Output: `1` — subarray `[-1,-1,1,-1,2]`... actually the subarray `[1,-1,2]` -1+2=... the minimal positive-sum subarray of valid length has sum `1`.

## Approach

Use prefix sums, then for each end index `j`, check all valid start indices `i` such that the subarray length falls in `[k1, k2]`; compute the sum via prefix difference and track the minimum positive value seen. Constraints are small enough for this direct O(n*(k2-k1)) scan.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumSumSubarray(IList<int> nums, int k1, int k2) 
    {
        int n = nums.Count;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

        long best = long.MaxValue;
        for (int len = k1; len <= k2; len++) 
        {
            for (int i = 0; i + len <= n; i++) 
            {
                long sum = prefix[i + len] - prefix[i];
                if (sum > 0 && sum < best) best = sum;
            }
        }
        return best == long.MaxValue ? -1 : (int)best;
    }
}
```

## Complexity

- **Time:** O(n * (k2 - k1))
- **Space:** O(n)
