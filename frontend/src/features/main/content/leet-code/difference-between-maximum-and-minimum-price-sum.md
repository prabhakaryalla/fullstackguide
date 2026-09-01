# 2538. Difference Between Maximum and Minimum Price Sum

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Array, Dynamic Programming

## Problem

You are given an `n`-node tree with edges and a `price` array. The price sum of a path is the sum of prices of all nodes on the path.

For each node as a root, find the maximum possible price sum from that node to any leaf. Return the difference between the maximum and minimum of these values across all nodes.

### Example

```
Input: n = 6, edges = [[0,1],[1,2],[1,3],[3,4],[3,5]], price = [9,8,7,6,10,5]
Output: 24
Explanation:
For different roots, the max price sum to leaves varies
The difference between largest and smallest such sums is 24
```

## Approach

For each node, compute the maximum price sum path from that node to any leaf in its subtree. This requires DFS/DP on the tree.

1. Root the tree arbitrarily at node 0
2. For each node, compute `maxDown[node]` = maximum price sum from node to any leaf
3. Rerooting: when considering each node as root, compute the maximum price sum considering:
   - Paths going down to leaves in subtree
   - Paths going through parent to other subtrees
4. Track the maximum and minimum values across all nodes

## C# Solution

```csharp
public class Solution
{
    private long maxDiff = 0;
    private long globalMax = 0;
    private long globalMin = long.MaxValue;
    
    public long MaxOutput(int n, int[][] edges, int[] price)
    {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++)
            adj[i] = new List<int>();
        
        foreach (var edge in edges)
        {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }
        
        Dfs1(0, -1, adj, price);
        Dfs2(0, -1, 0, adj, price);
        
        return globalMax - globalMin;
    }
    
    private long Dfs1(int node, int parent, List<int>[] adj, int[] price)
    {
        long maxPath = 0;
        
        foreach (int child in adj[node])
        {
            if (child == parent) continue;
            maxPath = Math.Max(maxPath, Dfs1(child, node, adj, price));
        }
        
        return maxPath + price[node];
    }
    
    private void Dfs2(int node, int parent, long fromParent, List<int>[] adj, int[] price)
    {
        var childPaths = new List<long>();
        
        foreach (int child in adj[node])
        {
            if (child == parent) continue;
            long childMax = Dfs1(child, node, adj, price);
            childPaths.Add(childMax);
        }
        
        childPaths.Sort((a, b) => b.CompareTo(a));
        
        long currentMax = Math.Max(fromParent, childPaths.Count > 0 ? childPaths[0] : 0);
        globalMax = Math.Max(globalMax, currentMax);
        globalMin = Math.Min(globalMin, currentMax);
        
        int childIdx = 0;
        foreach (int child in adj[node])
        {
            if (child == parent) continue;
            
            long maxToChild = fromParent;
            if (childPaths.Count > 0 && childPaths[0] != Dfs1(child, node, adj, price))
                maxToChild = Math.Max(maxToChild, childPaths[0]);
            else if (childPaths.Count > 1)
                maxToChild = Math.Max(maxToChild, childPaths[1]);
            
            Dfs2(child, node, maxToChild + price[node], adj, price);
            childIdx++;
        }
    }
}
```

## Complexity

- **Time:** O(n × m) where m is average degree
- **Space:** O(n) for recursion and adjacency lists
