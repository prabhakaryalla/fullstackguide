# 3244. Shortest Distance After Road Addition Queries II

**Difficulty:** Hard
**Category:** Array, Greedy, Ordered Set

## Problem
This is the harder-constraints version of "Shortest Distance After Road Addition Queries I", with an important simplification: added roads never cause "crossing" shortcuts (each new edge always skips strictly forward without overlapping previously added shortcuts in a conflicting way), so the shortest path structure can be maintained more efficiently. After each query adds a new directional shortcut, report the shortest path from city 0 to city n-1.

## Approach
Since edges never cross in a conflicting way, maintain a map representing the current "reachable in one hop" structure: initially, `nodeToFarthestNode[i] = i + 1` for every city except the last. For each new query edge `(u, v)`, if `u` currently maps to some farther node that is closer than `v` (meaning `v` extends further than the current shortcut from `u`), remove all now-redundant intermediate mappings between `u`'s old target and `v` (since they become unreachable optimally through the direct route now), and update `nodeToFarthestNode[u] = v`. The size of this map at any point directly represents the length of the shortest path (number of hops) from city 0 to city n-1, so record it after each query.

## C# Solution
```csharp
public class Solution {
    public int[] ShortestDistanceAfterQueries(int n, int[][] queries) {
        int[] ans = new int[queries.Length];
        Dictionary<int, int> nodeToFarthestNode = new Dictionary<int, int>();

        for (int i = 0; i < n - 1; i++)
            nodeToFarthestNode[i] = i + 1;

        for (int idx = 0; idx < queries.Length; idx++) {
            int u = queries[idx][0];
            int v = queries[idx][1];

            if (nodeToFarthestNode.TryGetValue(u, out int farthest) && farthest < v) {
                int node = farthest;
                while (node < v) {
                    int cache = node;
                    node = nodeToFarthestNode[node];
                    nodeToFarthestNode.Remove(cache);
                }
                nodeToFarthestNode[u] = v;
            }

            ans[idx] = nodeToFarthestNode.Count;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n + q)
- Space: O(n)
