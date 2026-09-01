# 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree

**Difficulty:** Hard
**Category:** Union Find, Graph, Minimum Spanning Tree, Sorting

## Problem

Given a connected, undirected, weighted graph, find every "critical" edge (one whose removal increases the minimum spanning tree weight, or disconnects the graph) and every "pseudo-critical" edge (one that appears in at least one, but not all, minimum spanning trees). Return the two index lists.

### Example

```
Input: n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,3,6],[1,4,5]]
Output: [[0,1],[2,3,4,5]]
```

## Approach

First compute the baseline minimum spanning tree (MST) weight with a standard Kruskal's algorithm. Then, for every edge: run Kruskal's again while **excluding** that edge — if the result is disconnected or heavier than the baseline, the edge is critical. Otherwise, run Kruskal's again while **forcing** that edge into the tree first — if the resulting weight still equals the baseline, the edge is pseudo-critical (usable in some, but not required by every, MST).

## C# Solution

```csharp
public class Solution
{
    private int[] parent;

    public IList<IList<int>> FindCriticalAndPseudoCriticalEdges(int n, int[][] edges)
    {
        int m = edges.Length;
        var indexed = new int[m][];
        for (int i = 0; i < m; i++)
            indexed[i] = new[] { edges[i][0], edges[i][1], edges[i][2], i };

        Array.Sort(indexed, (a, b) => a[2].CompareTo(b[2]));

        int baseWeight = Kruskal(n, indexed, -1, -1);

        var critical = new List<int>();
        var pseudo = new List<int>();

        for (int i = 0; i < m; i++)
        {
            int idx = indexed[i][3];

            int withoutWeight = Kruskal(n, indexed, idx, -1);
            if (withoutWeight > baseWeight || withoutWeight == int.MaxValue)
            {
                critical.Add(idx);
                continue;
            }

            int withWeight = Kruskal(n, indexed, -1, idx);
            if (withWeight == baseWeight)
                pseudo.Add(idx);
        }

        return new List<IList<int>> { critical, pseudo };
    }

    private int Kruskal(int n, int[][] sortedEdges, int skipIdx, int forceIdx)
    {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        int weight = 0, count = 0;

        if (forceIdx != -1)
        {
            var forced = Array.Find(sortedEdges, x => x[3] == forceIdx);
            Union(forced[0], forced[1]);
            weight += forced[2];
            count++;
        }

        foreach (var e in sortedEdges)
        {
            if (e[3] == skipIdx || e[3] == forceIdx) continue;
            if (Union(e[0], e[1]))
            {
                weight += e[2];
                count++;
            }
        }

        return count == n - 1 ? weight : int.MaxValue;
    }

    private int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

    private bool Union(int a, int b)
    {
        int ra = Find(a), rb = Find(b);
        if (ra == rb) return false;
        parent[ra] = rb;
        return true;
    }
}
```

## Complexity

- **Time:** `O(m^2 log m)` — Kruskal's runs once per edge.
- **Space:** `O(n + m)` for the union-find structure and sorted edges.
