# 1724. Checking Existence of Edge Length Limited Paths II

**Difficulty:** Hard
**Category:** Union Find, Graph

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design a data structure `DistanceLimitedPathsExist` that is initialized with `n` nodes and an initial edge list `[u, v, dist]`, supports `AddEdge(p1, p2, dist)` to add more weighted edges over time, and `Query(p1, p2, limit)` which returns whether there is a path between `p1` and `p2` using only edges with weight strictly less than `limit`.

### Example

```
Input: ["DistanceLimitedPathsExist","AddEdge","Query","Query"]
       [[3,[[0,1,2]]], [1,2,3], [0,2,3], [0,2,2]]
Output: [null, null, true, false]
```

## Approach

Because edges only ever get added (never removed), a straightforward and correct approach is to keep every edge seen so far and, for each query, build a fresh Union-Find that unions all edges with `dist < limit`, then check whether `p1` and `p2` end up in the same component. This trades some query-time efficiency for a simple, easy-to-verify implementation.

## C# Solution

```csharp
public class DistanceLimitedPathsExist
{
    private readonly int n;
    private readonly List<(int u, int v, int dist)> edges = new();

    public DistanceLimitedPathsExist(int n, int[][] edgeList)
    {
        this.n = n;
        foreach (var e in edgeList) edges.Add((e[0], e[1], e[2]));
    }

    public void AddEdge(int p1, int p2, int dist)
    {
        edges.Add((p1, p2, dist));
    }

    public bool Query(int p1, int p2, int limit)
    {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));

        foreach (var (u, v, dist) in edges)
        {
            if (dist < limit)
            {
                int ru = Find(u), rv = Find(v);
                if (ru != rv) parent[ru] = rv;
            }
        }

        return Find(p1) == Find(p2);
    }
}
```

## Complexity

- **Time:** `AddEdge` is `O(1)`; `Query` is `O(E * alpha(n))` where `E` is the number of edges added so far.
- **Space:** `O(E + n)`.
