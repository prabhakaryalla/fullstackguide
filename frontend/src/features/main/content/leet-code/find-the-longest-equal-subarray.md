# 2831. Find the Longest Equal Subarray

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

You are given a 0-indexed integer array nums and an integer k.

A subarray is called equal if all of its elements are equal. Note that an empty subarray is an equal subarray.

Return the length of the longest possible equal subarray after deleting at most k elements from nums.

### Example

```
Input: nums = [1,3,2,3,1,3], k = 3
Output: 3
Explanation: Delete elements at indices 0, 1, 2 to get [3,1,3]. Then delete index 1 to get [3,3,3] with length 3
Or better: delete indices 0,2,4 to get [3,3,3] with length 3 directly
```

## Approach

This is a sliding window problem. We want to find the longest window where we can make all elements equal by removing at most k elements.

For each unique value in the array, we find the longest subarray where:
- The number of occurrences of that value is maximized
- The number of other elements (to be deleted) is at most k

We use a sliding window approach for each value:
- Maintain positions where the value appears
- For a window of positions, the number of deletions needed is: (rightPos - leftPos + 1) - count
- Where count is the number of occurrences of the value in that range

## C# Solution

```csharp
public class Solution
{
    public int LongestEqualSubarray(List<int> nums, int k)
    {
        int n = nums.Count;
        Dictionary<int, List<int>> positions = new Dictionary<int, List<int>>();
        
        for (int i = 0; i < n; i++)
        {
            if (!positions.ContainsKey(nums[i]))
                positions[nums[i]] = new List<int>();
            positions[nums[i]].Add(i);
        }
        
        int maxLength = 0;
        
        foreach (var pair in positions)
        {
            List<int> pos = pair.Value;
            int left = 0;
            
            for (int right = 0; right < pos.Count; right++)
            {
                // Window from pos[left] to pos[right]
                int windowSize = pos[right] - pos[left] + 1;
                int count = right - left + 1;
                int deletions = windowSize - count;
                
                while (deletions > k)
                {
                    left++;
                    if (left <= right)
                    {
                        windowSize = pos[right] - pos[left] + 1;
                        count = right - left + 1;
                        deletions = windowSize - count;
                    }
                }
                
                maxLength = Math.Max(maxLength, count);
            }
        }
        
        return maxLength;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(n) for storing positions
