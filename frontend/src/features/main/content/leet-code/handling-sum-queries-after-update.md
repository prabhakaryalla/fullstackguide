# 2569. Handling Sum Queries After Update

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Segment Tree

## Problem

You are given two 0-indexed arrays `nums1` and `nums2` and a 2D array `queries`. There are three types of queries:

1. `[1, l, r]`: Flip all values in `nums1` from index `l` to `r` (0 becomes 1, 1 becomes 0)
2. `[2, p, 0]`: Set `nums2[i] = nums2[i] + nums1[i] * p` for all `i`
3. `[3, 0, 0]`: Return the sum of `nums2`

Return an array containing the answers to type 3 queries.

### Example

```
Input: nums1 = [1,0,1], nums2 = [0,0,0], queries = [[1,1,1],[2,1,0],[3,0,0]]
Output: [3]
Explanation:
After [1,1,1]: nums1 = [1,1,1] (flip index 1)
After [2,1,0]: nums2 = [0+1*1, 0+1*1, 0+1*1] = [1,1,1]
After [3,0,0]: return sum = 3

Input: nums1 = [1], nums2 = [5], queries = [[2,0,0],[3,0,0]]
Output: [5]
```

## Approach

Use a segment tree with lazy propagation for efficient range flips on `nums1`:

1. Build a segment tree for `nums1` that supports:
   - Range flip operation
   - Query for sum of a range
2. For type 1 queries: flip range [l, r] in nums1
3. For type 2 queries: compute `sum(nums1) * p` and add to `sum(nums2)`
4. For type 3 queries: return current sum of nums2

The key insight: We only need to track the sum of nums1, not individual values after flips.

## C# Solution

```csharp
public class Solution
{
    public long[] HandleQuery(int[] nums1, int[] nums2, int[][] queries)
    {
        int n = nums1.Length;
        var segTree = new SegmentTree(nums1);
        long sum2 = 0;
        foreach (int val in nums2)
            sum2 += val;
        
        var result = new List<long>();
        
        foreach (var query in queries)
        {
            if (query[0] == 1)
            {
                segTree.Flip(query[1], query[2]);
            }
            else if (query[0] == 2)
            {
                long sum1 = segTree.QuerySum(0, n - 1);
                sum2 += sum1 * query[1];
            }
            else
            {
                result.Add(sum2);
            }
        }
        
        return result.ToArray();
    }
    
    private class SegmentTree
    {
        private int[] tree, lazy;
        private int n;
        
        public SegmentTree(int[] nums)
        {
            n = nums.Length;
            tree = new int[4 * n];
            lazy = new int[4 * n];
            Build(nums, 0, 0, n - 1);
        }
        
        private void Build(int[] nums, int node, int start, int end)
        {
            if (start == end)
            {
                tree[node] = nums[start];
                return;
            }
            
            int mid = (start + end) / 2;
            Build(nums, 2 * node + 1, start, mid);
            Build(nums, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
        
        public void Flip(int l, int r)
        {
            Flip(0, 0, n - 1, l, r);
        }
        
        private void Flip(int node, int start, int end, int l, int r)
        {
            if (lazy[node] != 0)
            {
                tree[node] = (end - start + 1) - tree[node];
                if (start != end)
                {
                    lazy[2 * node + 1] ^= 1;
                    lazy[2 * node + 2] ^= 1;
                }
                lazy[node] = 0;
            }
            
            if (start > r || end < l)
                return;
            
            if (start >= l && end <= r)
            {
                tree[node] = (end - start + 1) - tree[node];
                if (start != end)
                {
                    lazy[2 * node + 1] ^= 1;
                    lazy[2 * node + 2] ^= 1;
                }
                return;
            }
            
            int mid = (start + end) / 2;
            Flip(2 * node + 1, start, mid, l, r);
            Flip(2 * node + 2, mid + 1, end, l, r);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
        
        public long QuerySum(int l, int r)
        {
            return Query(0, 0, n - 1, l, r);
        }
        
        private long Query(int node, int start, int end, int l, int r)
        {
            if (lazy[node] != 0)
            {
                tree[node] = (end - start + 1) - tree[node];
                if (start != end)
                {
                    lazy[2 * node + 1] ^= 1;
                    lazy[2 * node + 2] ^= 1;
                }
                lazy[node] = 0;
            }
            
            if (start > r || end < l)
                return 0;
            
            if (start >= l && end <= r)
                return tree[node];
            
            int mid = (start + end) / 2;
            return Query(2 * node + 1, start, mid, l, r) + 
                   Query(2 * node + 2, mid + 1, end, l, r);
        }
    }
}
```

## Complexity

- **Time:** O((n + q) log n) for segment tree operations
- **Space:** O(n) for the segment tree
