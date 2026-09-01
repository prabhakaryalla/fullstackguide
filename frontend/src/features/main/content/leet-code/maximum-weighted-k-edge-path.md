# 3543. Maximum Weighted K-Edge Path

**Difficulty:** Hard
**Category:** Dynamic Programming, Hash Table, Greedy

## Problem
You are given `n` nodes and a list of directed `edges`, each `[u, v, w]` meaning an edge from `u` to `v` with weight `w`. You are also given integers `k` and `t`. Find a path (nodes may be revisited) that uses **exactly `k` edges** such that every partial prefix sum along the path (including the final total) stays strictly less than `t`, and among all such paths, return the **maximum possible total edge-weight sum**. Return `-1` if no such path exists. The path may start at any node.

### Example
Edges `0→1 (w=5)`, `1→2 (w=3)`, `k=2`, `t=10` → Path `0→1→2` has running sums `5, 8`, both `< 10`; total `8`. Output: `8`.

## Approach
Track, for every node `u` and every edge-count `i` from `0` to `k`, the **set of achievable path sums** that end at `u` after using exactly `i` edges while never letting any prefix sum reach or exceed `t`.
- Initialize `dp[u][0] = {0}` for every node (a path with zero edges has sum `0`).
- For each edge count `i` from `0` to `k-1`, and every node `u` with achievable sums at step `i`, extend along every outgoing edge `(u, v, w)`: the new sum `currSum + w` is added to `dp[v][i+1]` only if it stays `< t`.
- After processing all `k` steps, the answer is the maximum value found across `dp[u][k]` for every node `u`, or `-1` if no such value exists.

Because sums are capped below `t`, the number of distinct sums tracked per state stays bounded, keeping the search tractable despite paths being able to revisit nodes.

## C# Solution

```csharp
public class Solution {
    public int MaxWeight(int n, int[][] edges, int k, int t) {
        var graph = new List<(int to, int w)>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<(int, int)>();
        foreach (int[] edge in edges) graph[edge[0]].Add((edge[1], edge[2]));

        // dp[u][i] = set of achievable path sums ending at u using exactly i edges
        var dp = new Dictionary<int, HashSet<int>>[n];
        for (int u = 0; u < n; u++) {
            dp[u] = new Dictionary<int, HashSet<int>>();
            dp[u][0] = new HashSet<int> { 0 };
        }

        for (int i = 0; i < k; i++) {
            for (int u = 0; u < n; u++) {
                if (!dp[u].TryGetValue(i, out HashSet<int> sums)) continue;
                foreach (int currSum in sums) {
                    foreach (var (v, w) in graph[u]) {
                        int newSum = currSum + w;
                        if (newSum < t) {
                            if (!dp[v].TryGetValue(i + 1, out HashSet<int> nextSums)) {
                                nextSums = new HashSet<int>();
                                dp[v][i + 1] = nextSums;
                            }
                            nextSums.Add(newSum);
                        }
                    }
                }
            }
        }

        int ans = -1;
        for (int u = 0; u < n; u++) {
            if (dp[u].TryGetValue(k, out HashSet<int> finalSums)) {
                foreach (int sum in finalSums) ans = Math.Max(ans, sum);
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n * k * t) in the worst case, bounded by the number of distinct achievable sums (each less than `t`) tracked per node and edge count
- **Space:** O(n * k * t) for the DP sets in the worst case
