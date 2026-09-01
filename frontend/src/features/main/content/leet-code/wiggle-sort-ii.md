# 324. Wiggle Sort II

**Difficulty:** Medium
**Category:** Array, Divide and Conquer, Sorting

## Problem

Given an integer array `nums`, reorder it in place so that `nums[0] < nums[1] > nums[2] < nums[3]...`.

### Example

```
Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
```

### Constraints

- `1 <= nums.length <= 5 * 10^4`
- `0 <= nums[i] <= 5000`
- It is guaranteed that there will be an answer for the given input.

## Approach

Sort a copy of the array, then fill the smaller half of the sorted values into the even (peak-adjacent, lower) positions from the back of that half, and the larger half into the odd (peak) positions from the back of that half. Filling from the back of each half prevents adjacent duplicate values from landing next to each other.

## C# Solution

```csharp
public class Solution
{
    public void WiggleSort(int[] nums)
    {
        int n = nums.Length;
        var sorted = (int[])nums.Clone();
        Array.Sort(sorted);

        int mid = (n + 1) / 2;
        int left = mid - 1;
        int right = n - 1;

        for (int i = 0; i < n; i++)
        {
            if (i % 2 == 0)
                nums[i] = sorted[left--];
            else
                nums[i] = sorted[right--];
        }
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(n)` for the sorted copy.
