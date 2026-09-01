# 413. Arithmetic Slices

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

An integer array is called arithmetic if it consists of at least three elements and the difference between any two consecutive elements is the same. Given an integer array `nums`, return the number of arithmetic subarrays (contiguous).

### Example

```
Input: nums = [1,2,3,4]
Output: 3
Explanation: [1,2,3], [2,3,4], and [1,2,3,4] itself.
```

### Constraints

- `1 <= nums.length <= 5000`
- `-1000 <= nums[i] <= 1000`

## Approach

Track the length of the current run of equal consecutive differences using a rolling counter `current`. Each time the difference matches the previous one, the number of new arithmetic subarrays ending at this position equals `current` (incremented first), which is added to the running total; a differing difference resets the counter to zero.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfArithmeticSlices(int[] nums)
    {
        int total = 0, current = 0;

        for (int i = 2; i < nums.Length; i++)
        {
            if (nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2])
            {
                current++;
                total += current;
            }
            else
            {
                current = 0;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
