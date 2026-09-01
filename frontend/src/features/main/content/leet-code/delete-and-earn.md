# 740. Delete and Earn

**Difficulty:** Medium
**Category:** Array, Hash Table, Dynamic Programming

## Problem

Given an array of integers `nums`, repeatedly pick any element, earn `nums[i]` points, and delete every element equal to `nums[i] - 1` or `nums[i] + 1` (as well as `nums[i]` itself). Return the maximum number of points achievable.

### Example

```
Input: nums = [2,2,3,3,3,4]
Output: 9
```

## Approach

Since picking any occurrence of value `v` forces deleting all occurrences of `v - 1` and `v + 1`, aggregate the total points available at each distinct value (`value * count`), reducing the problem to the classic "House Robber" pattern over values `0` to `max(nums)`: picking value `v` excludes picking `v - 1` (its adjacent neighbor), so use the same rolling two-variable DP as House Robber, treating each value's total points as that position's "house value."

## C# Solution

```csharp
public class Solution
{
    public int DeleteAndEarn(int[] nums)
    {
        int maxVal = nums.Max();
        var pointsByValue = new int[maxVal + 1];

        foreach (var num in nums)
            pointsByValue[num] += num;

        int prev2 = 0, prev1 = 0;

        for (int i = 0; i <= maxVal; i++)
        {
            int current = Math.Max(prev1, prev2 + pointsByValue[i]);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}
```

## Complexity

- **Time:** `O(n + maxVal)`.
- **Space:** `O(maxVal)` for the points-by-value array.
