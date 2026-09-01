# 3607. Power Grid Maintenance

**Difficulty:** Medium
**Category:** Union Find, Graph, Design, Ordered Set

## Problem
There are `n` power stations, numbered from `1` to `n`, connected by bidirectional cables given as `connections[i] = [u, v]`. All stations start **online**. You must process a list of `queries`, each of one of two types:
- `[1, x]`: report the smallest-numbered station that is currently online and is in the same connected component as station `x` (this may be `x` itself); report `-1` if no station in that component is online.
- `[2, x]`: take station `x` offline permanently (it stays offline for all future queries).

Return an array containing the answer for every type-`1` query, in order.

## Approach
Precompute connected components using Union-Find over the initial `connections`. For each component (identified by its DSU root), maintain a `SortedSet<int>` of the station numbers currently online in that component — this allows retrieving the minimum online station in O(log n).

Process queries in order:
- For a type-`2` query, remove `x` from the sorted set belonging to its component's root.
- For a type-`1` query, look up the sorted set for `x`'s root and return its minimum element (`Min` via `.First()`/`.Min` on the set), or `-1` if the set is empty.

Since stations only ever go offline (never back online), each station is removed from its set at most once, keeping the total work bounded.

## C# Solution

```csharp
public class Solution 
{
    public int[] ProcessQueries(int n, int[][] connections, int[][] queries) 
    {
        int[] parent = new int[n + 1];
        for (int i = 1; i <= n; i++)
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

        void Union(int a, int b)
        {
            int ra = Find(a), rb = Find(b);
            if (ra != rb)
                parent[ra] = rb;
        }

        foreach (var c in connections)
            Union(c[0], c[1]);

        var componentSets = new Dictionary<int, SortedSet<int>>();
        for (int i = 1; i <= n; i++)
        {
            int root = Find(i);
            if (!componentSets.TryGetValue(root, out var set))
            {
                set = new SortedSet<int>();
                componentSets[root] = set;
            }
            set.Add(i);
        }

        var results = new List<int>();

        foreach (var q in queries)
        {
            int type = q[0], x = q[1];
            int root = Find(x);
            var set = componentSets[root];

            if (type == 2)
            {
                set.Remove(x);
            }
            else
            {
                results.Add(set.Count > 0 ? set.Min : -1);
            }
        }

        return results.ToArray();
    }
}
```

## Complexity

- **Time:** O((n + Q) log n) where Q is the number of queries
- **Space:** O(n)
