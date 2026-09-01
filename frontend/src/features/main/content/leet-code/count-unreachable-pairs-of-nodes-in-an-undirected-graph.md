# 2316. Count Unreachable Pairs of Nodes in an Undirected Graph

**Difficulty:** Medium
**Category:** Graph, Depth-First Search, Union Find

## Problem

You are given an integer `n`. There is an undirected graph with `n` nodes, numbered from `0` to `n - 1`. You are also given a 2D integer array `edges` where `edges[i] = [a_i, b_i]` denotes that there exists an undirected edge connecting nodes `a_i` and `b_i`.

Return the number of pairs of different nodes that are unreachable from each other.

### Example

```
Input: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]
Output: 14
Explanation: There are 3 connected components: {0,2,4,5}, {1,6}, {3}.
Pairs from different components: 4*2 + 4*1 + 2*1 = 14
```

## Approach

Use Union-Find or DFS to identify connected components. Count the size of each component. For each component of size `s`, it forms `s * (n - s)` unreachable pairs with nodes outside the component. Sum these values and divide by 2 (since each pair is counted twice).

## C# Solution

```csharp
public class Solution
{
    public long CountPairs(int n, int[][] edges)
    {
        var parent = new int[n];
        var size = new int[n];
        for (int i = 0; i < n; i++)
        {
            parent[i] = i;
            size[i] = 1;
        }
        
        foreach (var edge in edges)
        {
            Union(edge[0], edge[1], parent, size);
        }
        
        long result = 0;
        long remaining = n;
        var visited = new HashSet<int>();
        
        for (int i = 0; i < n; i++)
        {
            int root = Find(i, parent);
            if (!visited.Contains(root))
            {
                visited.Add(root);
                long componentSize = size[root];
                result += componentSize * (remaining - componentSize);
                remaining -= componentSize;
            }
        }
        
        return result;
    }
    
    private int Find(int x, int[] parent)
    {
        if (parent[x] != x)
            parent[x] = Find(parent[x], parent);
        return parent[x];
    }
    
    private void Union(int x, int y, int[] parent, int[] size)
    {
        int px = Find(x, parent), py = Find(y, parent);
        if (px == py) return;
        if (size[px] < size[py])
        {
            parent[px] = py;
            size[py] += size[px];
        }
        else
        {
            parent[py] = px;
            size[px] += size[py];
        }
    }
}
```

## Complexity

- **Time:** O(n + m * α(n)) where m is number of edges, α is inverse Ackermann
- **Space:** O(n)
