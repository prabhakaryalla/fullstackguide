# 3425. Longest Special Path

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Array, Hash Table

## Problem
You are given an undirected tree with `n` nodes rooted at node `0`, described by `edges[i] = [u, v, w]` (an edge between `u` and `v` with weight `w`), and an array `nums` where `nums[i]` is the value assigned to node `i`. A **special path** is a downward path (from some ancestor to one of its descendants) in which all node values are pairwise distinct. Find the special path with the maximum total edge weight; if multiple special paths tie for the maximum weight, prefer the one with the fewest nodes. Return an array `[longestLength, minNumberOfNodes]`.

## Approach
Do a DFS from the root while maintaining the current root-to-node stack as an array `path` (with parallel cumulative distances `dist`), plus a map `lastSeen` from value to the most recent index in `path` where that value occurred. Also carry a `left` boundary (index into `path`) representing the start of the longest suffix of the current path that is still special.

When entering node `u` at stack depth `idx`:
- If `nums[u]` was last seen at an index `>= left`, the special window must shrink: `left = lastSeenIndex + 1`.
- Record `lastSeen[nums[u]] = idx`.
- The current special path spans `path[left..idx]`, with length `dist[idx] - dist[left]` and node count `idx - left + 1`. Compare against the best answer found so far.
- Recurse into children with the updated `left` (passed by value, so siblings don't interfere with each other).
- On backtracking, restore `lastSeen[nums[u]]` to whatever value it held before this call (or remove the key if it didn't exist), and pop `u` from `path`/`dist`.

Because `left` is threaded through the recursion as a parameter (not shared mutable global state) and `lastSeen` is restored on the way back up, each root-to-node path is evaluated with exactly the state relevant to it.

## C# Solution

```csharp
public class Solution 
{
    private List<(int to, int weight)>[] _adj = null!;
    private int[] _nums = null!;
    private readonly List<int> _path = new();
    private readonly List<long> _dist = new();
    private readonly Dictionary<int, int> _lastSeen = new();
    private long _bestLength = 0;
    private int _bestNodes = 1;

    public int[] LongestSpecialPath(int[][] edges, int[] nums) 
    {
        int n = nums.Length;
        _nums = nums;
        _adj = new List<(int, int)>[n];
        for (int i = 0; i < n; i++) _adj[i] = new List<(int, int)>();
        foreach (var e in edges) 
        {
            _adj[e[0]].Add((e[1], e[2]));
            _adj[e[1]].Add((e[0], e[2]));
        }

        Dfs(0, -1, 0, 0);

        return new[] { (int)_bestLength, _bestNodes };
    }

    private void Dfs(int u, int parent, long distToU, int left) 
    {
        int idx = _path.Count;
        _path.Add(u);
        _dist.Add(distToU);

        bool hadPrev = _lastSeen.TryGetValue(_nums[u], out int prevIdx);
        if (hadPrev && prevIdx >= left) 
        {
            left = prevIdx + 1;
        }
        _lastSeen[_nums[u]] = idx;

        long length = distToU - _dist[left];
        int nodeCount = idx - left + 1;
        if (length > _bestLength || (length == _bestLength && nodeCount < _bestNodes)) 
        {
            _bestLength = length;
            _bestNodes = nodeCount;
        }

        foreach (var (v, w) in _adj[u]) 
        {
            if (v != parent) 
            {
                Dfs(v, u, distToU + w, left);
            }
        }

        if (hadPrev) _lastSeen[_nums[u]] = prevIdx; else _lastSeen.Remove(_nums[u]);
        _path.RemoveAt(_path.Count - 1);
        _dist.RemoveAt(_dist.Count - 1);
    }
}
```

## Complexity

- **Time:** O(n) — each node is visited once and does O(1) amortized work besides the recursion.
- **Space:** O(n) for the adjacency list, path stack, and last-seen map (plus O(n) recursion depth in the worst case of a skewed tree).
