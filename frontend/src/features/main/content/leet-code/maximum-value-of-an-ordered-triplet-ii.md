# 2874. Maximum Value of an Ordered Triplet II

**Difficulty:** Medium
**Category:** Array

## Problem

You are given a 0-indexed integer array `nums`. Return the maximum value over all triplets of indices `(i, j, k)` such that `i < j < k`. The value of a triplet is `(nums[i] - nums[j]) * nums[k]`.

If all possible triplets have a negative value, return 0.

### Example

```
Input: nums = [12,6,1,2,7]
Output: 77
Explanation:
Triplet (0, 2, 4): (12 - 1) * 7 = 77
This is the maximum value.
```

## Approach

Optimize from O(n³) to O(n) by maintaining two values as we iterate:
1. `maxI`: the maximum value seen so far (potential `nums[i]`)
2. `maxDiff`: the maximum value of `nums[i] - nums[j]` seen so far

For each position `k`, compute `maxDiff * nums[k]` and update the result. Then update `maxDiff` using the current element as `j`, and update `maxI`.

## C# Solution

```csharp
public class Solution
{
    public long MaximumTripletValue(int[] nums)
    {
        long maxValue = 0;
        long maxI = nums[0];
        long maxDiff = 0;
        
        for (int k = 1; k < nums.Length; k++)
        {
            maxValue = Math.Max(maxValue, maxDiff * nums[k]);
            maxDiff = Math.Max(maxDiff, maxI - nums[k]);
            maxI = Math.Max(maxI, nums[k]);
        }
        
        return maxValue;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass through the array.
- **Space:** `O(1)`.
