# 3427. Sum of Variable Length Subarrays

**Difficulty:** Easy
**Category:** Array, Prefix Sum

## Problem

You are given an integer array `nums` of size `n`. For each index `i`, define `start_i = max(0, i - nums[i])`. Return the sum, over all indices `i`, of the sum of the subarray `nums[start_i .. i]` (inclusive).

### Example

`nums = [2,3,1]`

- `i=0`: `nums[0]=2`, `start=max(0,-2)=0`, subarray `[2]`, sum `2`.
- `i=1`: `nums[1]=3`, `start=max(0,-2)=0`, subarray `[2,3]`, sum `5`.
- `i=2`: `nums[2]=1`, `start=max(0,1)=1`, subarray `[3,1]`, sum `4`.

Total: `2 + 5 + 4 = 11`.

## Approach

Precompute a prefix sum array so any range sum can be answered in O(1). For each index `i`, compute `start = max(0, i - nums[i])` and add `prefix[i+1] - prefix[start]` to the running total.

## C# Solution

```csharp
public class Solution 
{
    public int SubarraySum(int[] nums) 
    {
        int n = nums.Length;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) 
        {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        int total = 0;
        for (int i = 0; i < n; i++) 
        {
            int start = Math.Max(0, i - nums[i]);
            total += prefix[i + 1] - prefix[start];
        }
        return total;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
