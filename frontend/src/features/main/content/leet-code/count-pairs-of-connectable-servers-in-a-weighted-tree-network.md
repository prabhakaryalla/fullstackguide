# 3067. Count Pairs of Connectable Servers in a Weighted Tree Network

**Difficulty:** Medium
**Category:** Array, Tree, Depth-First Search

## Problem

You are given an unrooted weighted tree with `n` servers (nodes `0` to `n-1`) described by a 0-indexed 2D array `edges`, where `edges[i] = [ui, vi, weighti]`. You are also given an integer `signalSpeed`. Two servers `a` and `b` (with `a != b`) are **connectable** through an intermediate server `c` if the path distance from `c` to `a`, and separately from `c` to `b`, is each divisible by `signalSpeed`, and the paths to `a` and `b` diverge immediately at `c` (they don't share edges). Return an array `count` where `count[c]` is the number of such connectable pairs routed through server `c`.

## Approach

For each candidate center `c`, look at each of its direct subtrees (one per neighbor). Within a subtree rooted at neighbor `v`, DFS to count how many nodes have a distance from `c` that's divisible by `signalSpeed`. Pairs routed through `c` must come from **different** subtrees (otherwise the paths would overlap), so accumulate a running total of "connectable node count so far" across subtrees and multiply-accumulate as each new subtree's count is discovered (classic "count pairs across groups" combinatorics).

## C# Solution

```csharp
public class Solution {
    public int[] CountPairsOfConnectableServers(int[][] edges, int signalSpeed) {
        int n = edges.Length + 1;
        var tree = new List<(int to, int w)>[n];
        for (int i = 0; i < n; i++)
            tree[i] = new List<(int, int)>();

        foreach (var edge in edges) {
            tree[edge[0]].Add((edge[1], edge[2]));
            tree[edge[1]].Add((edge[0], edge[2]));
        }

        int[] ans = new int[n];
        for (int i = 0; i < n; i++)
            ans[i] = ConnectablePairsRootedAt(tree, i, signalSpeed);
        return ans;
    }

    private int ConnectablePairsRootedAt(List<(int to, int w)>[] tree, int u, int signalSpeed) {
        int pairs = 0, count = 0;
        foreach (var (v, w) in tree[u]) {
            int childCount = Dfs(tree, v, u, w, signalSpeed);
            pairs += count * childCount;
            count += childCount;
        }
        return pairs;
    }

    // Returns the number of nodes in the subtree rooted at u (coming from prev)
    // whose distance from the original center is divisible by signalSpeed.
    private int Dfs(List<(int to, int w)>[] tree, int u, int prev, int dist, int signalSpeed) {
        int count = 0;
        foreach (var (v, w) in tree[u])
            if (v != prev)
                count += Dfs(tree, v, u, dist + w, signalSpeed);
        return (dist % signalSpeed == 0 ? 1 : 0) + count;
    }
}
```

## Complexity

- Time: O(n^2) — a DFS from every node in the worst case.
- Space: O(n) — the adjacency list and recursion stack.
