# 2871. Split Array Into Maximum Number of Subarrays

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Greedy

## Problem

You are given an array `nums` consisting of non-negative integers. Split the array into one or more subarrays such that:
- Each element belongs to exactly one subarray
- The bitwise AND of all the bitwise ANDs of the subarrays is minimized

Return the maximum number of subarrays you can split the array into while achieving the minimum possible bitwise AND.

### Example

```
Input: nums = [1,0,2,0,1,2]
Output: 3
Explanation:
Split into [1,0], [2,0], [1,2].
- Subarray [1,0]: 1 AND 0 = 0
- Subarray [2,0]: 2 AND 0 = 0  
- Subarray [1,2]: 1 AND 2 = 0
Result: 0 AND 0 AND 0 = 0
This is the minimum possible, with 3 subarrays.
```

## Approach

The minimum possible result is the AND of the entire array. If this value is greater than 0, we cannot improve it by splitting, so return 1.

If the total AND is 0, greedily split the array: start a new subarray whenever the current running AND becomes 0. This maximizes the number of subarrays while maintaining the overall AND as 0.

## C# Solution

```csharp
public class Solution
{
    public int MaxSubarrays(int[] nums)
    {
        int totalAnd = nums[0];
        for (int i = 1; i < nums.Length; i++)
            totalAnd &= nums[i];
        
        if (totalAnd > 0)
            return 1;
        
        int count = 0;
        int currentAnd = int.MaxValue;
        
        foreach (int num in nums)
        {
            currentAnd &= num;
            
            if (currentAnd == 0)
            {
                count++;
                currentAnd = int.MaxValue;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** `O(n)` — two passes through the array.
- **Space:** `O(1)`.
