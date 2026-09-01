# 3381. Maximum Subarray Sum With Length Divisible by K

**Difficulty:** Medium
**Category:** Array, Prefix Sum, Hash Table

## Problem

Given an array `nums` and integer `k`, find the maximum sum of a subarray whose length is divisible by `k`.

### Example

Input: `nums = [1,2]`, `k = 1`
Output: `3` — the whole array has length 2 (divisible by 1) and sum 3.

## Approach

Use prefix sums grouped by index modulo `k`. For each index `i`, the best subarray ending at `i` with length divisible by `k` is `prefix[i+1] - minPrefix[(i+1) % k]`, where `minPrefix` tracks the smallest prefix sum seen so far at each residue class (only from earlier indices with the same residue).

## C# Solution

```csharp
public class Solution 
{
    public long MaxSubarraySum(int[] nums, int k) 
    {
        int n = nums.Length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

        long[] minPrefix = new long[k];
        Array.Fill(minPrefix, long.MaxValue);
        minPrefix[0] = prefix[0]; // index 0, residue 0

        long best = long.MinValue;
        for (int i = 1; i <= n; i++) 
        {
            int r = i % k;
            if (minPrefix[r] != long.MaxValue)
                best = Math.Max(best, prefix[i] - minPrefix[r]);
            minPrefix[r] = Math.Min(minPrefix[r], prefix[i]);
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(k)
