# 2366. Minimum Replacements to Sort the Array

**Difficulty:** Hard
**Category:** Array, Greedy, Math

## Problem

You are given a 0-indexed integer array `nums`. In one operation you can replace any element of the array with any two elements that sum to it.

For example, consider `nums = [5,6,7]`. In one operation, we can replace `nums[1]` with `2` and `4` and convert `nums` to `[5,2,4,7]`.

Return the minimum number of operations to make the array non-decreasing.

### Example

```
Input: nums = [3,9,3]
Output: 2
Explanation: Replace 9 with 3+3+3 (2 operations)
```

## Approach

Traverse from right to left. For each element, if it's greater than the next element, split it into parts that don't exceed the next value. The optimal split minimizes operations while keeping maximum part as large as possible.

## C# Solution

```csharp
public class Solution
{
    public long MinimumReplacement(int[] nums)
    {
        int n = nums.Length;
        long operations = 0;
        int prev = nums[n - 1];
        
        for (int i = n - 2; i >= 0; i--)
        {
            if (nums[i] <= prev)
            {
                prev = nums[i];
            }
            else
            {
                long parts = (nums[i] + prev - 1) / prev;
                operations += parts - 1;
                prev = nums[i] / (int)parts;
            }
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
