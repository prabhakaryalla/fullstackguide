# 908. Smallest Range I

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given an integer array `nums` and an integer `k`, you may change each `nums[i]` by any amount in `[-k, k]` (once each). Return the smallest possible difference between the maximum and minimum values of the resulting array.

### Example

```
Input: nums = [1,3,6], k = 3
Output: 0
```

## Approach

Only the current minimum and maximum matter: raise the minimum by `k` and lower the maximum by `k`. If they cross, the range collapses to `0`; otherwise the remaining gap is the answer.

## C# Solution

```csharp
public class Solution
{
    public int SmallestRangeI(int[] nums, int k)
    {
        int min = nums.Min();
        int max = nums.Max();
        return Math.Max(0, max - min - 2 * k);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
