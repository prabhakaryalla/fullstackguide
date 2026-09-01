# 1480. Running Sum of 1d Array

**Difficulty:** Easy
**Category:** Array, Prefix Sum

## Problem

Given an array `nums`, return its running sum, where `runningSum[i] = sum(nums[0..i])`.

### Example

```
Input: nums = [1,2,3,4]
Output: [1,3,6,10]
```

## Approach

Accumulate a running total in place, adding each element to the sum of all previous elements.

## C# Solution

```csharp
public class Solution
{
    public int[] RunningSum(int[] nums)
    {
        for (int i = 1; i < nums.Length; i++)
            nums[i] += nums[i - 1];

        return nums;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra space (in-place).
