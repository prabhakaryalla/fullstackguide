# 945. Minimum Increment to Make Array Unique

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given an integer array `nums`, in one move you can increment any element by `1`. Return the minimum number of moves so that every element becomes unique.

### Example

```
Input: nums = [1,2,2]
Output: 1
```

## Approach

Sort the array. Walk left to right; whenever the current value is not greater than the previous one, bump it up to `previous + 1`, adding the difference to the total move count, and update the running "previous" value accordingly.

## C# Solution

```csharp
public class Solution
{
    public int MinIncrementForUnique(int[] nums)
    {
        Array.Sort(nums);
        int moves = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] <= nums[i - 1])
            {
                int diff = nums[i - 1] + 1 - nums[i];
                moves += diff;
                nums[i] += diff;
            }
        }

        return moves;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` extra.
