# 3731. Find Missing Elements

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an array `nums` of `n` integers where each value lies in the range `[1, n]` (with possible duplicates), return a list of all integers in `[1, n]` that do not appear in `nums`.

### Example

nums = [4,3,2,7,8,2,3,1] → missing values are 5 and 6.

## Approach

For each value `v` in `nums`, negate the element at index `|v| - 1` (if not already negative) to mark that `v` has been seen. Afterward, every index whose value is still positive corresponds to a missing number (index + 1).

## C# Solution

```csharp
public class Solution 
{
    public IList<int> FindMissingElements(int[] nums) 
    {
        for (int i = 0; i < nums.Length; i++) 
        {
            int idx = Math.Abs(nums[i]) - 1;
            if (nums[idx] > 0) nums[idx] = -nums[idx];
        }

        var missing = new List<int>();
        for (int i = 0; i < nums.Length; i++) 
        {
            if (nums[i] > 0) missing.Add(i + 1);
        }
        return missing;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) extra (excluding output)
