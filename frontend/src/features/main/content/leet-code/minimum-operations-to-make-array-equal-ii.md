# 2819. Minimum Operations to Make Array Equal II

**Difficulty:** Medium
**Category:** Array, Math, Greedy

## Problem

You are given two 0-indexed integer arrays `nums1` and `nums2` of equal length, and an integer `k`. In one operation, you can add or subtract `k` from any element of `nums1`.

Return the minimum number of operations required to make `nums1` equal to `nums2`, or `-1` if it is impossible.

### Example

```
Input: nums1 = [4,3,1,4], nums2 = [1,3,7,1], k = 3
Output: 2
Explanation:
- nums1[0]: 4 - 1 = 3, need 1 subtraction
- nums1[2]: 7 - 1 = 6, need 2 additions
Total: 2 operations
```

## Approach

Key observations:
1. For each index i, the difference `diff[i] = nums2[i] - nums1[i]` must be a multiple of k
2. If any difference is not a multiple of k, return -1
3. Count positive and negative operations needed
4. The net operations should balance (sum of diffs should be 0)
5. Minimum operations = sum of absolute differences / k

## C# Solution

```csharp
public class Solution
{
    public long MinOperations(int[] nums1, int[] nums2, int k)
    {
        int n = nums1.Length;
        
        if (k == 0)
        {
            for (int i = 0; i < n; i++)
            {
                if (nums1[i] != nums2[i])
                    return -1;
            }
            return 0;
        }
        
        long positiveOps = 0;
        long negativeOps = 0;
        
        for (int i = 0; i < n; i++)
        {
            long diff = nums2[i] - nums1[i];
            
            if (diff % k != 0)
            {
                return -1;
            }
            
            long ops = diff / k;
            if (ops > 0)
            {
                positiveOps += ops;
            }
            else
            {
                negativeOps += Math.Abs(ops);
            }
        }
        
        if (positiveOps != negativeOps)
        {
            return -1;
        }
        
        return positiveOps;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
