# 2905. Find Indices With Index and Value Difference II

**Difficulty:** Medium
**Category:** Array

## Problem

Similar to problem 2903, but with potentially larger constraints requiring an optimized solution. Find two indices `i` and `j` such that `abs(i - j) >= indexDifference` and `abs(nums[i] - nums[j]) >= valueDifference`.

### Example

```
Input: nums = [1,2,3], indexDifference = 2, valueDifference = 4
Output: [-1,-1]
Explanation: No valid pair exists.
```

## Approach

Use a sliding window approach. As we iterate through index `j`, maintain the minimum and maximum values seen in the valid range `[0, j - indexDifference]`. For each position `j`, check if the difference between `nums[j]` and either the tracked minimum or maximum meets the `valueDifference` requirement. This avoids the O(n^2) nested loop.

## C# Solution

```csharp
public class Solution 
{
    public int[] FindIndices(int[] nums, int indexDifference, int valueDifference) 
    {
        int n = nums.Length;
        int minIdx = 0, maxIdx = 0;
        
        for (int j = indexDifference; j < n; j++) 
        {
            int i = j - indexDifference;
            
            if (nums[i] < nums[minIdx]) minIdx = i;
            if (nums[i] > nums[maxIdx]) maxIdx = i;
            
            if (Math.Abs(nums[j] - nums[minIdx]) >= valueDifference) 
            {
                return new int[] { minIdx, j };
            }
            if (Math.Abs(nums[j] - nums[maxIdx]) >= valueDifference) 
            {
                return new int[] { maxIdx, j };
            }
        }
        
        return new int[] { -1, -1 };
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
