# 3452. Sum of Good Numbers

**Difficulty:** Easy
**Category:** Array

## Problem

Given an integer array `nums` and an integer `k`, an element `nums[i]` is considered **good** if both of the following hold (whenever the neighboring index exists): `nums[i] > nums[i - k]` and `nums[i] > nums[i + k]`. If a neighboring index falls outside the array bounds, that condition is treated as satisfied. Return the sum of all good numbers.

### Example

`nums = [1,3,2,1,5,4], k = 2` → checking each index against the elements `k` positions to the left and right (when they exist) and summing the qualifying values gives the final answer.

## Approach

Iterate through every index, checking the left neighbor at `i - k` (only if it's within bounds) and the right neighbor at `i + k` (only if within bounds). If both existing neighbors are strictly smaller than `nums[i]`, add `nums[i]` to the running sum.

## C# Solution

```csharp
public class Solution 
{
    public int SumOfGoodNumbers(int[] nums, int k) 
    {
        int n = nums.Length;
        int sum = 0;

        for (int i = 0; i < n; i++)
        {
            bool leftOk = i - k < 0 || nums[i] > nums[i - k];
            bool rightOk = i + k >= n || nums[i] > nums[i + k];

            if (leftOk && rightOk)
                sum += nums[i];
        }

        return sum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
