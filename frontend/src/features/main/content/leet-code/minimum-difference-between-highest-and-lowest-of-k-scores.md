# 1984. Minimum Difference Between Highest and Lowest of K Scores

**Difficulty:** Easy
**Category:** Array, Sorting, Sliding Window

## Problem

Given an array `nums` of student scores and an integer `k`, choose the scores of exactly `k` students to minimize the difference between the highest and lowest of the chosen scores. Return that minimum difference.

### Example

```
Input: nums = [90], k = 1
Output: 0
Explanation: Any single score has difference 0 between max and min.
```

### Constraints

- `1 <= k <= nums.length <= 1000`
- `0 <= nums[i] <= 10^5`

## Approach

Sort `nums`. In a sorted array, the minimum-range window of size `k` must be a contiguous block (any non-contiguous choice can only have an equal or larger range, since we'd be including a value farther away without gaining anything). Slide a window of size `k` over the sorted array and take the minimum of `nums[i + k - 1] - nums[i]`.

## C# Solution

```csharp
public class Solution
{
    public int MinimumDifference(int[] nums, int k)
    {
        Array.Sort(nums);
        int best = int.MaxValue;

        for (int i = 0; i + k - 1 < nums.Length; i++)
        {
            best = Math.Min(best, nums[i + k - 1] - nums[i]);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting.
- **Space:** `O(log n)` to `O(n)` depending on the sort implementation.
