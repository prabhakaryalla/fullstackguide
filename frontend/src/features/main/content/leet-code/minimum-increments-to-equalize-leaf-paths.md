# 3593. Minimum Increments to Equalize Leaf Paths

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Greedy

## Problem
You are given a tree with `n` nodes rooted at node `0`, each node `i` having a non-negative integer `values[i]`, described by a list of parent-child `edges`. You may increment any node's value by 1, at a cost of 1 per increment. Return the minimum total number of increments needed so that every root-to-leaf path has the same sum of values.

## Approach
Process the tree bottom-up with a post-order DFS. For a leaf node, its "path sum so far" is simply its own value. For an internal node, first recursively compute the path sum contributed by each child's subtree; to make all of that node's children yield equal path sums, raise every child's contribution up to the maximum among them (accumulating the difference as increments), then add the node's own value on top before returning to its parent.

## C# Solution

```csharp
public class Solution 
{
    private List<int>[] children;
    private int[] values;
    private long totalIncrements;

    public long MinIncrements(int n, int[] values, int[][] edges)
    {
        this.values = values;
        children = new List<int>[n];
        for (int i = 0; i < n; i++) children[i] = new List<int>();
        foreach (var e in edges)
        {
            children[e[0]].Add(e[1]);
        }

        totalIncrements = 0;
        Dfs(0);
        return totalIncrements;
    }

    private long Dfs(int node)
    {
        if (children[node].Count == 0) return values[node];

        long maxChild = long.MinValue;
        var childValues = new List<long>();
        foreach (var c in children[node])
        {
            long v = Dfs(c);
            childValues.Add(v);
            maxChild = Math.Max(maxChild, v);
        }

        foreach (var v in childValues)
        {
            totalIncrements += maxChild - v;
        }

        return maxChild + values[node];
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n) for the recursion stack and adjacency lists.
