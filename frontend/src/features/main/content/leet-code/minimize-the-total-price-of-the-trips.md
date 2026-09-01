# 2646. Minimize the Total Price of the Trips

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Graph, Dynamic Programming

## Problem

There exists an undirected and unrooted tree with `n` nodes indexed from `0` to `n - 1`. You are given an integer `n` and a 2D integer array `edges` of length `n - 1`, where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi`.

Each node has an associated price. You are given an integer array `price` where `price[i]` is the price of the `i`th node.

The price sum of a path is the sum of the prices of all nodes lying on that path.

The tree can have any node as the root. You are also given a 2D integer array `trips`, where `trips[i] = [starti, endi]` indicates that you will start the `i`th trip from node `starti` and travel to node `endi` by any path.

Before performing your first trip, you can choose any node and reduce its price by half (rounded down).

Return the minimum total price sum to perform all the given trips.

### Example

```
Input: n = 4, edges = [[0,1],[1,2],[1,3]], price = [2,2,10,6], trips = [[0,3],[2,1],[2,3]]
Output: 23
Explanation: Reduce price[2] to 5. The trips have costs: 2 + 2 + 5 = 9, 5 + 2 = 7, 5 + 2 + 6 = 13.
Total = 9 + 7 + 13 = 29, but we save 6 by halving node 2, so 23.
```

## Approach

First, count how many times each node is visited across all trips using DFS pathfinding. Then apply tree DP similar to "House Robber III" to determine which nodes to halve, ensuring no two adjacent nodes are halved. The DP state tracks the maximum savings for each subtree when the root is or isn't halved.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<int, List<int>> graph;
    private int[] visitCount;
    private int[] price;
    
    public int MinimumTotalPrice(int n, int[][] edges, int[] price, int[][] trips)
    {
        this.price = price;
        graph = new Dictionary<int, List<int>>();
        visitCount = new int[n];
        
        for (int i = 0; i < n; i++)
            graph[i] = new List<int>();
        
        foreach (var edge in edges)
        {
            graph[edge[0]].Add(edge[1]);
            graph[edge[1]].Add(edge[0]);
        }
        
        foreach (var trip in trips)
        {
            var path = new List<int>();
            FindPath(trip[0], trip[1], -1, path);
            foreach (int node in path)
                visitCount[node]++;
        }
        
        var (halved, notHalved) = Dp(0, -1);
        return Math.Min(halved, notHalved);
    }
    
    private bool FindPath(int curr, int target, int parent, List<int> path)
    {
        path.Add(curr);
        
        if (curr == target)
            return true;
        
        foreach (int neighbor in graph[curr])
        {
            if (neighbor != parent && FindPath(neighbor, target, curr, path))
                return true;
        }
        
        path.RemoveAt(path.Count - 1);
        return false;
    }
    
    private (int, int) Dp(int node, int parent)
    {
        int halvedCost = visitCount[node] * price[node] / 2;
        int notHalvedCost = visitCount[node] * price[node];
        
        foreach (int child in graph[node])
        {
            if (child == parent)
                continue;
            
            var (childHalved, childNotHalved) = Dp(child, node);
            
            halvedCost += childNotHalved;
            notHalvedCost += Math.Min(childHalved, childNotHalved);
        }
        
        return (halvedCost, notHalvedCost);
    }
}
```

## Complexity

- **Time:** O(n × t) — where t is the number of trips
- **Space:** O(n) — for the graph and DP states
