# 3748. Count Stable Subarrays

**Difficulty:** Medium
**Category:** Array, Sliding Window, Math

## Problem
You are given an integer array `nums`. A subarray is called **stable** if the maximum element in the subarray minus the minimum element in the subarray does not exceed a fixed threshold-like relationship defined by the array's own structure (specifically, the subarray is stable if it consists of elements that are "consecutive" in value order, i.e., for every pair of adjacent elements in the subarray, their absolute difference is at most 1). Return the total number of stable, non-empty, contiguous subarrays of `nums`.

## Approach
Use a sliding window / grouping technique. Scan through the array while maintaining the length of the current maximal run in which every pair of adjacent elements differs by at most 1. Whenever the difference between `nums[i]` and `nums[i-1]` exceeds 1, the current run breaks and a new run starts at index `i`. For a maximal run of length `L`, the number of stable subarrays entirely contained within it is `L * (L + 1) / 2`. Summing this over all maximal runs (after subtracting overlaps handled by resetting the run at each break) gives the total count. To avoid double counting, accumulate the answer incrementally: track the current run length `cur`, increment it while consecutive differences are at most 1 (reset to 1 otherwise), and add `cur` to the running total at each index — this correctly counts, for each ending index, all stable subarrays ending there.

## C# Solution

```csharp
public class Solution 
{
    public long CountStableSubarrays(int[] nums)
    {
        long total = 0;
        long cur = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            if (i > 0 && Math.Abs(nums[i] - nums[i - 1]) <= 1)
            {
                cur++;
            }
            else
            {
                cur = 1;
            }
            total += cur;
        }

        return total;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
