# 3530. Maximum Profit from Valid Topological Order in DAG

**Difficulty:** Hard
**Category:** Graph, Dynamic Programming, Bitmask, Topological Sort

## Problem

You are given an integer `n` and a 2D integer array `edges` representing a directed acyclic graph (DAG) with `n` nodes labeled `0` to `n - 1`, where `edges[i] = [ui, vi]` indicates a directed edge from node `ui` to node `vi`. You are also given an integer array `profit` of length `n`.

A valid topological order of the graph is an ordering of the nodes such that for every edge `[u, v]`, `u` appears before `v`. For a given topological order, the profit gained by placing node `i` at position `pos` (1-indexed) is `profit[i] * pos`.

Return the maximum total profit achievable over all valid topological orderings of the graph.

### Example

`n = 3`, `edges = [[0,1],[0,2]]`, `profit = [2,3,3]`.

Order `[0,1,2]` gives `2*1 + 3*2 + 3*3 = 17`. Order `[0,2,1]` gives `2*1 + 3*3 + 3*2 = 17`. The maximum profit is `17`.

## Approach

Since `n` is small, use bitmask dynamic programming. Let `dp[mask]` be the maximum profit achievable after placing exactly `popcount(mask)` nodes, where `mask` is the set of nodes already placed. Precompute, for every node `v`, a bitmask of its required predecessors (sources of incoming edges). A node `v` can be placed next only if all of its predecessors are already contained in `mask`. Transition: for every node `v` not in `mask` whose predecessor mask is a subset of `mask`, update `dp[mask | (1 << v)]` with `dp[mask] + profit[v] * (popcount(mask) + 1)`. The answer is `dp[(1 << n) - 1]`.

## C# Solution

```csharp
public class Solution 
{
    public int MaxProfit(int n, int[][] edges, int[] profit) 
    {
        int[] predMask = new int[n];
        foreach (int[] edge in edges)
        {
            int u = edge[0], v = edge[1];
            predMask[v] |= (1 << u);
        }

        int full = 1 << n;
        int[] dp = new int[full];
        for (int mask = 1; mask < full; mask++)
        {
            dp[mask] = -1;
        }
        dp[0] = 0;

        for (int mask = 0; mask < full; mask++)
        {
            if (dp[mask] < 0) continue;

            int placed = PopCount(mask);
            for (int v = 0; v < n; v++)
            {
                if ((mask & (1 << v)) != 0) continue;
                if ((predMask[v] & mask) != predMask[v]) continue;

                int next = mask | (1 << v);
                int candidate = dp[mask] + profit[v] * (placed + 1);
                if (candidate > dp[next])
                {
                    dp[next] = candidate;
                }
            }
        }

        return dp[full - 1];
    }

    private int PopCount(int mask) 
    {
        int count = 0;
        while (mask > 0)
        {
            count += mask & 1;
            mask >>= 1;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(2^n * n)
- **Space:** O(2^n)
