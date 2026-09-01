# 2972. Count the Number of Incremovable Subarrays II

**Difficulty:** Hard
**Category:** Array, Two Pointers, Binary Search

## Problem

An array is incremovable if removing a subarray results in a strictly increasing array. You are given a 0-indexed array `nums`. Return the number of incremovable subarrays (including empty subarrays).

This is the optimized version requiring O(n) or O(n log n) time.

### Example

```
Input: nums = [1, 2, 3, 4]
Output: 10
Explanation: All subarrays are incremovable since the array is already strictly increasing.

Input: nums = [6, 5, 7, 8]
Output: 7
```

## Approach

Find the longest strictly increasing prefix and suffix. Use two pointers to count valid removal ranges where removing elements between them leaves a strictly increasing sequence.

## C# Solution

```csharp
public class Solution
{
    public long IncremovableSubarrayCount(int[] nums)
    {
        int n = nums.Length;
        int left = 0;

        // Find longest increasing prefix
        while (left + 1 < n && nums[left] < nums[left + 1])
        {
            left++;
        }

        if (left == n - 1) return (long)n * (n + 1) / 2;

        long count = left + 2; // Remove suffix starting from any position up to left+1

        // Find increasing suffix and count valid removals
        for (int right = n - 1; right > 0; right--)
        {
            if (right < n - 1 && nums[right] >= nums[right + 1])
            {
                break;
            }

            // Count removals ending before right
            count++; // Remove prefix ending before right

            // Binary search or linear search for valid left boundaries
            int validLeft = -1;
            for (int l = 0; l <= left && l < right; l++)
            {
                if (nums[l] < nums[right])
                {
                    validLeft = l;
                }
            }

            if (validLeft >= 0)
            {
                count += validLeft + 1;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n²) or O(n log n) with optimization
- **Space:** O(1)
