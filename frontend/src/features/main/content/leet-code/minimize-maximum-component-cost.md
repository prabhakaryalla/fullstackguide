# 3613. Minimize Maximum Component Cost

**Difficulty:** Medium
**Category:** Binary Search, Union Find, Graph Theory, Sorting

## Problem
You are given an undirected connected graph with `n` nodes labeled `0` to `n - 1` and a 2D integer array `edges`, where `edges[i] = [u_i, v_i, w_i]` denotes an edge between `u_i` and `v_i` with weight `w_i`, along with an integer `k`.

You may remove any number of edges so that the resulting graph has at most `k` connected components. The cost of a component is the maximum edge weight inside it (0 if it has no edges).

Return the minimum possible value of the maximum cost among all resulting components.

### Example
Input: `n = 5, edges = [[0,1,4],[1,2,3],[1,3,2],[3,4,6]], k = 2`
Output: `4`
Explanation: Removing the edge between nodes 3 and 4 (weight 6) leaves components with costs 0 and 4, so the maximum is 4.

Constraints:
- `1 <= n <= 5 * 10^4`
- `0 <= edges.length <= 10^5`
- `1 <= w_i <= 10^6`
- `1 <= k <= n`
- The graph is connected.

## Approach
If we keep only the edges whose weight is at most some threshold `X`, the number of connected components formed is a monotonically non-increasing function of `X`: increasing `X` can only add edges and merge components. We binary search over the sorted distinct edge weights for the smallest `X` such that keeping only edges with weight `<= X` yields at most `k` connected components (checked with a union-find/DSU). That smallest feasible `X` is the answer, since using exactly that edge subset achieves at most `k` components with maximum cost `X`, and any smaller threshold would leave more than `k` components.

## C# Solution

```csharp
public class Solution {
    public int MinCost(int n, int[][] edges, int k) {
        int[] weights = edges.Select(e => e[2]).Distinct().OrderBy(w => w).ToArray();
        int lo = 0, hi = weights.Length - 1;
        int ans = weights.Length > 0 ? weights[weights.Length - 1] : 0;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int threshold = weights[mid];
            if (CountComponents(n, edges, threshold) <= k) {
                ans = threshold;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        return ans;
    }

    private int CountComponents(int n, int[][] edges, int maxWeight) {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        foreach (var e in edges) {
            if (e[2] <= maxWeight) {
                Union(parent, e[0], e[1]);
            }
        }

        var roots = new HashSet<int>();
        for (int i = 0; i < n; i++) {
            roots.Add(Find(parent, i));
        }
        return roots.Count;
    }

    private int Find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void Union(int[] parent, int a, int b) {
        int ra = Find(parent, a), rb = Find(parent, b);
        if (ra != rb) parent[ra] = rb;
    }
}
```

## Complexity

- **Time:** O((n + m) log(n + m) log m), where m is the number of edges (sorting plus binary search over distinct weights, each check running union-find).
- **Space:** O(n + m)
