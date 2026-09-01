# 1273. Delete Tree Nodes

**Difficulty:** Medium
**Category:** Array, Tree, Depth-First Search, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a tree with `nodes` nodes described by `parent` and `value` arrays, repeatedly delete any subtree whose values sum to `0` (deleting a subtree removes all of its nodes). Return the number of nodes remaining after all such deletions.

### Example

```
Input: nodes = 7, parent = [-1,0,0,1,2,2,2], value = [1,-2,4,0,-2,-1,-1]
Output: 2
```

## Approach

Build the tree from the `parent` array, then run a single post-order DFS computing each subtree's total value sum and node count. If a subtree's sum is exactly `0`, it (and everything below it) is entirely deleted, so it contributes `0` sum and `0` count to its parent's totals — effectively pruning it from consideration for good, since a zero-sum subtree can't influence anything above it either.

## C# Solution

```csharp
public class Solution
{
    public int DeleteTreeNodes(int nodes, int[] parent, int[] value)
    {
        var children = new List<int>[nodes];
        for (int i = 0; i < nodes; i++) children[i] = new List<int>();

        int root = 0;
        for (int i = 0; i < nodes; i++)
        {
            if (parent[i] == -1) root = i;
            else children[parent[i]].Add(i);
        }

        var (_, count) = Dfs(root, children, value);
        return count;
    }

    private (int Sum, int Count) Dfs(int node, List<int>[] children, int[] value)
    {
        int sum = value[node];
        int count = 1;

        foreach (int child in children[node])
        {
            var (childSum, childCount) = Dfs(child, children, value);
            sum += childSum;
            count += childCount;
        }

        return sum == 0 ? (0, 0) : (sum, count);
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of nodes.
- **Space:** `O(n)` for the tree structure and recursion stack.
