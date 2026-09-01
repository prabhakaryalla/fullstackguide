# 611. Valid Triangle Number

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Greedy, Sorting

## Problem

Given an integer array `nums`, return the number of triplets chosen from the array that can form the sides of a valid triangle.

### Example

```
Input: nums = [2,2,3,4]
Output: 3
```

### Constraints

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`

## Approach

Sort the array, then fix the largest side `nums[k]` from the right and use two pointers `left` and `right` spanning the remaining smaller elements. If `nums[left] + nums[right] > nums[k]`, every value between `left` and `right` also satisfies the triangle inequality when paired with `nums[right]` and `nums[k]` (since the array is sorted), so add `right - left` valid triplets at once and shrink `right`; otherwise, advance `left` to increase the sum.

## C# Solution

```csharp
public class Solution
{
    public int TriangleNumber(int[] nums)
    {
        Array.Sort(nums);
        int count = 0;
        int n = nums.Length;

        for (int k = n - 1; k >= 2; k--)
        {
            int left = 0, right = k - 1;

            while (left < right)
            {
                if (nums[left] + nums[right] > nums[k])
                {
                    count += right - left;
                    right--;
                }
                else
                {
                    left++;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)` extra, excluding the sort.
