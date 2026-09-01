# 1719. Number Of Ways To Reconstruct A Tree

**Difficulty:** Hard
**Category:** Array, Graph, Tree

## Problem

Given `pairs`, where each `pairs[i] = [xi, yi]` indicates that `xi` and `yi` are connected by an ancestor-descendant relationship (an edge, or a node and one of its ancestors) in an unknown rooted tree, determine whether a tree can be reconstructed from `pairs`: return `0` if no tree fits, `1` if exactly one tree fits, or `2` if more than one tree fits.

### Example

```
Input: pairs = [[1,2],[2,3]]
Output: 1
```

## Approach

Build, for every node, the set of nodes it appears paired with. Sort nodes by decreasing set size — the node whose set covers all other nodes must be the root. Process nodes from largest to smallest set: each node's parent is the smallest already-confirmed set that contains it; verify every other node in its set is also in the parent's set (otherwise no valid tree exists). If a node's set is exactly the same size as its parent's, the parent/child relationship is ambiguous, so more than one tree is possible.

## C# Solution

```csharp
public class Solution
{
    public int CheckWays(int[][] pairs)
    {
        var adj = new Dictionary<int, HashSet<int>>();
        foreach (var p in pairs)
        {
            if (!adj.TryGetValue(p[0], out var s0)) adj[p[0]] = s0 = new HashSet<int>();
            if (!adj.TryGetValue(p[1], out var s1)) adj[p[1]] = s1 = new HashSet<int>();
            s0.Add(p[1]);
            s1.Add(p[0]);
        }

        int n = adj.Count;
        bool multipleWays = false;
        var confirmed = new HashSet<int>();
        var nodes = adj.Keys.OrderByDescending(k => adj[k].Count).ToList();

        foreach (int node in nodes)
        {
            confirmed.Add(node);
            int parent = 0;

            foreach (int x in adj[node])
            {
                if (!confirmed.Contains(x)) continue;
                if (parent == 0 || adj[x].Count < adj[parent].Count) parent = x;
            }

            if (parent != 0)
            {
                foreach (int x in adj[node])
                    if (x != parent && !adj[parent].Contains(x)) return 0;

                multipleWays |= adj[parent].Count == adj[node].Count;
            }
            else if (adj[node].Count != n - 1)
            {
                return 0;
            }
        }

        return multipleWays ? 2 : 1;
    }
}
```

## Complexity

- **Time:** `O(n log n + n * avgDegree)`.
- **Space:** `O(n + p)` for the adjacency sets.
