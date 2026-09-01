# 2921. Maximum Profitable Triplets With Increasing Prices II

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Segment Tree

## Problem

Similar to problem 2907 but with larger constraints requiring an optimized solution. Find three indices with increasing prices and maximum profit sum.

### Example

```
Input: prices = [10,2,3,4], profits = [100,2,7,10]
Output: 19
```

## Approach

Use a Fenwick Tree (Binary Indexed Tree) or segment tree to efficiently find the maximum profit achievable as the first or second element of a triplet. For each middle position j, query for the best left element with smaller price and best right element with larger price.

## C# Solution

```csharp
public class Solution 
{
    public int MaxProfit(int[] prices, int[] profits) 
    {
        int n = prices.Length;
        long maxProfit = -1;
        
        var compressed = prices.Distinct().OrderBy(x => x).ToList();
        var priceMap = new Dictionary<int, int>();
        for (int i = 0; i < compressed.Count; i++) 
        {
            priceMap[compressed[i]] = i + 1;
        }
        
        var leftTree = new BIT(compressed.Count + 1);
        var rightTree = new BIT(compressed.Count + 1);
        
        for (int i = 0; i < n; i++) 
        {
            rightTree.Update(priceMap[prices[i]], profits[i]);
        }
        
        for (int j = 0; j < n; j++) 
        {
            int idx = priceMap[prices[j]];
            rightTree.Update(idx, -profits[j]);
            
            long leftMax = leftTree.Query(idx - 1);
            long rightMax = rightTree.Query(compressed.Count) - rightTree.Query(idx);
            
            if (leftMax > 0 && rightMax > 0) 
            {
                maxProfit = Math.Max(maxProfit, leftMax + profits[j] + rightMax);
            }
            
            leftTree.Update(idx, profits[j]);
        }
        
        return (int)maxProfit;
    }
    
    private class BIT 
    {
        private long[] tree;
        
        public BIT(int size) 
        {
            tree = new long[size + 1];
        }
        
        public void Update(int idx, long val) 
        {
            while (idx < tree.Length) 
            {
                tree[idx] = Math.Max(tree[idx], val);
                idx += idx & -idx;
            }
        }
        
        public long Query(int idx) 
        {
            long max = 0;
            while (idx > 0) 
            {
                max = Math.Max(max, tree[idx]);
                idx -= idx & -idx;
            }
            return max;
        }
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
