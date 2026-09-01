# 3487. Maximum Unique Subarray Sum After Deletion

**Difficulty:** Easy
**Category:** Array, Hash Table, Greedy

## Problem

You are given an integer array `nums`. You are allowed to delete any number of elements from `nums` (possibly zero) so that the remaining elements are all distinct (no two equal values). Return the maximum possible sum of the remaining elements. If it is best to delete everything, the answer is `0`.

### Example

```
Input: nums = [1,2,3,4,5]
Output: 15
Explanation: All elements are already distinct, so keep everything: 1+2+3+4+5 = 15.

Input: nums = [5,-1,-3,8]
Output: 13
Explanation: Keep 5 and 8, and drop the negative values since including them would only reduce the sum: 5+8 = 13.
```

## Approach

Only distinct values matter, since keeping more than one copy of a value is never allowed. Among the distinct values, keeping a negative one only lowers the sum, and dropping it is always allowed (the remaining array can be smaller), so the optimal strategy is to sum every **positive** distinct value and ignore non-positive ones entirely.

## C# Solution

```csharp
public class Solution 
{
    public int MaximumSum(int[] nums) 
    {
        var distinct = new HashSet<int>(nums);
        int sum = 0;
        foreach (int v in distinct)
        {
            if (v > 0)
            {
                sum += v;
            }
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `nums`.
- **Space:** O(n) for the set of distinct values.
