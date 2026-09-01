# 3615. Longest Palindromic Path in Graph

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Bit Manipulation, Graph Theory, Bitmask

## Problem
You are given an integer `n` and an undirected graph with `n` nodes labeled `0` to `n - 1`, described by a 2D array `edges` where `edges[i] = [u_i, v_i]` indicates an edge between `u_i` and `v_i`. You are also given a string `label` of length `n`, where `label[i]` is the character associated with node `i`.

You may start at any node and move to any adjacent node, visiting each node at most once. Return the maximum possible length of a palindrome that can be formed by the sequence of labels visited along a valid path.

### Example
Input: `n = 4, edges = [[0,2],[0,3],[3,1]], label = "bbac"`
Output: `3`
Explanation: The path `0 → 3 → 1` visits labels `"b"`, `"c"`, `"b"`, forming the palindrome `"bcb"` of length 3.

Constraints:
- `1 <= n <= 14`
- `n - 1 <= edges.length <= n * (n - 1) / 2`
- `label` consists of lowercase English letters, one per node.

## Approach
Since `n <= 14`, use bitmask dynamic programming. Build the palindrome from the center outward: `dp[mask][l][r]` is the length of the longest palindromic path that uses exactly the nodes in `mask`, whose two current path endpoints are `l` and `r`.

- Base cases: every single node `v` gives `dp[{v}][v][v] = 1`. Every edge `(u, v)` with `label[u] == label[v]` gives `dp[{u, v}][u][v] = 2`.
- Transition: from state `dp[mask][l][r]`, pick two new nodes `na` and `nb` not yet in `mask` with `na != nb`, `label[na] == label[nb]`, an edge between `na` and `l`, and an edge between `nb` and `r`. This extends the palindrome symmetrically to `dp[mask | {na, nb}][na][nb] = dp[mask][l][r] + 2`, and the result is still a single valid path because `na` only attaches to the current left end and `nb` only attaches to the current right end.

The answer is the maximum value found across all reachable `dp[mask][l][r]` states.

## C# Solution

```csharp
public class Solution {
    public int MaxLen(int n, int[][] edges, string label) {
        bool[,] adj = new bool[n, n];
        foreach (var e in edges) {
            adj[e[0], e[1]] = true;
            adj[e[1], e[0]] = true;
        }

        int[,,] dp = new int[1 << n, n, n];
        for (int mask = 0; mask < (1 << n); mask++) {
            for (int l = 0; l < n; l++) {
                for (int r = 0; r < n; r++) {
                    dp[mask, l, r] = -1;
                }
            }
        }

        int result = 1;
        for (int v = 0; v < n; v++) {
            dp[1 << v, v, v] = 1;
        }
        for (int u = 0; u < n; u++) {
            for (int v = 0; v < n; v++) {
                if (u != v && adj[u, v] && label[u] == label[v]) {
                    dp[(1 << u) | (1 << v), u, v] = 2;
                    result = Math.Max(result, 2);
                }
            }
        }

        for (int mask = 0; mask < (1 << n); mask++) {
            for (int l = 0; l < n; l++) {
                for (int r = 0; r < n; r++) {
                    int cur = dp[mask, l, r];
                    if (cur == -1) continue;
                    result = Math.Max(result, cur);

                    for (int na = 0; na < n; na++) {
                        if ((mask & (1 << na)) != 0 || !adj[na, l]) continue;
                        for (int nb = 0; nb < n; nb++) {
                            if (na == nb || (mask & (1 << nb)) != 0 || !adj[nb, r]) continue;
                            if (label[na] != label[nb]) continue;

                            int newMask = mask | (1 << na) | (1 << nb);
                            int candidate = cur + 2;
                            if (candidate > dp[newMask, na, nb]) {
                                dp[newMask, na, nb] = candidate;
                            }
                        }
                    }
                }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(2^n * n^4) in the worst case; in practice much faster since `na`/`nb` are restricted to actual neighbors of `l`/`r`.
- **Space:** O(2^n * n^2)
