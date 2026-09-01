# 2382. Maximum Segment Sum After Removals

**Difficulty:** Hard
**Category:** Array, Union Find, Ordered Set, Prefix Sum

## Problem

You are given two 0-indexed integer arrays `nums` and `removeQueries`, both of length `n`. For the `i-th` query, the element in `nums` at the index `removeQueries[i]` is removed, splitting `nums` into different segments.

A segment is a contiguous sequence of positive integers in `nums`. A segment sum is the sum of every element in a segment.

Return an integer array `answer`, of length `n`, where `answer[i]` is the maximum segment sum after applying the `i-th` removal.

Note: The same index will not be removed more than once.

### Example

```
Input: nums = [1,2,5,6,1], removeQueries = [0,3,2,4,1]
Output: [14,7,2,2,0]
```

## Approach

Process removals in reverse order (as additions). Use Union-Find to merge adjacent segments when adding an element back. Track segment sums and the maximum sum.

## C# Solution

```csharp
public class Solution
{
    public long[] MaximumSegmentSum(int[] nums, int[] removeQueries)
    {
        int n = nums.Length;
        var result = new long[n];
        var parent = new int[n];
        var segmentSum = new long[n];
        var active = new bool[n];
        long maxSum = 0;
        
        for (int i = 0; i < n; i++)
        {
            parent[i] = i;
        }
        
        for (int i = n - 1; i >= 0; i--)
        {
            result[i] = maxSum;
            int idx = removeQueries[i];
            active[idx] = true;
            segmentSum[idx] = nums[idx];
            
            if (idx > 0 && active[idx - 1])
            {
                Union(idx, idx - 1, parent, segmentSum);
            }
            if (idx < n - 1 && active[idx + 1])
            {
                Union(idx, idx + 1, parent, segmentSum);
            }
            
            maxSum = Math.Max(maxSum, segmentSum[Find(idx, parent)]);
        }
        
        return result;
    }
    
    private int Find(int x, int[] parent)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x], parent);
        return parent[x];
    }
    
    private void Union(int x, int y, int[] parent, long[] segmentSum)
    {
        int px = Find(x, parent), py = Find(y, parent);
        if (px != py)
        {
            parent[py] = px;
            segmentSum[px] += segmentSum[py];
        }
    }
}
```

## Complexity

- **Time:** O(n * α(n)) where α is inverse Ackermann
- **Space:** O(n)
