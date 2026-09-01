# 2908. Minimum Sum of Mountain Triplets I

**Difficulty:** Easy
**Category:** Array

## Problem

You are given an array of integers `nums`. A mountain triplet is a triplet of indices `(i, j, k)` such that `i < j < k` and `nums[i] < nums[j]` and `nums[k] < nums[j]`. Return the minimum possible sum of a mountain triplet, or -1 if no such triplet exists.

### Example

```
Input: nums = [8,6,1,5,3]
Output: 9
Explanation: Triplet (2, 3, 4) forms a mountain: 1 < 5 and 3 < 5, sum = 1 + 5 + 3 = 9.
```

## Approach

Use a brute force triple nested loop to check all possible triplets `(i, j, k)` where `i < j < k`. For each triplet, verify if it forms a mountain (middle element is strictly greater than both sides). Track the minimum sum among all valid mountain triplets.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumSum(int[] nums) 
    {
        int n = nums.Length;
        int minSum = int.MaxValue;
        bool found = false;
        
        for (int i = 0; i < n - 2; i++) 
        {
            for (int j = i + 1; j < n - 1; j++) 
            {
                if (nums[i] >= nums[j]) continue;
                
                for (int k = j + 1; k < n; k++) 
                {
                    if (nums[k] < nums[j]) 
                    {
                        int sum = nums[i] + nums[j] + nums[k];
                        minSum = Math.Min(minSum, sum);
                        found = true;
                    }
                }
            }
        }
        
        return found ? minSum : -1;
    }
}
```

## Complexity

- **Time:** O(n^3)
- **Space:** O(1)
