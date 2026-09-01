# 2333. Minimum Sum of Squared Difference

**Difficulty:** Medium
**Category:** Array, Math, Sorting, Heap (Priority Queue)

## Problem

You are given two positive integer arrays `nums1` and `nums2`, both of length `n`. The sum of squared difference of arrays `nums1` and `nums2` is defined as the sum of `(nums1[i] - nums2[i])^2` for each `0 <= i < n`.

You are allowed to perform at most `k1` operations on `nums1` and at most `k2` operations on `nums2`. In one operation, you can add or subtract `1` from any element of an array.

Return the minimum sum of squared difference after performing at most `k1 + k2` operations.

### Example

```
Input: nums1 = [1,2,3,4], nums2 = [2,10,20,19], k1 = 0, k2 = 0
Output: 579
Explanation: No operations can be performed, so the sum is (1-2)^2 + (2-10)^2 + (3-20)^2 + (4-19)^2 = 1 + 64 + 289 + 225 = 579.
```

## Approach

Calculate absolute differences between corresponding elements. Sort these differences in descending order. Greedily reduce the largest differences using available operations (k1 + k2). Use a priority queue or repeated passes to distribute operations optimally, reducing the largest gaps first to minimize the squared sum.

## C# Solution

```csharp
public class Solution
{
    public long MinSumSquareDiff(int[] nums1, int[] nums2, int k1, int k2)
    {
        int n = nums1.Length;
        long[] diffs = new long[n];
        
        for (int i = 0; i < n; i++)
        {
            diffs[i] = Math.Abs(nums1[i] - nums2[i]);
        }
        
        Array.Sort(diffs);
        Array.Reverse(diffs);
        
        long k = k1 + k2;
        
        for (int i = 0; i < n && k > 0; i++)
        {
            if (diffs[i] == 0) break;
            
            long nextVal = (i + 1 < n) ? diffs[i + 1] : 0;
            long gap = diffs[i] - nextVal;
            long count = i + 1;
            
            if (gap * count <= k)
            {
                k -= gap * count;
                for (int j = 0; j <= i; j++)
                {
                    diffs[j] = nextVal;
                }
            }
            else
            {
                long reduce = k / count;
                long remainder = k % count;
                for (int j = 0; j <= i; j++)
                {
                    diffs[j] -= reduce;
                    if (j < remainder) diffs[j]--;
                }
                k = 0;
            }
        }
        
        long result = 0;
        foreach (long diff in diffs)
        {
            result += diff * diff;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting plus O(n) for processing
- **Space:** O(n) for the differences array
