# 1005. Maximize Sum Of Array After K Negations

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

Given an integer array `nums` and an integer `k`, modify the array by choosing an index `i` and replacing `nums[i]` with `-nums[i]`, repeated exactly `k` times (the same index may be chosen more than once). Return the largest possible sum of the array after exactly `k` negations.

### Example

```
Input: nums = [2,-3,-1,5,-4], k = 2
Output: 13
```

## Approach

Sort the array so the most negative numbers come first. Walk through and flip negatives to positive while `k` remains, since flipping the smallest (most negative) value gains the most. If `k` runs out mid-way there's nothing left to do; otherwise, once all remaining values are non-negative, any leftover `k` should all be applied to the smallest value in the array — if `k` is odd, flip that smallest value once more (an even number of flips on any value is a no-op).

## C# Solution

```csharp
public class Solution
{
    public int LargestSumAfterKNegations(int[] nums, int k)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int i = 0;

        while (i < n && k > 0 && nums[i] < 0)
        {
            nums[i] = -nums[i];
            i++;
            k--;
        }

        int sum = 0;
        int minValue = int.MaxValue;
        foreach (var num in nums)
        {
            sum += num;
            minValue = Math.Min(minValue, num);
        }

        if (k % 2 == 1) sum -= 2 * minValue;

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra (ignoring sort's internal space).
