# 3249. Count the Number of Good Nodes

**Difficulty:** Medium
**Category:** Depth-First Search, Tree

## Problem
Given an undirected tree, a node is "good" if all of the subtrees rooted at its direct children have the same number of nodes (including the case of having no children at all, or all children having equal subtree sizes). Count the number of good nodes in the tree.

## Approach
Root the tree at any node (e.g., node 0) and perform a DFS. For each node, recursively compute the size of the subtree rooted at each of its children. If the node has no children, or if all of its children's subtree sizes are equal to each other, mark it as good and increment the counter. Return the total size of the subtree rooted at the current node (1 plus the sum of all children's subtree sizes) to the caller for use in the parent's check.

## C# Solution
```csharp
public class Solution {
    private int ans = 0;

    public int CountGoodNodes(int[][] edges) {
        int n = edges.Length + 1;
        List<int>[] graph = new List<int>[n];
        for (int i = 0; i < n; i++)
            graph[i] = new List<int>();

        foreach (int[] edge in edges) {
            int u = edge[0], v = edge[1];
            graph[u].Add(v);
            graph[v].Add(u);
        }

        Dfs(graph, 0, -1);
        return ans;
    }

    private int Dfs(List<int>[] graph, int u, int prev) {
        int size = 1;
        List<int> childrenSizes = new List<int>();

        foreach (int v in graph[u]) {
            if (v == prev) continue;
            int childSize = Dfs(graph, v, u);
            size += childSize;
            childrenSizes.Add(childSize);
        }

        if (childrenSizes.Count == 0 || AllSameSizes(childrenSizes))
            ans++;

        return size;
    }

    private bool AllSameSizes(List<int> sizes) {
        for (int i = 1; i < sizes.Count; i++)
            if (sizes[i] != sizes[0])
                return false;
        return true;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n)
