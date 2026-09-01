# 3544. Subtree Inversion Sum

**Difficulty:** Hard
**Category:** Array, Depth-First Search, Dynamic Programming, Tree

## Problem
You are given a tree with `n` nodes (given as `edges`), node values `nums`, and an integer `k`. You may choose any collection of node subtrees to "invert" (negating every node value within the chosen subtree), subject to the rule that along any root-to-leaf path, two chosen inversion points must be separated by **at least `k` edges** (a cooldown). Return the **maximum** possible total sum of all node values achievable by optimally choosing which subtrees to invert, respecting the cooldown constraint. The tree is rooted at node `0`.

### Example
With `k = 0` (no cooldown), you may invert any subtree with a negative sum to flip it positive, maximizing the total by inverting every subtree whose sum is currently negative.

## Approach
Root the tree at node `0` and run a DFS that computes, for every node `u`, the best achievable sum of `u`'s subtree as a function of:
- `stepsSinceInversion`: how many edges have passed since the nearest ancestor inversion point on the path to `u` (capped at `k`; a value of `k` means the cooldown has fully elapsed and a **new** inversion choice is allowed at `u`).
- `inverted`: whether `u`'s subtree is currently under an active inversion state inherited from an ancestor's choice.

At each node `u`:
- Compute `num` = the sum of `u`'s own (possibly negated, per `inverted`) value plus the DFS results of all children, propagating the same `inverted` state and incrementing `stepsSinceInversion` (capped at `k`).
- If `stepsSinceInversion == k` (cooldown ready), also compute the alternative `negNum` where `u` is chosen as a **new** inversion point: negate `u`'s current contribution and recurse into children with `inverted` flipped and `stepsSinceInversion` reset to `1`.
- The result at `u` is `max(num, negNum)` when a fresh choice is available, otherwise just `num`.

The DFS starts at the root with `stepsSinceInversion = k` (free choice available immediately) and `inverted = false`; the final answer is the DFS result at the root.

## C# Solution

```csharp
public class Solution {
    private List<int>[] _graph;
    private int[] _nums;
    private int _k;
    private long?[,,] _memo;

    public long SubtreeInversionSum(int[][] edges, int[] nums, int k) {
        int n = edges.Length + 1;
        _nums = nums;
        _k = k;
        _graph = new List<int>[n];
        for (int i = 0; i < n; i++) _graph[i] = new List<int>();
        foreach (int[] edge in edges) {
            _graph[edge[0]].Add(edge[1]);
            _graph[edge[1]].Add(edge[0]);
        }

        _memo = new long?[n, k + 1, 2];
        return Dfs(0, -1, k, false);
    }

    private long Dfs(int u, int parent, int stepsSinceInversion, bool inverted) {
        int invertedIdx = inverted ? 1 : 0;
        if (_memo[u, stepsSinceInversion, invertedIdx].HasValue)
            return _memo[u, stepsSinceInversion, invertedIdx]!.Value;

        long num = inverted ? -_nums[u] : _nums[u];
        long negNum = -num;

        foreach (int v in _graph[u]) {
            if (v == parent) continue;
            int nextSteps = Math.Min(_k, stepsSinceInversion + 1);
            num += Dfs(v, u, nextSteps, inverted);
            if (stepsSinceInversion == _k) {
                negNum += Dfs(v, u, 1, !inverted);
            }
        }

        long result = stepsSinceInversion == _k ? Math.Max(num, negNum) : num;
        _memo[u, stepsSinceInversion, invertedIdx] = result;
        return result;
    }
}
```

## Complexity

- **Time:** O(n * k) since each node is evaluated for each `(stepsSinceInversion, inverted)` state once
- **Space:** O(n * k) for memoization
