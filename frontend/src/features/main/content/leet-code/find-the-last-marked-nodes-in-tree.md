# 3313. Find the Last Marked Nodes in Tree

**Difficulty:** Hard
**Category:** Tree, Breadth-First Search, Graph
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an undirected tree with `n` nodes labeled `0` to `n - 1`, described by its edges. For every node `i`, define `farthest[i]` as the node that is at the maximum distance from `i` (in number of edges); if there is a tie, choose the smaller node index. Return an array `farthest` of length `n`.

## Approach
This relies on a classic tree property: for **any** starting node, its farthest node is always one of the two endpoints of the tree's diameter. So the whole problem reduces to finding the diameter's endpoints once, in O(n): run a BFS from an arbitrary node to find one diameter endpoint `A` (the farthest node reached), then BFS from `A` to find the other endpoint `B`. Finally, run BFS from both `A` and `B` to get every node's distance to each endpoint, and for each node pick whichever of `A`/`B` is farther (tie-break on the smaller label).

## C# Solution

```csharp
public class Solution 
{
    public int[] LastMarkedNodes(int[][] edges) 
    {
        int n = edges.Length + 1;
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges) 
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        int[] distFrom0 = Bfs(0, adj, n);
        int a = 0;
        for (int i = 1; i < n; i++) if (distFrom0[i] > distFrom0[a]) a = i;

        int[] distA = Bfs(a, adj, n);
        int b = 0;
        for (int i = 1; i < n; i++) if (distA[i] > distA[b]) b = i;

        int[] distB = Bfs(b, adj, n);

        int[] ans = new int[n];
        for (int i = 0; i < n; i++) 
        {
            if (distA[i] > distB[i]) ans[i] = a;
            else if (distB[i] > distA[i]) ans[i] = b;
            else ans[i] = Math.Min(a, b);
        }
        return ans;
    }

    private int[] Bfs(int src, List<int>[] adj, int n) 
    {
        int[] dist = new int[n];
        Array.Fill(dist, -1);
        dist[src] = 0;
        Queue<int> q = new Queue<int>();
        q.Enqueue(src);
        while (q.Count > 0) 
        {
            int u = q.Dequeue();
            foreach (int v in adj[u]) 
            {
                if (dist[v] == -1) 
                {
                    dist[v] = dist[u] + 1;
                    q.Enqueue(v);
                }
            }
        }
        return dist;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
