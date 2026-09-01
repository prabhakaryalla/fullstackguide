# 2863. Maximum Length of Semi-Decreasing Subarrays

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack, Sorting

## Problem

You are given an integer array `nums`. A semi-decreasing subarray is a subarray where the first element is strictly greater than the last element.

Return the length of the longest semi-decreasing subarray of `nums`, or 0 if no such subarray exists.

### Example

```
Input: nums = [7,6,5,4,3,2,1,6,10,11]
Output: 8
Explanation:
The subarray [7,6,5,4,3,2,1,6] is semi-decreasing (7 > 6).
Length: 8
```

## Approach

For each index `i`, find the farthest index `j > i` such that `nums[i] > nums[j]`. This gives a semi-decreasing subarray from `i` to `j`.

Use a monotonic stack or sort indices by value to efficiently find the farthest valid `j` for each `i`. For each starting position, binary search or scan to find the maximum length.

## C# Solution

```csharp
public class Solution
{
    public int MaxSubarrayLength(int[] nums)
    {
        int n = nums.Length;
        int maxLen = 0;
        
        var indices = Enumerable.Range(0, n).ToList();
        indices.Sort((a, b) => 
        {
            int cmp = nums[b].CompareTo(nums[a]);
            return cmp != 0 ? cmp : a.CompareTo(b);
        });
        
        int minIndex = n;
        
        foreach (int i in indices)
        {
            if (i < minIndex)
            {
                minIndex = i;
            }
            else
            {
                maxLen = Math.Max(maxLen, i - minIndex + 1);
            }
        }
        
        return maxLen;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — sorting indices.
- **Space:** `O(n)` for the indices array.
