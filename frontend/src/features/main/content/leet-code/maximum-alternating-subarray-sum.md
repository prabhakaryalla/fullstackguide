# 2036. Maximum Alternating Subarray Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

For a subarray `nums[i..j]`, its alternating sum is `nums[i] - nums[i+1] + nums[i+2] - ...` (signs alternate starting with `+` at index `i`). Return the maximum alternating sum over all non-empty subarrays of `nums`.

### Example

`nums = [3,-1,1,2]` → the subarray `[3,-1]` has alternating sum `3 - (-1) = 4`, `[3,-1,1,2]` gives `3-(-1)+1-2=3`. The maximum is `5` from subarray `[2]` extended appropriately... concretely, the best achievable alternating sum for this input is `5`.

## Approach

Track two running values while scanning left to right: `even`, the best alternating-sum subarray whose current end position corresponds to an even offset within the running array (i.e., about to add `nums[i]` with a `+` sign), and `odd`, the best ending at an odd offset (subtracting `nums[i]`). At each even-indexed position we must "pick" it (`even += nums[i]`), or reset to a fresh subarray starting here whenever continuing loses value (`odd = max(0, odd - nums[i])`) for odd positions, and symmetrically for the other parity starting at index 1. Track the running maximum across both sequences.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumAlternatingSubarraySum(int[] nums) 
    {
        long ans = long.MinValue;
        long even = 0; // subarray sum where the next term starts at an even offset
        long odd = 0;  // subarray sum where the next term starts at an odd offset

        for (int i = 0; i < nums.Length; i++)
        {
            if (i % 2 == 0)
                even += nums[i];
            else
                even = Math.Max(0, even - nums[i]);
            ans = Math.Max(ans, even);
        }

        for (int i = 1; i < nums.Length; i++)
        {
            if (i % 2 == 1)
                odd += nums[i];
            else
                odd = Math.Max(0, odd - nums[i]);
            ans = Math.Max(ans, odd);
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
