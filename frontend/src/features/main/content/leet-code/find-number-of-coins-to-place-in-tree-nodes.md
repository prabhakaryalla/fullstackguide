# 2973. Find Number of Coins to Place in Tree Nodes

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Sorting, Heap (Priority Queue), Dynamic Programming

## Problem

You are given a tree with `n` nodes (0 to n-1) and a 0-indexed array `cost` where `cost[i]` is the cost associated with node `i`. For each node, you must place coins equal to the product of the three largest costs in its subtree (if it has at least 3 nodes), or 1 otherwise.

Return an array where `result[i]` is the number of coins to place at node `i`.

### Example

```
Input: edges = [[0,1],[0,2],[0,3],[0,4],[0,5]], cost = [1,2,3,4,5,6]
Output: [120,1,1,1,1,1]
Explanation: Node 0's subtree has costs [1,2,3,4,5,6]. Top 3: 4*5*6=120.
```

## Approach

Use DFS to calculate the answer for each node. For each subtree, maintain a list of costs. Sort and pick the top 3 largest values to compute their product, or consider the product of the 3 smallest if they're all negative (which could yield a larger product). Return 1 for subtrees with fewer than 3 nodes.

## C# Solution

```csharp
public class Solution
{
    public long[] PlacedCoins(int[][] edges, int[] cost)
    {
        int n = cost.Length;
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            adj[i] = new List<int>();
        }

        foreach (var edge in edges)
        {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        var result = new long[n];
        DFS(0, -1, adj, cost, result);
        return result;
    }

    private List<long> DFS(int node, int parent, List<int>[] adj, int[] cost, long[] result)
    {
        var costs = new List<long> { cost[node] };

        foreach (var child in adj[node])
        {
            if (child == parent) continue;
            var childCosts = DFS(child, node, adj, cost, result);
            costs.AddRange(childCosts);
        }

        if (costs.Count < 3)
        {
            result[node] = 1;
        }
        else
        {
            costs.Sort();
            int k = costs.Count;
            long prod1 = costs[k - 1] * costs[k - 2] * costs[k - 3];
            long prod2 = costs[0] * costs[1] * costs[k - 1];
            result[node] = Math.Max(0, Math.Max(prod1, prod2));
        }

        return costs.Count <= 5 ? costs : new List<long>(costs.OrderByDescending(x => Math.Abs(x)).Take(5));
    }
}
```

## Complexity

- **Time:** O(n log n) average per subtree
- **Space:** O(n)
