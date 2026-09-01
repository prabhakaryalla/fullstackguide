# 3535. Unit Conversion II

**Difficulty:** Medium
**Category:** Array, Breadth-First Search, Depth-First Search, Math, Graph
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given `conversions`, an array describing a tree of `n` units rooted at unit `0` (so `conversions.length == n - 1`), where each entry `[source, target, factor]` means `1` unit of `source` equals `factor` units of `target` (a directed edge from `source` down to `target` in the rooted tree). Given a list of `queries`, each `[u, v]`, return how many units of `v` equal `1` unit of `u`, modulo `10^9 + 7`, for each query. Since the conversion may require "dividing" (going up the tree, from a descendant unit toward an ancestor), use **modular inverse** arithmetic.

### Example
If `1` unit of `0` equals `2` units of `1`, and `1` unit of `0` equals `6` units of `2`, then `1` unit of `1` equals `3` units of `2` (since `6 / 2 = 3`), computed as `6 * inverse(2) mod (10^9+7)`.

## Approach
1. Run a BFS/DFS from the root (unit `0`) to compute `unitsFromRoot[i]` = how many units of `i` equal `1` unit of the root, by multiplying factors along the tree edges (`unitsFromRoot[0] = 1`; for edge `(u, v, factor)`, `unitsFromRoot[v] = unitsFromRoot[u] * factor % mod`).
2. For a query `(u, v)`, note that `1` unit of `u` corresponds to `1 / unitsFromRoot[u]` units of the root, which in turn corresponds to `unitsFromRoot[v] / unitsFromRoot[u]` units of `v`.
3. Since the modulus `10^9 + 7` is prime, compute the division via **Fermat's little theorem**: `unitsFromRoot[v] * modPow(unitsFromRoot[u], mod - 2) % mod`.

## C# Solution

```csharp
public class Solution {
    private const long Mod = 1_000_000_007;

    public int[] QueryConversions(int[][] conversions, int[][] queries) {
        long[] unitsFromRoot = BaseUnitConversions(conversions);

        var ans = new int[queries.Length];
        for (int q = 0; q < queries.Length; q++) {
            int u = queries[q][0], v = queries[q][1];
            long result = unitsFromRoot[v] * ModPow(unitsFromRoot[u], Mod - 2) % Mod;
            ans[q] = (int)result;
        }

        return ans;
    }

    private long[] BaseUnitConversions(int[][] conversions) {
        int n = conversions.Length + 1;
        var res = new long[n];
        res[0] = 1;

        var graph = new List<(int to, int factor)>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<(int, int)>();
        foreach (int[] c in conversions) graph[c[0]].Add((c[1], c[2]));

        var queue = new Queue<int>();
        queue.Enqueue(0);
        while (queue.Count > 0) {
            int u = queue.Dequeue();
            foreach (var (v, factor) in graph[u]) {
                res[v] = res[u] * factor % Mod;
                queue.Enqueue(v);
            }
        }

        return res;
    }

    private long ModPow(long x, long n) {
        long result = 1;
        x %= Mod;
        while (n > 0) {
            if ((n & 1) == 1) result = result * x % Mod;
            x = x * x % Mod;
            n >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n + q log(mod)) for the BFS traversal plus modular exponentiation per query
- **Space:** O(n) for the graph adjacency list and the base-unit array
