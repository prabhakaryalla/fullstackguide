# 3515. Shortest Path in a Weighted Tree

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Design, Binary Indexed Tree, Array

## Problem

You are given a tree of `n` nodes (numbered `1` to `n`, rooted at node `1`) described by `n - 1` edges, where `edges[i] = [u, v, w]` connects nodes `u` and `v` with weight `w` (the index `i` identifies this edge). You are also given an array of `queries`, each of one of two forms:

- `[1, index, newWeight]`: update the weight of the edge with the given `index` to `newWeight`.
- `[2, node]`: report the current shortest path distance from node `1` to `node`.

Return an array containing the answer to every type `2` query, in order.

### Example

```
n = 4
edges = [[1,2,3],[1,3,4],[2,4,1]]   // edge 0: 1-2 (w=3), edge 1: 1-3 (w=4), edge 2: 2-4 (w=1)
queries = [[2,4],[1,0,10],[2,4]]
Output: [4,11]
Explanation:
- Query [2,4]: distance from 1 to 4 is 1->2 (3) + 2->4 (1) = 4.
- Query [1,0,10]: edge 0 (1-2) weight changes from 3 to 10.
- Query [2,4]: distance from 1 to 4 is now 1->2 (10) + 2->4 (1) = 11.
```

## Approach

Root the tree at node `1` and run a BFS to determine, for every node, its parent, which edge connects it to its parent, and its initial distance from the root (sum of edge weights along the path).

An edge update changes the distance of every node in the subtree rooted at the edge's deeper endpoint by the same delta. Perform an Euler tour (`tin`/`tout` timestamps) so that each subtree corresponds to a contiguous range `[tin[v], tout[v]]`. Maintain a Binary Indexed Tree (Fenwick tree) supporting range-add / point-query over these timestamps:

- On an edge update, compute `delta = newWeight - oldWeight` and add `delta` to the range covering the subtree of the edge's child endpoint.
- On a distance query for `node`, the answer is `initialDistance[node] + pointQuery(tin[node])`.

## C# Solution

```csharp
public class Solution 
{
    public int[] TreeQueries(int n, int[][] edges, int[][] queries) 
    {
        var adj = new List<(int to, int w, int edgeIdx)>[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new List<(int, int, int)>();
        for (int i = 0; i < edges.Length; i++)
        {
            int u = edges[i][0], v = edges[i][1], w = edges[i][2];
            adj[u].Add((v, w, i));
            adj[v].Add((u, w, i));
        }

        var edgeChild = new int[edges.Length];
        var oldWeight = new int[edges.Length];
        for (int i = 0; i < edges.Length; i++) oldWeight[i] = edges[i][2];

        var initDist = new long[n + 1];
        var childrenOf = new List<int>[n + 1];
        for (int i = 1; i <= n; i++) childrenOf[i] = new List<int>();
        var visited = new bool[n + 1];

        var bfsQueue = new Queue<int>();
        bfsQueue.Enqueue(1);
        visited[1] = true;
        while (bfsQueue.Count > 0)
        {
            int u = bfsQueue.Dequeue();
            foreach (var (to, w, edgeIdx) in adj[u])
            {
                if (!visited[to])
                {
                    visited[to] = true;
                    edgeChild[edgeIdx] = to;
                    initDist[to] = initDist[u] + w;
                    childrenOf[u].Add(to);
                    bfsQueue.Enqueue(to);
                }
            }
        }

        var tin = new int[n + 1];
        var tout = new int[n + 1];
        var indexPtr = new int[n + 1];
        var activeStack = new Stack<int>();
        int timer = 0;
        activeStack.Push(1);
        tin[1] = ++timer;
        while (activeStack.Count > 0)
        {
            int u = activeStack.Peek();
            if (indexPtr[u] < childrenOf[u].Count)
            {
                int c = childrenOf[u][indexPtr[u]];
                indexPtr[u]++;
                tin[c] = ++timer;
                activeStack.Push(c);
            }
            else
            {
                tout[u] = timer;
                activeStack.Pop();
            }
        }

        var bit = new long[n + 2];
        void BitAdd(int idx, long delta)
        {
            for (; idx <= n + 1; idx += idx & (-idx)) bit[idx] += delta;
        }
        long BitQuery(int idx)
        {
            long s = 0;
            for (; idx > 0; idx -= idx & (-idx)) s += bit[idx];
            return s;
        }
        void RangeAdd(int l, int r, long delta)
        {
            BitAdd(l, delta);
            BitAdd(r + 1, -delta);
        }

        var results = new List<int>();
        foreach (var q in queries)
        {
            if (q[0] == 1)
            {
                int edgeIdx = q[1];
                int newWeight = q[2];
                int delta = newWeight - oldWeight[edgeIdx];
                oldWeight[edgeIdx] = newWeight;
                int child = edgeChild[edgeIdx];
                RangeAdd(tin[child], tout[child], delta);
            }
            else
            {
                int node = q[1];
                long dist = initDist[node] + BitQuery(tin[node]);
                results.Add((int)dist);
            }
        }
        return results.ToArray();
    }
}
```

## Complexity

- **Time:** O((n + q) log n), where q is the number of queries.
- **Space:** O(n) for the tree structures and Fenwick tree.
