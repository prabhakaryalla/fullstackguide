# 3486. Longest Special Path II

**Difficulty:** Hard
**Category:** Array, Hash Table, Tree, Depth-First Search, Prefix Sum

## Problem
You are given an undirected tree rooted at node `0`, with `n` nodes numbered `0` to `n - 1`, described by an array `edges` where `edges[i] = [u, v, length]`. You are also given an integer array `nums`, where `nums[i]` is the value at node `i`.

A **special path** is a downward path (from an ancestor to a descendant) in which all node values are distinct, **except that at most one value may appear twice**.

Return an array `result` of size 2, where `result[0]` is the length (sum of edge weights) of the longest special path, and `result[1]` is the minimum number of nodes among all special paths achieving that maximum length.

### Example
Input: `edges = [[1, 0, 3], [0, 2, 4], [0, 3, 5]]`, `nums = [1, 1, 0, 2]`
Output: `[5, 2]`
Explanation: The path `0 -> 3` has length 5 and 2 nodes and is the longest special path (the path `1 -> 0` has a repeated value 1 but length only 3, and `1 -> 0 -> 2` repeats value 1 with length 7 — but any path repeating a value and extending further would repeat it in a strictly worse way than isolating `0 -> 3`).

## Approach
Perform a DFS from the root while maintaining the prefix sum of edge weights along the current root-to-node path, and a map from value to the last depth (position in the prefix array) at which it was seen on the current path.

At each node `u`, look up when `nums[u]` was last seen on the path. If it was seen before, that occurrence becomes a candidate "left boundary" cut point: combine it with the two most restrictive boundary points already tracked and keep only the two largest, since a special path may absorb **one** repeated value — the window may start right after the *second* most recent duplicate cut. The current best special path ending at `u` spans from just after the more permissive of these two cut points to `u`; update the global answer (longest length, tying on fewest nodes) accordingly. Recurse into children with the (possibly updated) boundary, then restore the map entry when backtracking.

## C# Solution

```csharp
public class Solution {
    private List<int[]>[] graph;
    private int[] nums;
    private int maxLength;
    private int minNodes;

    public int[] LongestSpecialPath(int[][] edges, int[] nums) {
        int n = nums.Length;
        this.nums = nums;
        graph = new List<int[]>[n];
        for (int i = 0; i < n; i++) graph[i] = new List<int[]>();
        foreach (var edge in edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            graph[u].Add(new[] { v, w });
            graph[v].Add(new[] { u, w });
        }

        maxLength = 0;
        minNodes = 1;
        var prefix = new List<long> { 0 };
        var lastSeenDepth = new Dictionary<int, int>();
        Dfs(0, -1, new int[] { 0, 0 }, prefix, lastSeenDepth);
        return new int[] { maxLength, minNodes };
    }

    private void Dfs(int u, int prev, int[] leftBoundary, List<long> prefix, Dictionary<int, int> lastSeenDepth) {
        lastSeenDepth.TryGetValue(nums[u], out int prevDepth);
        lastSeenDepth[nums[u]] = prefix.Count;

        int[] boundary = leftBoundary;
        if (prevDepth != 0) {
            int[] combined = { leftBoundary[0], leftBoundary[1], prevDepth };
            Array.Sort(combined);
            boundary = new int[] { combined[1], combined[2] };
        }

        long length = prefix[prefix.Count - 1] - prefix[boundary[0]];
        int nodes = prefix.Count - boundary[0];
        if (length > maxLength || (length == maxLength && nodes < minNodes)) {
            maxLength = (int)length;
            minNodes = nodes;
        }

        foreach (var edge in graph[u]) {
            int v = edge[0], w = edge[1];
            if (v == prev) continue;
            prefix.Add(prefix[prefix.Count - 1] + w);
            Dfs(v, u, boundary, prefix, lastSeenDepth);
            prefix.RemoveAt(prefix.Count - 1);
        }

        lastSeenDepth[nums[u]] = prevDepth;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
