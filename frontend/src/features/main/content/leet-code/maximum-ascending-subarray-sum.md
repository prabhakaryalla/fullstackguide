# 1800. Maximum Ascending Subarray Sum

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array of positive integers `nums`, return the maximum possible sum of a strictly ascending contiguous subarray.

### Example

```
Input: nums = [10,20,30,5,10,50]
Output: 65
```

## Approach

Scan the array while maintaining the sum of the current ascending run. Whenever the next element breaks the ascending order, start a new run from that element; otherwise extend the current run. Track the maximum run sum seen.

## C# Solution

```csharp
public class Solution
{
    public int MaxAscendingSum(int[] nums)
    {
        int best = nums[0];
        int curr = nums[0];

        for (int i = 1; i < nums.Length; i++)
        {
            curr = nums[i] > nums[i - 1] ? curr + nums[i] : nums[i];
            best = Math.Max(best, curr);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
