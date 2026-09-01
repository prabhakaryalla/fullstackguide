# 310. Minimum Height Trees

**Difficulty:** Medium
**Category:** Graph, Breadth-First Search, Topological Sort

## Problem

A tree is an undirected graph in which any two vertices are connected by exactly one path, given `n` nodes labeled `0` to `n - 1` and a list of `edges`. Return all the roots that produce Minimum Height Trees (MHTs) — trees with minimum possible height.

### Example

```
Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
```

### Constraints

- `1 <= n <= 2 * 10^4`
- `edges.length == n - 1`
- `0 <= ai, bi < n`
- All pairs `(ai, bi)` are distinct.
- The given input is guaranteed to be a tree.

## Approach

The roots of MHTs are always one or two nodes at the very center of the tree. Repeatedly trim leaf nodes (layer by layer) from the graph, similar to topological sort, until at most two nodes remain — those are the centroid(s) and the answer.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindMinHeightTrees(int n, int[][] edges)
    {
        if (n == 1) return new List<int> { 0 };

        var adjacency = new List<HashSet<int>>();
        for (int i = 0; i < n; i++)
            adjacency.Add(new HashSet<int>());

        foreach (var edge in edges)
        {
            adjacency[edge[0]].Add(edge[1]);
            adjacency[edge[1]].Add(edge[0]);
        }

        var leaves = new List<int>();
        for (int i = 0; i < n; i++)
            if (adjacency[i].Count == 1)
                leaves.Add(i);

        int remaining = n;
        while (remaining > 2)
        {
            remaining -= leaves.Count;
            var nextLeaves = new List<int>();

            foreach (var leaf in leaves)
            {
                int neighbor = adjacency[leaf].First();
                adjacency[neighbor].Remove(leaf);
                if (adjacency[neighbor].Count == 1)
                    nextLeaves.Add(neighbor);
            }

            leaves = nextLeaves;
        }

        return leaves;
    }
}
```

## Complexity

- **Time:** `O(n)` — each node and edge is processed a constant number of times.
- **Space:** `O(n)` for the adjacency structure.
