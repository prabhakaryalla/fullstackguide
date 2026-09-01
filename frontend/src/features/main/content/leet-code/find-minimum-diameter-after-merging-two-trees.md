# 3203. Find Minimum Diameter After Merging Two Trees

**Difficulty:** Hard
**Category:** Breadth-First Search, Depth-First Search, Tree

## Problem
You are given two separate trees, described by their edge lists. You must connect them into a single tree by adding exactly one edge between any node of the first tree and any node of the second tree. Choose the connection that minimizes the diameter (longest path between any two nodes) of the resulting merged tree, and return that minimum possible diameter.

## Approach
First, compute the diameter of each individual tree independently using the standard two-pass or single-pass DFS technique (tracking the two largest child depths at each node to determine the diameter passing through it). To connect the trees optimally, the best strategy is to join the "center" of each tree (the point that minimizes the maximum distance to any other node within that tree), which reduces the "radius" contributed by each tree to roughly half its diameter (specifically `(diameter + 1) / 2`, using integer division, since the radius from the center is essentially half the diameter, possibly rounded). The diameter of the combined tree is then the maximum of: the original diameter of tree 1, the original diameter of tree 2, or a path that crosses the new connecting edge (formed by the two half-diameters plus 1 for the new edge itself).

## C# Solution
```csharp
public class Solution {
    public int MinimumDiameterAfterMerge(int[][] edges1, int[][] edges2) {
        int diameter1 = GetDiameter(edges1);
        int diameter2 = GetDiameter(edges2);
        int combinedDiameter = (diameter1 + 1) / 2 + (diameter2 + 1) / 2 + 1;
        return Math.Max(Math.Max(diameter1, diameter2), combinedDiameter);
    }

    private int GetDiameter(int[][] edges) {
        int n = edges.Length + 1;
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++)
            graph[i] = new List<int>();

        foreach (int[] edge in edges) {
            int u = edge[0];
            int v = edge[1];
            graph[u].Add(v);
            graph[v].Add(u);
        }

        int maxDiameter = 0;
        MaxDepth(graph, 0, -1, ref maxDiameter);
        return maxDiameter;
    }

    private int MaxDepth(List<int>[] graph, int u, int prev, ref int maxDiameter) {
        int maxSubDepth1 = 0;
        int maxSubDepth2 = 0;
        foreach (int v in graph[u]) {
            if (v == prev)
                continue;
            int maxSubDepth = MaxDepth(graph, v, u, ref maxDiameter);
            if (maxSubDepth > maxSubDepth1) {
                maxSubDepth2 = maxSubDepth1;
                maxSubDepth1 = maxSubDepth;
            } else if (maxSubDepth > maxSubDepth2) {
                maxSubDepth2 = maxSubDepth;
            }
        }
        maxDiameter = Math.Max(maxDiameter, maxSubDepth1 + maxSubDepth2);
        return 1 + maxSubDepth1;
    }
}
```

## Complexity
- Time: O(n + m)
- Space: O(n + m)
