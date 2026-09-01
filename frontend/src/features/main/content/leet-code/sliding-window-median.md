# 480. Sliding Window Median

**Difficulty:** Hard
**Category:** Array, Hash Table, Sliding Window, Heap, Sorting

## Problem

Given an integer array `nums` and an integer `k`, return the median of every contiguous window of size `k` as it slides from left to right across the array.

### Example

```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [1,-1,-1,3,5,6]
```

### Constraints

- `1 <= k <= nums.length <= 2000`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Approach

Maintain the current window's elements in a sorted list. The median is read directly from the middle (or average of the two middle elements for even `k`). As the window slides, binary search for and remove the outgoing element, then binary search for the correct insertion position for the incoming element, keeping the list sorted incrementally rather than re-sorting from scratch each time.

## C# Solution

```csharp
public class Solution
{
    public double[] MedianSlidingWindow(int[] nums, int k)
    {
        var window = new List<int>(nums.Take(k));
        window.Sort();

        int n = nums.Length;
        var result = new double[n - k + 1];
        result[0] = GetMedian(window, k);

        for (int i = k; i < n; i++)
        {
            int removeIndex = window.BinarySearch(nums[i - k]);
            window.RemoveAt(removeIndex);

            int insertIndex = window.BinarySearch(nums[i]);
            if (insertIndex < 0) insertIndex = ~insertIndex;
            window.Insert(insertIndex, nums[i]);

            result[i - k + 1] = GetMedian(window, k);
        }

        return result;
    }

    private double GetMedian(List<int> window, int k)
    {
        if (k % 2 == 1) return window[k / 2];

        return ((long)window[k / 2 - 1] + window[k / 2]) / 2.0;
    }
}
```

## Complexity

- **Time:** `O(n * k)` — each slide performs an `O(k)` list insertion/removal.
- **Space:** `O(k)` for the window.
