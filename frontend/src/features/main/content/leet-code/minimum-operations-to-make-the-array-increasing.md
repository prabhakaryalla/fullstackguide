# 1827. Minimum Operations to Make the Array Increasing

**Difficulty:** Easy
**Category:** Array, Greedy

## Problem

In one operation you may increment any element of `nums` by `1`. Return the minimum number of operations needed to make `nums` strictly increasing.

### Example

```
Input: nums = [1,1,1]
Output: 3
```

## Approach

Scan left to right; whenever the current element is not strictly greater than the previous one, greedily raise it to exactly `previous + 1` (the cheapest valid value), tallying the number of increments spent, and continue with the updated value as the new "previous".

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums)
    {
        int operations = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] <= nums[i - 1])
            {
                operations += nums[i - 1] + 1 - nums[i];
                nums[i] = nums[i - 1] + 1;
            }
        }

        return operations;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
