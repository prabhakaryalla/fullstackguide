# 2714. Find Shortest Path with K Hops

**Difficulty:** Hard
**Category:** Array, Graph, Heap (Priority Queue), Shortest Path
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an undirected weighted graph with `n` nodes (0-indexed), described by an array `edges` where `edges[i] = [u, v, w]` means there is an edge between `u` and `v` with weight `w`. You are also given a source node `s` and an integer `k`. While travelling along a path, you may treat at most `k` of the edges you use as having weight `0` instead of their actual weight (a "hop"). Return an array `answer` where `answer[i]` is the length of the shortest path from `s` to node `i`, using at most `k` hops.

### Example

Input: n = 4, edges = [[0,1,4],[1,2,1],[2,3,6]], s = 0, k = 1
Output: [0,0,1,5]
Explanation: Using no hops, the direct distances are [0,4,5,11]. With 1 hop available, the best strategy zeroes out the most expensive edge on each path: node 1 can be reached for free via the hop on edge (0,1,4), giving 0; node 2 becomes 0 (hop on the 4-weight edge) + 1 = 1; node 3 becomes 4 + 1 + 0 (hop on the 6-weight edge) = 5.

## Approach

Run a layered (state-space) Dijkstra where each state is `(node, hopsUsed)`. From a state `(u, h)`, for every edge `(u, v, w)`:
- Move to `(v, h)` paying the full weight `w` (no hop used).
- If `h < k`, move to `(v, h + 1)` paying `0` (spend one hop on this edge).

Track `dist[node, hops]` as the shortest distance to reach that state, process states in increasing order of distance using a priority queue, and relax neighboring states as above. The final answer for each node is the minimum of `dist[node, h]` over all `h` from `0` to `k`.

## C# Solution

```csharp
public class Solution 
{
    public int[] ShortestPathWithHops(int n, int[][] edges, int s, int k)
    {
        List<(int to, int weight)>[] adj = new List<(int, int)>[n];
        for (int i = 0; i < n; i++)
        {
            adj[i] = new List<(int, int)>();
        }

        foreach (int[] edge in edges)
        {
            int u = edge[0], v = edge[1], w = edge[2];
            adj[u].Add((v, w));
            adj[v].Add((u, w));
        }

        long[,] dist = new long[n, k + 1];
        for (int i = 0; i < n; i++)
        {
            for (int h = 0; h <= k; h++)
            {
                dist[i, h] = long.MaxValue;
            }
        }
        dist[s, 0] = 0;

        PriorityQueue<(int node, int hops), long> pq = new PriorityQueue<(int, int), long>();
        pq.Enqueue((s, 0), 0);

        while (pq.Count > 0)
        {
            (int node, int hops) = pq.Dequeue();
            long d = dist[node, hops];

            foreach ((int to, int weight) in adj[node])
            {
                long newDist = d + weight;
                if (newDist < dist[to, hops])
                {
                    dist[to, hops] = newDist;
                    pq.Enqueue((to, hops), newDist);
                }

                if (hops < k && d < dist[to, hops + 1])
                {
                    dist[to, hops + 1] = d;
                    pq.Enqueue((to, hops + 1), d);
                }
            }
        }

        int[] answer = new int[n];
        for (int i = 0; i < n; i++)
        {
            long best = long.MaxValue;
            for (int h = 0; h <= k; h++)
            {
                best = Math.Min(best, dist[i, h]);
            }
            answer[i] = (int)best;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(E * K * log(N * K)), where E is the number of edges and K is the hop limit, since each of the O(N * K) states can be relaxed across its adjacency list and pushed to the priority queue.
- **Space:** O(N * K) for the distance table and priority queue.
