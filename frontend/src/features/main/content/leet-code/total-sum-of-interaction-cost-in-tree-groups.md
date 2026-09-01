# 3786. Total Sum of Interaction Cost in Tree Groups

**Difficulty:** Hard
**Category:** Array, Tree, Depth-First Search

## Problem

Given an undirected tree of `n` nodes (`edges`) and a `group` array (`group[i]` in `[1,20]`), the interaction cost between two same-group nodes `u,v` is the number of edges on their unique tree path. Return the sum of interaction costs over all unordered pairs `(u,v)` with `group[u] == group[v]`.

### Example

Input: `n = 3, edges = [[0,1],[1,2]], group = [1,1,1]`
Output: `4`

## Approach

For each edge, it is used by a pair `(u,v)` in the same group exactly when one endpoint's subtree contains `u` and not `v` (or vice versa). So each edge's total contribution is `sum over groups g of subtreeCount[g] * (totalCount[g] - subtreeCount[g])`. Compute subtree group counts via a bottom-up (post-order) traversal and accumulate this contribution for every non-root node's edge to its parent.

## C# Solution

```csharp
public class Solution 
{
    public long InteractionCosts(int n, int[][] edges, int[] group) 
    {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        int numGroups = 21;
        var totalCount = new int[numGroups];
        foreach (int g in group) totalCount[g]++;

        var parent = new int[n];
        var order = new int[n];
        Array.Fill(parent, -1);
        var visited = new bool[n];
        int head = 0, tail = 0;
        order[tail++] = 0;
        visited[0] = true;
        while (head < tail)
        {
            int u = order[head++];
            foreach (int v in adj[u])
            {
                if (!visited[v])
                {
                    visited[v] = true;
                    parent[v] = u;
                    order[tail++] = v;
                }
            }
        }

        var subCount = new int[n, numGroups];
        for (int i = 0; i < n; i++) subCount[i, group[i]] = 1;

        long answer = 0;
        for (int idx = n - 1; idx >= 0; idx--)
        {
            int u = order[idx];
            if (parent[u] != -1)
            {
                int p = parent[u];
                for (int g = 1; g < numGroups; g++)
                {
                    int sub = subCount[u, g];
                    answer += (long)sub * (totalCount[g] - sub);
                    subCount[p, g] += sub;
                }
            }
        }
        return answer;
    }
}
```

## Complexity

- **Time:** O(n * 20)
- **Space:** O(n * 20)
