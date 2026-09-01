# 1168. Optimize Water Distribution in a Village

**Difficulty:** Hard
**Category:** Union Find, Graph, Minimum Spanning Tree, Heap

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

There are `n` houses. For house `i`, `wells[i]` is the cost of building a well directly on that house. `pipes[j] = [house1, house2, cost]` gives the cost of laying a pipe to connect two houses so they can share water. Return the minimum total cost to ensure every house has water, either via its own well or a network of pipes connecting to a house that has one.

### Example

```
Input: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
Output: 3
```

## Approach

Model a well as a pipe from a virtual "reservoir" node `0` to that house, with cost equal to the well's price. Combined with the actual pipe connections, the problem becomes finding a minimum spanning tree over `n + 1` nodes (the virtual reservoir plus the `n` houses). Kruskal's algorithm — sort all edges (virtual wells and real pipes) by cost and greedily union disjoint components — produces the minimum cost.

## C# Solution

```csharp
public class Solution
{
    public int MinCostToSupplyWater(int n, int[] wells, int[][] pipes)
    {
        var edges = new List<int[]>();
        for (int i = 0; i < n; i++) edges.Add(new[] { 0, i + 1, wells[i] });
        edges.AddRange(pipes);

        edges.Sort((a, b) => a[2].CompareTo(b[2]));

        int[] parent = new int[n + 1];
        for (int i = 0; i <= n; i++) parent[i] = i;

        int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

        int totalCost = 0, edgesUsed = 0;

        foreach (var edge in edges)
        {
            int a = Find(edge[0]), b = Find(edge[1]);
            if (a != b)
            {
                parent[a] = b;
                totalCost += edge[2];
                edgesUsed++;
                if (edgesUsed == n) break;
            }
        }

        return totalCost;
    }
}
```

## Complexity

- **Time:** `O(E log E)`, where `E = n + pipes.Length`.
- **Space:** `O(n)` for the union-find structure.
