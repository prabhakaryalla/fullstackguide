# 2940. Find Building Where Alice and Bob Can Meet

**Difficulty:** Hard
**Category:** Array, Binary Search, Stack, Segment Tree

## Problem

You are given an array `heights` and queries where each query `[a, b]` asks: what is the leftmost index `j` where `j > max(a, b)` and `heights[j] > max(heights[a], heights[b])`? Return answers for all queries.

### Example

```
Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
Output: [2,5,-1,5,3]
```

## Approach

For each query, if one index is greater and already satisfies the height condition, return it. Otherwise, use a monotonic stack or binary search to find the first position to the right of max(a,b) with a height greater than required. Precompute a monotonic decreasing stack for efficient queries.

## C# Solution

```csharp
public class Solution 
{
    public int[] LeftmostBuildingQueries(int[] heights, int[][] queries) 
    {
        int n = heights.Length;
        int q = queries.Length;
        int[] result = new int[q];
        var pending = new List<(int height, int queryIdx)>[n];
        
        for (int i = 0; i < n; i++) 
        {
            pending[i] = new List<(int, int)>();
        }
        
        for (int i = 0; i < q; i++) 
        {
            int a = queries[i][0], b = queries[i][1];
            if (a > b) { int tmp = a; a = b; b = tmp; }
            
            if (a == b || heights[a] < heights[b]) 
            {
                result[i] = b;
            } 
            else 
            {
                pending[b].Add((Math.Max(heights[a], heights[b]), i));
            }
        }
        
        var stack = new List<(int height, int idx)>();
        
        for (int i = n - 1; i >= 0; i--) 
        {
            foreach (var (targetHeight, queryIdx) in pending[i]) 
            {
                int pos = BinarySearch(stack, targetHeight);
                result[queryIdx] = pos == -1 ? -1 : stack[pos].idx;
            }
            
            while (stack.Count > 0 && stack[stack.Count - 1].height <= heights[i]) 
            {
                stack.RemoveAt(stack.Count - 1);
            }
            stack.Add((heights[i], i));
        }
        
        return result;
    }
    
    private int BinarySearch(List<(int height, int idx)> stack, int target) 
    {
        int left = 0, right = stack.Count - 1;
        int result = -1;
        
        while (left <= right) 
        {
            int mid = (left + right) / 2;
            if (stack[mid].height > target) 
            {
                result = mid;
                left = mid + 1;
            } 
            else 
            {
                right = mid - 1;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n + q log n)
- **Space:** O(n + q)
