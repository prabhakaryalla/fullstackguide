# 2772. Apply Operations to Make All Array Elements Equal to Zero

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums` and a positive integer `k`. You can perform the following operation any number of times:

Choose an index `i` such that `0 <= i < n - k + 1` and decrease all elements in the subarray `nums[i...i+k-1]` by 1.

Return `true` if you can make all elements in the array equal to zero, otherwise return `false`.

### Example

```
Input: nums = [2,2,3,1,1,0], k = 3
Output: true
Explanation: Apply operations at indices 0 and 1.
After applying at 0: [1,1,2,1,1,0]
After applying at 1: [1,0,1,0,1,0]
Continue until all zeros.
```

## Approach

Greedily process from left to right. When we encounter a non-zero element at index `i`, we must apply the operation enough times to make `nums[i]` zero. Track the cumulative effect of operations using a difference array or running sum.

If at any point we need to perform a negative number of operations, or if we can't complete operations for the last k-1 elements, return false.

## C# Solution

```csharp
public class Solution
{
    public bool CheckArray(int[] nums, int k)
    {
        int n = nums.Length;
        long[] diff = new long[n + 1];
        long currentOps = 0;
        
        for (int i = 0; i < n; i++)
        {
            currentOps += diff[i];
            long needed = nums[i] + currentOps;
            
            if (needed < 0)
            {
                return false;
            }
            
            if (needed > 0)
            {
                if (i + k > n)
                {
                    return false;
                }
                
                diff[i] -= needed;
                diff[i + k] += needed;
                currentOps -= needed;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(n) for the difference array
