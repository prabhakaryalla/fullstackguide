# 3367. Maximize Sum of Weights after Edge Removals

**Difficulty:** Hard
**Category:** Tree, Dynamic Programming, Greedy, Depth-First Search

## Problem

Given a tree with `n` nodes and weighted edges, remove edges so that every remaining node has degree at most `k`. Maximize the sum of the remaining edge weights.

### Example

A star-shaped tree with center degree exceeding `k` must drop its lowest-weight edges until the center's degree is `<= k`.

## Approach

Root the tree and run a DFS returning two values per node: the best subtree sum when the edge to its parent is **not** kept (full budget `k` for children) and when it **is** kept (budget `k-1` for children). For each child, compute the "gain" of keeping vs. not keeping the connecting edge; select the top positive gains up to the available budget.

## C# Solution

```csharp
public class Solution 
{
    private List<(int to, int w)>[] adj;

    public long MaximizeSumOfWeights(int[][] edges, int k) 
    {
        int n = edges.Length + 1;
        adj = new List<(int, int)>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<(int, int)>();
        foreach (var e in edges) 
        {
            adj[e[0]].Add((e[1], e[2]));
            adj[e[1]].Add((e[0], e[2]));
        }

        var (dp0, _) = Dfs(0, -1, k);
        return dp0;
    }

    private (long dp0, long dp1) Dfs(int u, int parent, int k) 
    {
        long baseSum = 0;
        var gains = new List<long>();

        foreach (var (v, w) in adj[u]) 
        {
            if (v == parent) continue;
            var (childDp0, childDp1) = Dfs(v, u, k);
            baseSum += childDp0;
            long gain = w + childDp1 - childDp0;
            gains.Add(gain);
        }

        gains.Sort((a, b) => b.CompareTo(a));

        long dp0 = baseSum;
        int take0 = Math.Min(k, gains.Count);
        for (int i = 0; i < take0; i++)
            if (gains[i] > 0) dp0 += gains[i];

        long dp1 = baseSum;
        int take1 = Math.Min(Math.Max(k - 1, 0), gains.Count);
        for (int i = 0; i < take1; i++)
            if (gains[i] > 0) dp1 += gains[i];

        return (dp0, dp1);
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
