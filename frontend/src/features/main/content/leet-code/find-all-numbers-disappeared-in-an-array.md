# 448. Find All Numbers Disappeared in an Array

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return an array of all the integers in `[1, n]` that do not appear in `nums`.

### Example

```
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10^5`
- `1 <= nums[i] <= n`
- The algorithm should run in `O(n)` time and use only constant extra space (excluding the output).

## Approach

Use the array itself as a presence marker: for each value `v` encountered, negate the value at index `v - 1` (if not already negative) to record that `v` was seen. After one pass, any index whose value is still positive corresponds to a number that never appeared.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindDisappearedNumbers(int[] nums)
    {
        for (int i = 0; i < nums.Length; i++)
        {
            int index = Math.Abs(nums[i]) - 1;
            if (nums[index] > 0)
                nums[index] = -nums[index];
        }

        var result = new List<int>();
        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] > 0)
                result.Add(i + 1);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra, excluding the output list.
