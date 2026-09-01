# 3419. Minimize the Maximum Edge Weight of Graph

**Difficulty:** Medium
**Category:** Graph, Binary Search, Breadth-First Search

## Problem

You are given an integer `n` and a directed weighted graph of `n` nodes numbered from `0` to `n - 1`, represented by a 2D array `edges` where `edges[i] = [Ai, Bi, Wi]` indicates an edge from node `Ai` to node `Bi` with weight `Wi`. You are also given an integer `threshold`.

Remove some edges (possibly none) so that:

- Node `0` is reachable from every other node.
- Every node keeps at most `threshold` outgoing edges.
- The maximum edge weight among the remaining edges is minimized.

Return the minimum possible value of the maximum edge weight, or `-1` if it's impossible.

### Example

`n = 4`, `edges = [[1,0,1],[2,0,3],[3,2,2],[1,2,4]]`, `threshold = 2`

Every node other than `0` needs one outgoing edge that eventually reaches `0`. Using edges of weight `<= 3` (`1->0`, `2->0`, `3->2`), every node can reach `0`, and each node uses only 1 outgoing edge (well within the threshold). So the answer is `3`.

## Approach

Since each node only needs **one** outgoing edge on its path toward node `0`, the `threshold` constraint is automatically satisfied as long as it's at least `1` (using a single edge per node never violates a cap of `1` or more). Special-case `threshold == 0` directly: only a graph with a single node (`n == 1`) can satisfy it.

Binary search on the candidate maximum weight `W`. For a given `W`, build the **reverse** graph using only edges with weight `<= W`, and run a BFS/DFS from node `0`. If every node is reachable, `W` is feasible. Find the smallest feasible `W`.

## C# Solution

```csharp
public class Solution 
{
    public int MinMaxWeight(int n, int[][] edges, int threshold) 
    {
        if (threshold == 0) 
        {
            return n == 1 ? 0 : -1;
        }

        var reverseAdj = new List<(int to, int weight)>[n];
        for (int i = 0; i < n; i++) 
        {
            reverseAdj[i] = new List<(int, int)>();
        }

        int maxWeight = 0;
        foreach (var edge in edges) 
        {
            int from = edge[0], to = edge[1], weight = edge[2];
            reverseAdj[to].Add((from, weight));
            maxWeight = Math.Max(maxWeight, weight);
        }

        if (!IsFeasible(n, reverseAdj, maxWeight)) 
        {
            return -1;
        }

        int lo = 1, hi = maxWeight, answer = maxWeight;
        while (lo <= hi) 
        {
            int mid = lo + (hi - lo) / 2;
            if (IsFeasible(n, reverseAdj, mid)) 
            {
                answer = mid;
                hi = mid - 1;
            } 
            else 
            {
                lo = mid + 1;
            }
        }
        return answer;
    }

    private bool IsFeasible(int n, List<(int to, int weight)>[] reverseAdj, int maxAllowedWeight) 
    {
        var visited = new bool[n];
        var queue = new Queue<int>();
        visited[0] = true;
        queue.Enqueue(0);
        int visitedCount = 1;

        while (queue.Count > 0) 
        {
            int node = queue.Dequeue();
            foreach (var (next, weight) in reverseAdj[node]) 
            {
                if (weight <= maxAllowedWeight && !visited[next]) 
                {
                    visited[next] = true;
                    visitedCount++;
                    queue.Enqueue(next);
                }
            }
        }
        return visitedCount == n;
    }
}
```

## Complexity

- **Time:** O((n + m) log maxWeight)
- **Space:** O(n + m)
