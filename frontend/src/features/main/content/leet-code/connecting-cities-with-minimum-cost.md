# 1135. Connecting Cities With Minimum Cost

**Difficulty:** Medium
**Category:** Union Find, Graph, Minimum Spanning Tree, Heap

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given `n` cities and a list `connections[i] = [city1, city2, cost]` of possible bidirectional roads with their costs, return the minimum total cost required to connect all cities together, or `-1` if it's impossible.

### Example

```
Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
Output: 6
```

## Approach

This is a classic minimum spanning tree problem, solved with Kruskal's algorithm: sort all connections by cost ascending, then greedily add each connection whose two endpoints are not already in the same union-find component, accumulating its cost. If exactly `n - 1` edges are used at the end, every city is connected and the accumulated cost is the answer; otherwise the cities can't all be connected.

## C# Solution

```csharp
public class Solution
{
    public int MinimumCost(int n, int[][] connections)
    {
        Array.Sort(connections, (a, b) => a[2].CompareTo(b[2]));
        int[] parent = new int[n + 1];
        for (int i = 0; i <= n; i++) parent[i] = i;

        int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

        int totalCost = 0, edgesUsed = 0;

        foreach (var c in connections)
        {
            int a = Find(c[0]), b = Find(c[1]);
            if (a != b)
            {
                parent[a] = b;
                totalCost += c[2];
                edgesUsed++;
            }
        }

        return edgesUsed == n - 1 ? totalCost : -1;
    }
}
```

## Complexity

- **Time:** `O(E log E)` for sorting the connections.
- **Space:** `O(n)` for the union-find structure.
