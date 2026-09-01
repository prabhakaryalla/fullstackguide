# 280. Wiggle Sort

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given an integer array `nums`, reorder it in place such that `nums[0] <= nums[1] >= nums[2] <= nums[3]...` (a "wiggle" pattern).

### Example

```
Input: nums = [3,5,2,1,6,4]
Output: [3,5,1,6,2,4]  (one valid wiggle ordering)
```

## Approach

Scan through the array once. At each even-indexed position (0-based), enforce `nums[i] <= nums[i+1]` by swapping if violated; at each odd-indexed position, enforce `nums[i] >= nums[i+1]` by swapping if violated. This greedy local-swap approach produces a valid wiggle sequence in a single linear pass without a full sort.

## C# Solution

```csharp
public class Solution
{
    public void WiggleSort(int[] nums)
    {
        for (int i = 0; i < nums.Length - 1; i++)
        {
            bool shouldBeLessOrEqual = i % 2 == 0;
            bool isLessOrEqual = nums[i] <= nums[i + 1];

            if (shouldBeLessOrEqual != isLessOrEqual)
            {
                (nums[i], nums[i + 1]) = (nums[i + 1], nums[i]);
            }
        }
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass with at most one swap per position.
- **Space:** `O(1)` — sorted in place.
