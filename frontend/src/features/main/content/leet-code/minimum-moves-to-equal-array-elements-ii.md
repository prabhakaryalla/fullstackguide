# 462. Minimum Moves to Equal Array Elements II

**Difficulty:** Medium
**Category:** Array, Math, Sorting

## Problem

Given an integer array `nums`, return the minimum number of moves required to make all array elements equal, where in one move you can increment or decrement an element by `1`.

### Example

```
Input: nums = [1,2,3]
Output: 2
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Approach

The total number of moves needed to converge all elements to a single target value is minimized when that target is the median of the array — any other target increases the total distance to at least one side more than it decreases the other. Sort the array, pick the middle element as the target, and sum the absolute differences.

## C# Solution

```csharp
public class Solution
{
    public int MinMoves2(int[] nums)
    {
        Array.Sort(nums);
        int median = nums[nums.Length / 2];
        int moves = 0;

        foreach (var num in nums)
            moves += Math.Abs(num - median);

        return moves;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
