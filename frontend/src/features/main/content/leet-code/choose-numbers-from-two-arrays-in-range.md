# 2143. Choose Numbers From Two Arrays in Range

**Difficulty:** Hard
**Category:** Array, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two 0-indexed integer arrays `nums1` and `nums2` of length `n`. A range `[l, r]` (inclusive) is valid if the sum of elements chosen from both arrays within this range meets certain criteria.

Return the number of valid ranges.

### Example

```
Input: nums1 = [1,2,3], nums2 = [1,2,3]
Output: 3
```

## Approach

Use dynamic programming or prefix sums to efficiently compute range sums. For each possible range `[l, r]`, calculate the optimal choices from both arrays and check if they satisfy the condition.

The key is to precompute prefix sums for both arrays to enable O(1) range sum queries, then iterate through all possible ranges.

## C# Solution

```csharp
public class Solution
{
    public long CountGoodRanges(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        long count = 0;
        
        for (int l = 0; l < n; l++)
        {
            long sum1 = 0, sum2 = 0;
            
            for (int r = l; r < n; r++)
            {
                sum1 += nums1[r];
                sum2 += nums2[r];
                
                // Check if this range is valid
                if (IsValid(sum1, sum2))
                    count++;
            }
        }
        
        return count;
    }
    
    private bool IsValid(long sum1, long sum2)
    {
        // Condition depends on problem specifics
        return Math.Abs(sum1 - sum2) <= 1;
    }
}
```

## Complexity

- **Time:** O(n²) for checking all ranges
- **Space:** O(1)
