# 3737. Count Subarrays With Majority Element I

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

Given an integer array `nums` and an integer `x`, count the number of subarrays in which `x` is a strict majority element (appears in strictly more than half of the subarray's positions).

### Example

nums = [1,1,2,1], x = 1 → subarrays where 1 is majority: [1],[1](idx1),[1](idx3),[1,1],[1,1,2],[1,1,2,1] → total 6.

## Approach

Transform the array so each `x` becomes `+1` and every other value becomes `-1`, and compute the prefix sum. A subarray `(i, j]` has `x` as strict majority exactly when `prefix[j] - prefix[i] > 0`. For small inputs, check every pair `i < j` directly.

## C# Solution

```csharp
public class Solution 
{
    public long CountSubarraysWithMajority(int[] nums, int x) 
    {
        int n = nums.Length;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) 
        {
            prefix[i + 1] = prefix[i] + (nums[i] == x ? 1 : -1);
        }

        long count = 0;
        for (int i = 0; i <= n; i++) 
        {
            for (int j = i + 1; j <= n; j++) 
            {
                if (prefix[j] - prefix[i] > 0) count++;
            }
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n)
