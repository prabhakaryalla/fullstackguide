# 1885. Count Pairs in Two Arrays

**Difficulty:** Medium
**Category:** Array, Sorting, Binary Search, Two Pointers

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two arrays `nums1` and `nums2` of the same length, return the number of pairs `(i, j)` with `i < j` such that `nums1[i] + nums1[j] > nums2[i] + nums2[j]`.

### Example

```
Input: nums1 = [2,1,2,1], nums2 = [1,2,1,2]
Output: 1
```

## Approach

Rearranging the inequality gives `(nums1[i] - nums2[i]) + (nums1[j] - nums2[j]) > 0`. Compute the per-index difference array and sort it. Then use two pointers from both ends: if the smallest and largest remaining differences sum to a positive value, every difference between them also pairs positively with the largest one (since the array is sorted), so add `right - left` to the count and shrink from the right; otherwise, the smallest difference can't form a valid pair with anything currently in range, so advance from the left.

## C# Solution

```csharp
public class Solution
{
    public long CountPairs(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        var diff = new long[n];
        for (int i = 0; i < n; i++) diff[i] = nums1[i] - nums2[i];

        Array.Sort(diff);

        long count = 0;
        int left = 0, right = n - 1;

        while (left < right)
        {
            if (diff[left] + diff[right] > 0)
            {
                count += right - left;
                right--;
            }
            else
            {
                left++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(n)` for the difference array.
