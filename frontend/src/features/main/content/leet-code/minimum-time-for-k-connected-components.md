# 3608. Minimum Time for K Connected Components

**Difficulty:** Hard
**Category:** Graph, Union Find, Binary Search

## Problem
You are given `n` nodes and an array `edges` where `edges[i] = [u, v, time]` represents an undirected edge between `u` and `v` that is removed from the graph starting at the given `time` (the edge is present for every time strictly less than `time`, and gone from `time` onward; all edges are present at time `0`). Return the minimum time `t` at which the graph has split into **at least** `k` connected components. It is guaranteed `1 <= k <= n`, so this is always eventually achievable (once all edges are gone the graph has exactly `n` singleton components).

## Approach
At any candidate time `t`, the surviving edges are exactly those with `edges[i][2] > t`. The number of connected components as a function of `t` is non-decreasing as `t` increases (more edges disappear, never fewer). The count can only change at the distinct `time` values that appear in the input, so it suffices to check candidate times `0` and every distinct edge time, in ascending order, and return the first one for which the resulting component count (via Union-Find over the surviving edges) is `>= k`.

For each candidate `t`, rebuild a Union-Find structure, union every edge whose `time > t`, and count the number of resulting components (`n` minus the number of successful unions). Because `k <= n` is guaranteed, once all edges have been removed the component count equals `n`, so a valid answer is always found by the last candidate.

## C# Solution

```csharp
public class Solution 
{
    public int MinTime(int n, int[][] edges, int k) 
    {
        var candidateTimes = new SortedSet<int> { 0 };
        foreach (var e in edges)
            candidateTimes.Add(e[2]);

        foreach (int t in candidateTimes)
        {
            if (CountComponents(n, edges, t) >= k)
                return t;
        }

        return candidateTimes.Max;
    }

    private int CountComponents(int n, int[][] edges, int t) 
    {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++)
            parent[i] = i;

        int Find(int x)
        {
            while (parent[x] != x)
            {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        int components = n;
        foreach (var e in edges)
        {
            if (e[2] > t)
            {
                int ra = Find(e[0]), rb = Find(e[1]);
                if (ra != rb)
                {
                    parent[ra] = rb;
                    components--;
                }
            }
        }

        return components;
    }
}
```

## Complexity

- **Time:** O(D * E * α(n)) where D is the number of distinct time values and E is the number of edges
- **Space:** O(n + D)
