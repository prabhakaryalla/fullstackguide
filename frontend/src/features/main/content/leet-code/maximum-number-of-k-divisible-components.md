# 2872. Maximum Number of K-Divisible Components

**Difficulty:** Hard
**Category:** Array, Tree, Depth-First Search

## Problem

There is an undirected tree with `n` nodes labeled `0` to `n-1`, given as an edge list, and a `values` array where `values[i]` is the value of node `i`. Given an integer `k`, you may remove any subset of edges to split the tree into several connected components. Return the **maximum** number of components such that every component's total value is divisible by `k`.

### Example

`n = 5`, `edges = [[0,2],[1,2],[1,3],[2,4]]`, `values = [1,8,1,4,4]`, `k = 6` → answer `2` (splitting into `{0,2,4}` with sum `9`... actually the valid split groups sum to multiples of `6`, e.g. `{1,3}` sum `12` and `{0,2,4}` sum `9` is not divisible, the correct maximal split yields `2` components).

## Approach

Root the tree anywhere and do a post-order DFS. For each node, accumulate the sum of its own value plus the sums returned by its children, taken modulo `k`. Whenever a subtree's accumulated sum modulo `k` equals `0`, that edge connecting it to its parent can be safely cut off as a valid, self-contained component — increment the answer and "reset" the value passed up to the parent to `0` (as if this subtree no longer contributes anything further up).

Since every leftover contribution eventually reaches the root with sum `0 mod k` (the total tree sum only matters in aggregate), each such reset corresponds to one more valid component.

## C# Solution

```csharp
public class Solution 
{
    public int MaxKDivisibleComponents(int n, int[][] edges, int[] values, int k) 
    {
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++)
        {
            adj[i] = new List<int>();
        }
        foreach (int[] edge in edges)
        {
            adj[edge[0]].Add(edge[1]);
            adj[edge[1]].Add(edge[0]);
        }

        int components = 0;
        bool[] visited = new bool[n];

        long Dfs(int u)
        {
            visited[u] = true;
            long sum = values[u] % k;
            foreach (int v in adj[u])
            {
                if (!visited[v])
                {
                    sum += Dfs(v);
                }
            }
            sum %= k;
            if (sum == 0)
            {
                components++;
            }
            return sum;
        }

        Dfs(0);
        return components;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
