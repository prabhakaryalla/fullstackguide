# 2603. Collect Coins in a Tree

**Difficulty:** Hard
**Category:** Graph, Tree, Depth-First Search, Breadth-First Search

## Problem

There exists an undirected and unrooted tree with `n` nodes indexed from `0` to `n - 1`. You are given an integer `n` and a 2D integer array `edges` of length `n - 1`, where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi` in the tree. You are also given an array `coins` of size `n` where `coins[i]` can be either `0` or `1`, where `1` indicates the presence of a coin in the vertex `i`.

Initially, you choose to start at any vertex in the tree. Then, you can perform the following operations any number of times:

- Collect all the coins that are at a distance of at most `2` from the current vertex, or
- Move to any adjacent vertex in the tree.

Find the minimum number of edges you need to go through to collect all the coins and go back to the initial vertex.

### Example

```
Input: coins = [1,0,0,0,0,1], edges = [[0,1],[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: Start at vertex 2, collect all coins, and return requires 2 edges.
```

## Approach

Use topological sorting to trim leaf nodes that have no coins or are too far from coin-bearing nodes. Remove leaves without coins iteratively, then remove two more layers of leaves (since we can collect coins from distance 2). The answer is `2 * remaining_edges` since we traverse each remaining edge twice (go and return).

## C# Solution

```csharp
public class Solution
{
    public int CollectTheCoins(int[] coins, int[][] edges)
    {
        int n = coins.Length;
        var adj = new List<int>[n];
        var degree = new int[n];
        
        for (int i = 0; i < n; i++)
            adj[i] = new List<int>();
        
        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
            degree[e[0]]++;
            degree[e[1]]++;
        }
        
        var queue = new Queue<int>();
        for (int i = 0; i < n; i++)
        {
            if (degree[i] == 1 && coins[i] == 0)
                queue.Enqueue(i);
        }
        
        while (queue.Count > 0)
        {
            int node = queue.Dequeue();
            foreach (int neighbor in adj[node])
            {
                degree[neighbor]--;
                if (degree[neighbor] == 1 && coins[neighbor] == 0)
                    queue.Enqueue(neighbor);
            }
            degree[node] = 0;
        }
        
        for (int layer = 0; layer < 2; layer++)
        {
            var newQueue = new Queue<int>();
            for (int i = 0; i < n; i++)
            {
                if (degree[i] == 1)
                    newQueue.Enqueue(i);
            }
            
            while (newQueue.Count > 0)
            {
                int node = newQueue.Dequeue();
                foreach (int neighbor in adj[node])
                    degree[neighbor]--;
                degree[node] = 0;
            }
        }
        
        int remainingEdges = 0;
        for (int i = 0; i < n; i++)
            remainingEdges += degree[i];
        
        return Math.Max(0, remainingEdges);
    }
}
```

## Complexity

- **Time:** O(n) — topological trim operations
- **Space:** O(n) — adjacency list storage
