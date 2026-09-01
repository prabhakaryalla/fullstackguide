# 2708. Maximum Strength of a Group

**Difficulty:** Medium
**Category:** Array, Greedy, Backtracking, Bit Manipulation, Sorting

## Problem

You are given an array of integers `nums` representing the strength of some heroes. The strength of a group of heroes is defined as the product of their strengths.

Return the maximum strength of a non-empty group you can choose from the heroes.

### Example

```
Input: nums = [3,-1,-5,2,5,-9]
Output: 1350
Explanation: One optimal group is [3,-5,2,5,-9]. The product is 3 * (-5) * 2 * 5 * (-9) = 1350.

Input: nums = [-4,-5,-4]
Output: 20
Explanation: The group [-4,-5] has product 20.
```

## Approach

The key insight is that we want to maximize the product. Negative numbers in pairs contribute positively to the product.

Strategy:
1. Separate positive numbers, negative numbers, and zeros
2. Include all positive numbers
3. Include pairs of negative numbers (from the smallest, i.e., most negative)
4. If we have an odd count of negatives, exclude the one with the smallest absolute value
5. Handle edge cases where the array contains only zero or only one negative number

## C# Solution

```csharp
public class Solution 
{
    public long MaxStrength(int[] nums) 
    {
        Array.Sort(nums);
        int n = nums.Length;
        
        if (n == 1) return nums[0];
        
        long product = 1;
        bool hasPositive = false;
        int negCount = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (nums[i] > 0)
            {
                product *= nums[i];
                hasPositive = true;
            }
            else if (nums[i] < 0)
            {
                negCount++;
            }
        }
        
        if (negCount >= 2)
        {
            int pairs = negCount / 2 * 2;
            for (int i = 0; i < pairs; i++)
            {
                product *= nums[i];
            }
            hasPositive = true;
        }
        
        if (!hasPositive && negCount == 1)
        {
            return Math.Max(nums[n - 1], 0);
        }
        
        if (!hasPositive && negCount == 0)
        {
            return 0;
        }
        
        return product;
    }
}
```

## Complexity

- **Time:** O(n log n) due to sorting
- **Space:** O(1)
