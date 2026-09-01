# 2936. Number of Equal Numbers Blocks

**Difficulty:** Medium
**Category:** Array, Binary Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an array `nums` represented by a BigArray interface that only allows accessing elements at specific indices. Find the number of blocks where consecutive equal elements form a group. You're limited in the number of access operations.

### Example

```
Input: nums = [3,3,3,1,3]
Output: 3
Explanation: Blocks are [3,3,3], [1], [3].
```

## Approach

Use binary search to efficiently find block boundaries. For each position, binary search to find where the current value ends. This minimizes the number of accesses to the array compared to linear scanning.

## C# Solution

```csharp
public class Solution 
{
    public int CountBlocks(BigArray nums) 
    {
        long n = nums.Size();
        int blocks = 0;
        long i = 0;
        
        while (i < n) 
        {
            int currentVal = nums.At(i);
            long left = i;
            long right = n - 1;
            long nextDifferent = n;
            
            while (left <= right) 
            {
                long mid = left + (right - left) / 2;
                if (nums.At(mid) != currentVal) 
                {
                    nextDifferent = mid;
                    right = mid - 1;
                } 
                else 
                {
                    left = mid + 1;
                }
            }
            
            blocks++;
            i = nextDifferent;
        }
        
        return blocks;
    }
}
```

## Complexity

- **Time:** O(blocks * log n) accesses
- **Space:** O(1)
