# 2210. Count Hills and Valleys in an Array

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 0-indexed integer array `nums`. An index `i` is part of a hill if the closest non-equal neighbors of `i` are smaller than `nums[i]`. Similarly, an index `i` is part of a valley if the closest non-equal neighbors of `i` are larger than `nums[i]`. Adjacent indices `i` and `j` are part of the same hill or valley if `nums[i] == nums[j]`.

Note that for an index to be part of a hill or valley, it must have a closest non-equal neighbor on both the left and right.

Return the number of hills and valleys in `nums`.

### Example

```
Input: nums = [2,4,1,1,6,5]
Output: 3
Explanation:
At index 1: left neighbor 2, right neighbor 1 -> hill
At index 2 and 3: left neighbor 4, right neighbor 6 -> valley (count as 1)
At index 4: left neighbor 1, right neighbor 5 -> hill
```

## Approach

1. Remove consecutive equal values to get a simplified array
2. Count positions where the element is either greater than both neighbors (hill) or smaller than both neighbors (valley)
3. Skip first and last elements as they don't have both neighbors

## C# Solution

```csharp
public class Solution
{
    public int CountHillValley(int[] nums)
    {
        // Remove consecutive duplicates
        List<int> simplified = new List<int>();
        simplified.Add(nums[0]);
        
        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] != nums[i - 1])
            {
                simplified.Add(nums[i]);
            }
        }
        
        if (simplified.Count < 3)
        {
            return 0;
        }
        
        int count = 0;
        
        for (int i = 1; i < simplified.Count - 1; i++)
        {
            int left = simplified[i - 1];
            int curr = simplified[i];
            int right = simplified[i + 1];
            
            // Check if hill (curr > both neighbors) or valley (curr < both neighbors)
            if ((curr > left && curr > right) || (curr < left && curr < right))
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of the array
- **Space:** O(n), for the simplified array
