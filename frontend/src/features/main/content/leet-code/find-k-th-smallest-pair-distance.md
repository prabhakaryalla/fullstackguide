# 719. Find K-th Smallest Pair Distance

**Difficulty:** Hard
**Category:** Array, Two Pointers, Binary Search, Sorting

## Problem

Given an integer array `nums` and an integer `k`, return the `k`th smallest distance among all pairs, where the distance of a pair is the absolute difference between its values.

### Example

```
Input: nums = [1,3,1], k = 1
Output: 0
```

## Approach

Sort the array, then binary search on the answer (the candidate distance value), ranging from `0` to the maximum possible distance. For a candidate distance, count how many pairs have a distance `<=` it using a sliding window: for each right endpoint, advance the left endpoint while the current span exceeds the candidate distance, and add `right - left` (the count of valid left partners) to the total. Narrow the binary search based on whether that count meets or falls short of `k`.

## C# Solution

```csharp
public class Solution
{
    public int SmallestDistancePair(int[] nums, int k)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int left = 0, right = nums[n - 1] - nums[0];

        while (left < right)
        {
            int mid = left + (right - left) / 2;

            if (CountPairsWithDistanceAtMost(nums, mid) < k)
                left = mid + 1;
            else
                right = mid;
        }

        return left;
    }

    private int CountPairsWithDistanceAtMost(int[] nums, int maxDistance)
    {
        int count = 0, left = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            while (nums[right] - nums[left] > maxDistance)
                left++;

            count += right - left;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n + n log(maxDistance))`.
- **Space:** `O(1)` extra, excluding the sort.
