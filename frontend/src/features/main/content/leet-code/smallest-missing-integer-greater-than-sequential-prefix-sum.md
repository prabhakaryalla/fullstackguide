# 2996. Smallest Missing Integer Greater Than Sequential Prefix Sum

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting

## Problem

You are given a 0-indexed array of integers `nums`. A prefix `nums[0..k]` is sequential if `nums[i+1] = nums[i] + 1` for all `i` in the range. Find the sum of the longest sequential prefix, then return the smallest integer greater than or equal to this sum that does not appear in the array.

### Example

```
Input: nums = [1, 2, 3, 2, 5]
Output: 6
Explanation: Sequential prefix is [1,2,3] with sum = 6. 6 doesn't appear, so return 6.

Input: nums = [3, 4, 5, 1, 12, 14, 13]
Output: 15
Explanation: Sequential prefix is [3,4,5] with sum = 12. 12 appears, 13 appears, 14 appears, so return 15.
```

## Approach

Find the longest sequential prefix starting from `nums[0]`. Calculate its sum. Create a set of all numbers in the array. Starting from the sum, find the first integer not in the set.

## C# Solution

```csharp
public class Solution
{
    public int MissingInteger(int[] nums)
    {
        int sum = nums[0];
        int i = 1;

        while (i < nums.Length && nums[i] == nums[i - 1] + 1)
        {
            sum += nums[i];
            i++;
        }

        var numSet = new HashSet<int>(nums);

        while (numSet.Contains(sum))
        {
            sum++;
        }

        return sum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
