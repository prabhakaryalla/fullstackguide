# 645. Set Mismatch

**Difficulty:** Easy
**Category:** Array, Hash Table, Bit Manipulation, Sorting

## Problem

Given an array `nums` representing a set of `1` to `n` where one number is duplicated and another is missing, return an array `[duplicate, missing]`.

### Example

```
Input: nums = [1,2,2,4]
Output: [2,3]
```

### Constraints

- `2 <= nums.length <= 10^4`
- `1 <= nums[i] <= 10^4`

## Approach

Use the array itself as a presence marker: for each value `v` encountered, negate the value at index `v - 1` (if not already negative) to record that `v` was seen. If that index's value is already negative, `v` is the duplicate. After the pass, the one remaining positive value's index reveals the missing number.

## C# Solution

```csharp
public class Solution
{
    public int[] FindErrorNums(int[] nums)
    {
        int n = nums.Length;
        int duplicate = -1;

        for (int i = 0; i < n; i++)
        {
            int index = Math.Abs(nums[i]) - 1;
            if (nums[index] < 0)
                duplicate = Math.Abs(nums[i]);
            else
                nums[index] = -nums[index];
        }

        int missing = -1;
        for (int i = 0; i < n; i++)
        {
            if (nums[i] > 0)
            {
                missing = i + 1;
                break;
            }
        }

        return new[] { duplicate, missing };
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
