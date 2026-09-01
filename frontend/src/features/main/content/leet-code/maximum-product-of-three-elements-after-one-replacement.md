# 3732. Maximum Product of Three Elements After One Replacement

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

Given an integer array `nums` (all values between 1 and 1000, with `nums.Length >= 3`), you must replace exactly one element with any integer between 1 and 1000, then choose three elements to maximize their product. Return the maximum achievable product.

### Example

nums = [1,2,3] → replace the minimum (1) with 1000: array becomes [1000,2,3], best product of three is 1000*2*3=6000.

## Approach

Replacing the current minimum with the maximum allowed value (1000) never hurts and always helps or ties any other choice, since it discards the least useful element and inserts the best possible one. The resulting maximum product of three is simply `1000 * max1 * max2`, where `max1` and `max2` are the two largest original values.

## C# Solution

```csharp
public class Solution 
{
    public long MaxProductAfterReplacement(int[] nums) 
    {
        int max1 = int.MinValue, max2 = int.MinValue;
        foreach (int x in nums) 
        {
            if (x > max1) 
            {
                max2 = max1;
                max1 = x;
            } 
            else if (x > max2) 
            {
                max2 = x;
            }
        }
        return 1000L * max1 * max2;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
