# 442. Find All Duplicates in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Given an integer array `nums` of length `n` where every integer is in the range `[1, n]` and each appears once or twice, return an array of all the integers that appear twice.

### Example

```
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10^5`
- `1 <= nums[i] <= n`
- The algorithm should run in `O(n)` time and use only constant extra space.

## Approach

Use the array itself as a hash map: for each value `v` encountered, negate the value stored at index `v - 1` to mark that `v` has been seen. If that index's value is already negative when visited, `v` has appeared before, so add it to the result.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindDuplicates(int[] nums)
    {
        var result = new List<int>();

        for (int i = 0; i < nums.Length; i++)
        {
            int index = Math.Abs(nums[i]) - 1;
            if (nums[index] < 0)
            {
                result.Add(index + 1);
            }
            else
            {
                nums[index] = -nums[index];
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra, excluding the output list.
