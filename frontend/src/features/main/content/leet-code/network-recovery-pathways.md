# 3620. Network Recovery Pathways

**Difficulty:** Hard
**Category:** Array, Binary Search, Dynamic Programming, Graph Theory, Topological Sort, Heap (Priority Queue), Shortest Path

## Problem
You are given a directed acyclic graph of `n` nodes numbered `0` to `n - 1`, represented by a 2D array `edges` of length `m`, where `edges[i] = [u_i, v_i, cost_i]` indicates a one-way edge from `u_i` to `v_i` with recovery cost `cost_i`. Some nodes may be offline, given by a boolean array `online` (nodes `0` and `n - 1` are always online).

A path from `0` to `n - 1` is valid if every intermediate node on the path is online and the total recovery cost of its edges does not exceed `k`. For each valid path, its score is the minimum edge cost along that path.

Return the maximum path score among all valid paths, or `-1` if no valid path exists.

### Example
Input: `edges = [[0,1,5],[1,3,10],[0,2,3],[2,3,4]], online = [true,true,true,true], k = 10`
Output: `3`
Explanation: The path `0 → 1 → 3` costs `15 > 10` and is invalid. The path `0 → 2 → 3` costs `7 <= 10` and has minimum edge cost `min(3, 4) = 3`, which is the answer.

Constraints:
- `2 <= n <= 5 * 10^4`
- `0 <= m <= min(10^5, n * (n - 1) / 2)`
- `0 <= cost_i <= 10^9`
- `0 <= k <= 5 * 10^13`
- The graph is a DAG.

## Approach
Binary search on the candidate answer `X` (the minimum edge cost we want to guarantee). For a fixed `X`, keep only edges with weight `>= X`, and among nodes that are online (or the source/target), find the minimum-cost path from `0` to `n - 1` using dynamic programming over a fixed topological order of the DAG. If that minimum cost is at most `k`, then `X` is achievable. Feasibility is monotonic in `X` (raising the threshold only removes edges), so binary search over the sorted distinct edge weights for the largest feasible `X`.

## C# Solution

```csharp
public class Solution {
    public long MaxScore(int[][] edges, bool[] online, long k) {
        int n = online.Length;
        var adj = new List<int[]>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int[]>();
        var inDegree = new int[n];

        foreach (var e in edges) {
            adj[e[0]].Add(new[] { e[1], e[2] });
            inDegree[e[1]]++;
        }

        // Compute a fixed topological order (structure doesn't change across binary search steps).
        var order = new List<int>();
        var queue = new Queue<int>();
        for (int i = 0; i < n; i++) if (inDegree[i] == 0) queue.Enqueue(i);
        var tempIn = (int[])inDegree.Clone();
        while (queue.Count > 0) {
            int u = queue.Dequeue();
            order.Add(u);
            foreach (var e in adj[u]) {
                if (--tempIn[e[0]] == 0) queue.Enqueue(e[0]);
            }
        }

        int[] weights = edges.Select(e => e[2]).Distinct().OrderBy(w => w).ToArray();
        long best = -1;
        int lo = 0, hi = weights.Length - 1;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int threshold = weights[mid];
            if (Feasible(n, adj, order, online, threshold, k)) {
                best = threshold;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        return best;
    }

    private bool Feasible(int n, List<int[]>[] adj, List<int> order, bool[] online, int minWeight, long k) {
        long[] dist = new long[n];
        Array.Fill(dist, long.MaxValue);
        dist[0] = 0;

        foreach (int u in order) {
            if (dist[u] == long.MaxValue) continue;
            foreach (var e in adj[u]) {
                int v = e[0], w = e[1];
                if (w < minWeight) continue;
                if (!online[v]) continue;
                long cand = dist[u] + w;
                if (cand < dist[v]) dist[v] = cand;
            }
        }

        return dist[n - 1] != long.MaxValue && dist[n - 1] <= k;
    }
}
```

## Complexity

- **Time:** O((n + m) log m), where m is the number of edges.
- **Space:** O(n + m)
