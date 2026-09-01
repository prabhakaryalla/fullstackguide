# 154. Find Minimum in Rotated Sorted Array II

**Difficulty:** Hard
**Category:** Array, Binary Search

## Problem

Suppose an array of integers, sorted in ascending order but possibly containing duplicates, is rotated at some unknown pivot. Given the rotated array `nums`, return the minimum element.

### Example 1

```
Input: nums = [1,3,5]
Output: 1
```

### Example 2

```
Input: nums = [2,2,2,0,1]
Output: 0
```

### Constraints

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- `nums` is sorted and rotated between `1` and `n` times.

## Approach

Same binary search as the distinct-values version, with one extra case: when `nums[mid] == nums[hi]`, it's ambiguous which side holds the minimum (duplicates hide the information), so simply shrink the search range by decrementing `hi` by one instead of eliminating half the array.

## C# Solution

```csharp
public class Solution
{
    public int FindMin(int[] nums)
    {
        int lo = 0, hi = nums.Length - 1;

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;

            if (nums[mid] > nums[hi])
            {
                lo = mid + 1;
            }
            else if (nums[mid] < nums[hi])
            {
                hi = mid;
            }
            else
            {
                hi--;
            }
        }

        return nums[lo];
    }
}
```

## Complexity

- **Time:** `O(log n)` average, `O(n)` worst case (all duplicates).
- **Space:** `O(1)`.
