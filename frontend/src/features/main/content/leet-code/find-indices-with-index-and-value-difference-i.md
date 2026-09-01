# 2903. Find Indices With Index and Value Difference I

**Difficulty:** Easy
**Category:** Array

## Problem

You are given an integer array `nums` and two non-negative integers `indexDifference` and `valueDifference`. Find two indices `i` and `j` such that:
- `abs(i - j) >= indexDifference`
- `abs(nums[i] - nums[j]) >= valueDifference`

Return an array `[i, j]`. If no such pair exists, return `[-1, -1]`.

### Example

```
Input: nums = [5,1,4,1], indexDifference = 2, valueDifference = 4
Output: [0,3]
Explanation: abs(0 - 3) = 3 >= 2 and abs(5 - 1) = 4 >= 4.
```

## Approach

Use a brute force approach: iterate through all valid pairs `(i, j)` where the index difference is at least `indexDifference`. For each pair, check if the value difference meets the requirement. Since this is the easier version of the problem, the constraints allow O(n^2) time.

## C# Solution

```csharp
public class Solution 
{
    public int[] FindIndices(int[] nums, int indexDifference, int valueDifference) 
    {
        int n = nums.Length;
        
        for (int i = 0; i < n; i++) 
        {
            for (int j = i + indexDifference; j < n; j++) 
            {
                if (Math.Abs(nums[i] - nums[j]) >= valueDifference) 
                {
                    return new int[] { i, j };
                }
            }
        }
        
        return new int[] { -1, -1 };
    }
}
```

## Complexity

- **Time:** O(n^2) in worst case
- **Space:** O(1)
