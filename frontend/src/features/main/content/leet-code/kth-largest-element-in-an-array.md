# 215. Kth Largest Element in an Array

**Difficulty:** Medium
**Category:** Array, Divide and Conquer, Sorting, Heap, Quickselect

## Problem

Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array (the `k`-th largest in sorted order, not the `k`-th distinct value).

### Example

```
nums = [3,2,1,5,6,4], k = 2 -> 5
```

## Approach

Sorting the whole array costs `O(n log n)`; Quickselect (partition-based selection, the same partition step as quicksort) finds the answer in `O(n)` average time by only recursing into the side of the partition that contains the target rank, discarding the other side entirely instead of sorting it.

## C# Solution

```csharp
public class Solution
{
    public int FindKthLargest(int[] nums, int k)
    {
        int targetIndex = nums.Length - k; // k-th largest = (n-k)-th smallest (0-indexed)
        return Quickselect(nums, 0, nums.Length - 1, targetIndex);
    }

    private int Quickselect(int[] nums, int left, int right, int targetIndex)
    {
        int pivot = nums[right];
        int storeIndex = left;

        for (int i = left; i < right; i++)
        {
            if (nums[i] < pivot)
            {
                (nums[i], nums[storeIndex]) = (nums[storeIndex], nums[i]);
                storeIndex++;
            }
        }

        (nums[storeIndex], nums[right]) = (nums[right], nums[storeIndex]);

        if (storeIndex == targetIndex) return nums[storeIndex];
        if (storeIndex < targetIndex) return Quickselect(nums, storeIndex + 1, right, targetIndex);
        return Quickselect(nums, left, storeIndex - 1, targetIndex);
    }
}
```

## Complexity

- **Time:** `O(n)` average, `O(n^2)` worst case (rare with random pivots in practice).
- **Space:** `O(1)` — in-place partitioning (excluding recursion stack).
