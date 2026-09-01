# 628. Maximum Product of Three Numbers

**Difficulty:** Easy
**Category:** Array, Math, Sorting

## Problem

Given an integer array `nums`, return the maximum product of any three numbers in the array.

### Example

```
Input: nums = [-4,-3,-2,1]
Output: 24
```

### Constraints

- `3 <= nums.length <= 10^4`
- `-1000 <= nums[i] <= 1000`

## Approach

The maximum product of three numbers is either the product of the three largest values, or the product of the two smallest (most negative, whose product is positive) values and the single largest value. Sort the array and compare both candidates, since negative pairs can produce a larger product than expected.

## C# Solution

```csharp
public class Solution
{
    public int MaximumProduct(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length;

        int productOfLargestThree = nums[n - 1] * nums[n - 2] * nums[n - 3];
        int productOfTwoSmallestAndLargest = nums[0] * nums[1] * nums[n - 1];

        return Math.Max(productOfLargestThree, productOfTwoSmallestAndLargest);
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
