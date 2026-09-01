# 2780. Minimum Index of a Valid Split

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

An element `x` of an integer array `arr` of length `m` is dominant if `freq(x) * 2 > m`, where `freq(x)` is the number of occurrences of `x` in `arr`.

A split at index `i` is valid if:
- `0 <= i < n - 1`
- `arr[0..i]` has a dominant element, and
- `arr[i+1..n-1]` has a dominant element.

Return the minimum index of a valid split. If no valid split exists, return `-1`.

### Example

```
Input: nums = [1,2,2,2]
Output: 2
Explanation: Split at index 2: [1,2,2] has dominant 2, [2] has dominant 2.
```

## Approach

First identify the dominant element of the entire array (if none exists, return -1). Then iterate through possible split points, tracking counts on both sides. Check if the dominant element remains dominant on both sides.

## C# Solution

```csharp
public class Solution
{
    public int MinimumIndex(IList<int> nums)
    {
        int n = nums.Count;
        var freq = new Dictionary<int, int>();
        
        foreach (int num in nums)
        {
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        }
        
        int dominant = -1;
        int domCount = 0;
        
        foreach (var kvp in freq)
        {
            if (kvp.Value * 2 > n)
            {
                dominant = kvp.Key;
                domCount = kvp.Value;
                break;
            }
        }
        
        if (dominant == -1) return -1;
        
        int leftCount = 0;
        
        for (int i = 0; i < n - 1; i++)
        {
            if (nums[i] == dominant)
            {
                leftCount++;
            }
            
            int rightCount = domCount - leftCount;
            int leftSize = i + 1;
            int rightSize = n - leftSize;
            
            if (leftCount * 2 > leftSize && rightCount * 2 > rightSize)
            {
                return i;
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
