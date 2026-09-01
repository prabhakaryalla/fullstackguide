# 1971. Find if Path Exists in Graph

**Difficulty:** Easy
**Category:** Graph, Union Find, Depth-First Search, Breadth-First Search

## Problem

Given a bidirectional graph of `n` vertices (`0` to `n-1`) described by `edges`, and a `source` and `destination` vertex, return `true` if there is a valid path from `source` to `destination`.

### Example

```
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: 0 -> 1 -> 2 is a valid path.
```

### Constraints

- `1 <= n <= 2 * 10^5`
- `0 <= edges.length <= 2 * 10^5`
- `edges[i].length == 2`
- `0 <= source, destination <= n - 1`
- No self-loops or duplicate edges.

## Approach

Use a union-find (disjoint set union) structure: union the endpoints of every edge, then check whether `source` and `destination` end up in the same connected component (same root).

## C# Solution

```csharp
public class Solution
{
    private int[] _parent;

    public bool ValidPath(int n, int[][] edges, int source, int destination)
    {
        _parent = new int[n];
        for (int i = 0; i < n; i++) _parent[i] = i;

        foreach (var edge in edges)
        {
            Union(edge[0], edge[1]);
        }

        return Find(source) == Find(destination);
    }

    private int Find(int x)
    {
        if (_parent[x] != x)
        {
            _parent[x] = Find(_parent[x]);
        }
        return _parent[x];
    }

    private void Union(int a, int b)
    {
        int rootA = Find(a), rootB = Find(b);
        if (rootA != rootB)
        {
            _parent[rootA] = rootB;
        }
    }
}
```

## Complexity

- **Time:** `O((n + E) * alpha(n))` — near-linear with path compression.
- **Space:** `O(n)` for the parent array.
