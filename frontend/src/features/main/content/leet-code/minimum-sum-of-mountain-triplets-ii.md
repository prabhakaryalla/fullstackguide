# 2909. Minimum Sum of Mountain Triplets II

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

Same as problem 2908 but with larger constraints requiring an optimized O(n) or O(n log n) solution. Find the minimum sum of a mountain triplet where the middle element is strictly greater than both sides.

### Example

```
Input: nums = [5,4,8,7,10,2]
Output: 13
Explanation: Mountain triplet at indices (1,3,5): 4 < 7 and 2 < 7, sum = 4 + 7 + 2 = 13.
```

## Approach

Precompute for each index `j` the minimum value to its left and the minimum value to its right. Then iterate through each index as the middle of the mountain. For position `j`, check if there's a valid mountain by ensuring both `leftMin[j] < nums[j]` and `rightMin[j] < nums[j]`. If valid, the sum is `leftMin[j] + nums[j] + rightMin[j]`.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumSum(int[] nums) 
    {
        int n = nums.Length;
        int[] leftMin = new int[n];
        int[] rightMin = new int[n];
        
        leftMin[0] = int.MaxValue;
        for (int i = 1; i < n; i++) 
        {
            leftMin[i] = Math.Min(leftMin[i - 1], nums[i - 1]);
        }
        
        rightMin[n - 1] = int.MaxValue;
        for (int i = n - 2; i >= 0; i--) 
        {
            rightMin[i] = Math.Min(rightMin[i + 1], nums[i + 1]);
        }
        
        int minSum = int.MaxValue;
        for (int j = 1; j < n - 1; j++) 
        {
            if (leftMin[j] < nums[j] && rightMin[j] < nums[j]) 
            {
                minSum = Math.Min(minSum, leftMin[j] + nums[j] + rightMin[j]);
            }
        }
        
        return minSum == int.MaxValue ? -1 : minSum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
