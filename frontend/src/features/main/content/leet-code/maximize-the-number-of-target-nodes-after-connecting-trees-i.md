# 3372. Maximize the Number of Target Nodes After Connecting Trees I

**Difficulty:** Medium
**Category:** Tree, Graph, Breadth-First Search, Depth-First Search

## Problem

Given two trees `edges1` and `edges2` and an integer `k`, for every node `i` in tree 1, we may add exactly one edge connecting `i` to some node in tree 2. A node is a "target" of `i` if its distance from `i` (through the combined graph) is at most `k`. Return an array where entry `i` is the maximum number of target nodes achievable by optimally choosing the connecting edge.

### Example

Connecting node `i` in tree 1 to the node in tree 2 that maximizes reachable nodes within `k-1` (since the new edge itself costs one step) yields the best total.

## Approach

For tree 1, BFS from every node to count nodes within distance `k`. For tree 2, BFS from every node to count nodes within distance `k-1`, and take the overall maximum across tree 2 (since the optimal connection point in tree 2 is the same for every query node). The answer for node `i` is its own tree 1 count plus that maximum.

## C# Solution

```csharp
public class Solution 
{
    public int[] MaxTargetNodes(int[][] edges1, int[][] edges2, int k) 
    {
        int n1 = edges1.Length + 1, n2 = edges2.Length + 1;
        var adj1 = BuildAdj(edges1, n1);
        var adj2 = BuildAdj(edges2, n2);

        int[] cnt1 = new int[n1];
        for (int i = 0; i < n1; i++) cnt1[i] = CountWithinK(adj1, i, k);

        int best2 = 0;
        for (int i = 0; i < n2; i++)
            best2 = Math.Max(best2, CountWithinK(adj2, i, k - 1));

        int[] ans = new int[n1];
        for (int i = 0; i < n1; i++) ans[i] = cnt1[i] + best2;
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

    private int CountWithinK(List<int>[] adj, int start, int k) 
    {
        if (k < 0) return 0;
        int n = adj.Length;
        var dist = new int[n];
        Array.Fill(dist, -1);
        dist[start] = 0;
        var queue = new Queue<int>();
        queue.Enqueue(start);
        int count = 1;
        while (queue.Count > 0) 
        {
            int u = queue.Dequeue();
            if (dist[u] == k) continue;
            foreach (int v in adj[u]) 
            {
                if (dist[v] == -1) 
                {
                    dist[v] = dist[u] + 1;
                    count++;
                    queue.Enqueue(v);
                }
            }
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n1^2 + n2^2)
- **Space:** O(n1 + n2)
