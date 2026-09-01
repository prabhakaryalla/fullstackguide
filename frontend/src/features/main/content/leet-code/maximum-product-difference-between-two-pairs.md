# 1913. Maximum Product Difference Between Two Pairs

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an array `nums` of at least 4 numbers, choose two pairs of elements (all four indices distinct) to maximize the product difference `(nums[a] * nums[b]) - (nums[c] * nums[d])`. Return the maximum possible product difference.

### Example

```
Input: nums = [5,6,2,7,4]
Output: 34
Explanation: Use the pair (7,6) for the largest product 42, and (2,4) for the smallest product 8; 42 - 8 = 34.
```

### Constraints

- `4 <= nums.length <= 10^4`
- `1 <= nums[i] <= 10^4`

## Approach

To maximize the difference, the largest product must come from the two largest values in the array, and the smallest product must come from the two smallest values. Find these four values in a single pass (tracking the two largest and two smallest seen so far) or simply sort the array and take the first two and last two elements.

## C# Solution

```csharp
public class Solution
{
    public int MaxProductDifference(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int minProduct = nums[0] * nums[1];
        int maxProduct = nums[n - 1] * nums[n - 2];
        return maxProduct - minProduct;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting.
- **Space:** `O(log n)` to `O(n)` depending on the sort implementation.
