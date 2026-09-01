# 976. Largest Perimeter Triangle

**Difficulty:** Easy
**Category:** Array, Math, Greedy, Sorting

## Problem

Given an array of positive integers representing side lengths, return the largest perimeter of a triangle that can be formed using three of them, or `0` if none can be formed.

### Example

```
Input: nums = [2,1,2]
Output: 5
```

## Approach

Sort the lengths. Check consecutive triples from the largest down: three sorted lengths `a <= b <= c` form a valid triangle exactly when `a + b > c`. The first (largest) triple satisfying this gives the maximum perimeter, since larger lengths always dominate when a valid triangle exists.

## C# Solution

```csharp
public class Solution
{
    public int LargestPerimeter(int[] nums)
    {
        Array.Sort(nums);

        for (int i = nums.Length - 1; i >= 2; i--)
        {
            if (nums[i - 2] + nums[i - 1] > nums[i]) return nums[i - 2] + nums[i - 1] + nums[i];
        }

        return 0;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` extra.
