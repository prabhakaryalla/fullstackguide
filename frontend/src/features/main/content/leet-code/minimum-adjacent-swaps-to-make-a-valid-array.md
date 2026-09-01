# 2340. Minimum Adjacent Swaps to Make a Valid Array

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

You are given a 0-indexed integer array `nums`.

Swaps of adjacent elements are able to be performed on `nums`.

A valid array meets the following conditions:

- The largest element (any of the largest elements if there are multiple) is at the rightmost position in the array.
- The smallest element (any of the smallest elements if there are multiple) is at the leftmost position in the array.

Return the minimum swaps required to make `nums` a valid array.

### Example

```
Input: nums = [3,4,5,5,3,1]
Output: 6
Explanation: Move 1 to front (4 swaps) and 5 to end (2 swaps)
```

## Approach

Find the leftmost index of the minimum and the rightmost index of the maximum. Count swaps needed to move min to position 0 and max to position n-1. If min was originally to the right of max and they need to cross, subtract 1 from the total.

## C# Solution

```csharp
public class Solution
{
    public int MinimumSwaps(int[] nums)
    {
        int n = nums.Length;
        if (n == 1) return 0;
        
        int minVal = nums.Min();
        int maxVal = nums.Max();
        
        int minIdx = -1, maxIdx = -1;
        
        for (int i = 0; i < n; i++)
        {
            if (nums[i] == minVal && minIdx == -1)
                minIdx = i;
            if (nums[i] == maxVal)
                maxIdx = i;
        }
        
        int swaps = minIdx + (n - 1 - maxIdx);
        
        if (minIdx > maxIdx)
            swaps--;
        
        return swaps;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
