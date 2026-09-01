# 3373. Maximize the Number of Target Nodes After Connecting Trees II

**Difficulty:** Hard
**Category:** Tree, Graph, Breadth-First Search, Depth-First Search

## Problem

Given two trees `edges1` and `edges2`, for every node `i` in tree 1 we add one edge connecting `i` to a node in tree 2. A node is a "target" of `i` if the path between them uses an **even** number of edges. Return an array where entry `i` is the maximum number of target nodes achievable.

### Example

Since only parity of path length matters, 2-coloring each tree by BFS parity lets us count same-parity nodes directly without per-node BFS.

## Approach

2-color each tree via BFS/DFS (color 0/1 by parity of distance from an arbitrary root). Within tree 1, the target count for node `i` is the number of nodes sharing `i`'s color. For tree 2, connecting through node `j` flips parity across the new edge, so the contribution is the count of the **opposite** color from `j`; the best choice is `max(colorACount, colorBCount)` in tree 2, which is the same for every query node.

## C# Solution

```csharp
public class Solution 
{
    public long[] MaxTargetNodes(int[][] edges1, int[][] edges2) 
    {
        int n1 = edges1.Length + 1, n2 = edges2.Length + 1;
        var adj1 = BuildAdj(edges1, n1);
        var adj2 = BuildAdj(edges2, n2);

        int[] color1 = Color(adj1, n1);
        int[] color2 = Color(adj2, n2);

        int count1A = color1.Count(c => c == 0);
        int count1B = n1 - count1A;
        int count2A = color2.Count(c => c == 0);
        int count2B = n2 - count2A;
        long best2 = Math.Max(count2A, count2B);

        long[] ans = new long[n1];
        for (int i = 0; i < n1; i++)
            ans[i] = (color1[i] == 0 ? count1A : count1B) + best2;
        return ans;
    }

    private List<int>[] BuildAdj(int[][] edges, int n) 
    {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges) 
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }
        return adj;
    }

    private int[] Color(List<int>[] adj, int n) 
    {
        int[] color = new int[n];
        Array.Fill(color, -1);
        color[0] = 0;
        var queue = new Queue<int>();
        queue.Enqueue(0);
        while (queue.Count > 0) 
        {
            int u = queue.Dequeue();
            foreach (int v in adj[u]) 
            {
                if (color[v] == -1) 
                {
                    color[v] = 1 - color[u];
                    queue.Enqueue(v);
                }
            }
        }
        return color;
    }
}
```

## Complexity

- **Time:** O(n1 + n2)
- **Space:** O(n1 + n2)
