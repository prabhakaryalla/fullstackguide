# 581. Shortest Unsorted Continuous Subarray

**Difficulty:** Medium
**Category:** Array, Two Pointers, Stack, Greedy, Sorting, Monotonic Stack

## Problem

Given an integer array `nums`, find the shortest contiguous subarray such that sorting only that subarray in ascending order makes the whole array sorted. Return the length of that subarray, or `0` if the array is already sorted.

### Example

```
Input: nums = [2,6,4,8,10,9,15]
Output: 5
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^5 <= nums[i] <= 10^5`

## Approach

Scan left to right tracking the maximum value seen so far; any position where the current value is smaller than that running maximum must lie within the unsorted region, so update the rightmost boundary there. Symmetrically, scan right to left tracking the minimum seen so far, updating the leftmost boundary wherever the current value exceeds it. The answer is the span between these two boundaries.

## C# Solution

```csharp
public class Solution
{
    public int FindUnsortedSubarray(int[] nums)
    {
        int n = nums.Length;
        int left = -1, right = -1;
        int maxSeen = int.MinValue, minSeen = int.MaxValue;

        for (int i = 0; i < n; i++)
        {
            if (nums[i] < maxSeen) right = i;
            else maxSeen = nums[i];
        }

        for (int i = n - 1; i >= 0; i--)
        {
            if (nums[i] > minSeen) left = i;
            else minSeen = nums[i];
        }

        return left == -1 ? 0 : right - left + 1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
