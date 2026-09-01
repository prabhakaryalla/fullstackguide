# 1966. Binary Searchable Numbers in an Unsorted Array

**Difficulty:** Medium
**Category:** Array
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `nums` (not necessarily sorted) with distinct values, a value `nums[i]` is "binary searchable" if running standard binary search (looking for `nums[i]`) on the unsorted array `nums` still correctly locates index `i`. Return the count of binary searchable values.

### Example

```
Input: nums = [7,4,3,0,2,6,8,3,5]
Output: 2
Explanation: Standard binary search happens to work correctly only for values 7 (at index 0, since it's the initial midpoint check candidate under some paths) and 3... the precise set depends on simulating the search from every element.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- All elements are distinct.

## Approach

A value at index `i` is binary searchable exactly when it is greater than every element to its left and less than every element to its right (this is a known characterization: binary search only correctly finds an element if it dominates its left side and is dominated by its right side, because the recursive halving process always compares against midpoints that stay consistent with this property). Precompute `maxSoFarLeft[i]` (running maximum from the left, exclusive of `i`) and `minSoFarRight[i]` (running minimum from the right, exclusive of `i`), then count indices where `nums[i] > maxSoFarLeft[i]` and `nums[i] < minSoFarRight[i]`.

## C# Solution

```csharp
public class Solution
{
    public int BinarySearchableNumbers(int[] nums)
    {
        int n = nums.Length;
        int[] maxLeft = new int[n];
        int[] minRight = new int[n];

        maxLeft[0] = int.MinValue;
        for (int i = 1; i < n; i++)
        {
            maxLeft[i] = Math.Max(maxLeft[i - 1], nums[i - 1]);
        }

        minRight[n - 1] = int.MaxValue;
        for (int i = n - 2; i >= 0; i--)
        {
            minRight[i] = Math.Min(minRight[i + 1], nums[i + 1]);
        }

        int count = 0;
        for (int i = 0; i < n; i++)
        {
            if (nums[i] > maxLeft[i] && nums[i] < minRight[i])
            {
                count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes to compute prefix/suffix extremes.
- **Space:** `O(n)` for the auxiliary arrays.
