# 1755. Closest Subsequence Sum

**Difficulty:** Hard
**Category:** Array, Two Pointers, Bit Manipulation, Divide and Conquer, Sorting

## Problem

Given an integer array `nums` and an integer `goal`, choose a subsequence of `nums` (possibly empty) whose sum is as close as possible to `goal`. Return the minimum possible absolute difference.

### Example

```
Input: nums = [5,-7,3,5], goal = 6
Output: 0
```

## Approach

Use meet-in-the-middle: split `nums` into two halves and enumerate all `2^(n/2)` subset sums for each half. Sort the sums of the second half, then for every subset sum of the first half, binary search the second half's sorted sums for the value closest to `goal - sum1`.

## C# Solution

```csharp
public class Solution
{
    public int MinAbsDifference(int[] nums, int goal)
    {
        int n = nums.Length;
        int half1 = n / 2, half2 = n - half1;

        var sums1 = GenerateSums(nums, 0, half1);
        var sums2 = GenerateSums(nums, half1, half2);
        sums2.Sort();

        long best = long.MaxValue;
        foreach (long s1 in sums1)
        {
            long target = goal - s1;
            int idx = sums2.BinarySearch(target);
            if (idx < 0) idx = ~idx;

            if (idx < sums2.Count) best = Math.Min(best, Math.Abs(s1 + sums2[idx] - goal));
            if (idx > 0) best = Math.Min(best, Math.Abs(s1 + sums2[idx - 1] - goal));
        }

        return (int)best;
    }

    private List<long> GenerateSums(int[] nums, int start, int count)
    {
        var sums = new List<long> { 0 };
        for (int i = start; i < start + count; i++)
        {
            int size = sums.Count;
            for (int j = 0; j < size; j++)
                sums.Add(sums[j] + nums[i]);
        }
        return sums;
    }
}
```

## Complexity

- **Time:** `O(2^(n/2) * n)`.
- **Space:** `O(2^(n/2))`.
