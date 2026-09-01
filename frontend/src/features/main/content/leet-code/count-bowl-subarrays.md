# 3676. Count Bowl Subarrays

**Difficulty:** Medium
**Category:** Array, Monotonic Stack

## Problem
You are given an integer array `nums`. A subarray `nums[l..r]` (with `r >= l + 2`, so it contains at least one element strictly between its endpoints) is called a **bowl** if both endpoints are strictly greater than every element strictly between them, i.e. `min(nums[l], nums[r]) > max(nums[l+1..r-1])`.

Return the number of bowl subarrays in `nums`.

## Approach
Fix the left endpoint `l` and grow the right endpoint `r` one step at a time, maintaining the running maximum of the interior elements `nums[l+1..r-1]`.

For a given `l`, once the interior maximum reaches or exceeds `nums[l]`, no further `r` can ever satisfy the bowl condition for this `l` (the interior maximum only grows as `r` increases), so the inner loop can stop early. While it hasn't, check whether both `nums[l]` and `nums[r]` exceed the current interior maximum, and count the subarray if so.

## C# Solution

```csharp
public class Solution
{
    public long CountBowlSubarrays(int[] nums)
    {
        int n = nums.Length;
        long count = 0;

        for (int l = 0; l < n; l++)
        {
            int maxIn = int.MinValue;
            for (int r = l + 2; r < n; r++)
            {
                maxIn = Math.Max(maxIn, nums[r - 1]);

                if (nums[l] > maxIn && nums[r] > maxIn)
                {
                    count++;
                }

                if (nums[l] <= maxIn)
                {
                    break;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n^2) worst case
- **Space:** O(1)
