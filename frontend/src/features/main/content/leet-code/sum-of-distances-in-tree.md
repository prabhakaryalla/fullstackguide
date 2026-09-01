# 834. Sum of Distances in Tree

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Graph, Dynamic Programming

## Problem

Given an undirected tree with `n` nodes described by `edges`, return an array `answer` where `answer[i]` is the sum of distances between node `i` and every other node in the tree.

### Example

```
Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
```

## Approach

Use a two-pass tree re-rooting technique. First, root the tree at node `0` and perform a post-order DFS to compute each node's subtree size and `answer[0]`'s contribution built bottom-up: `answer[node]` accumulates, for each child, the child's own answer plus its subtree size (since every node in the child's subtree is one edge farther from `node` than from the child). After computing `answer[0]` for the true root, perform a pre-order DFS to "re-root" the tree onto each child: moving the root from a `parent` to a `child` decreases the distance to every node in the child's subtree by 1, and increases the distance to every other node by 1, giving the formula `answer[child] = answer[parent] - subtreeSize[child] + (n - subtreeSize[child])`.

## C# Solution

```csharp
public class Solution
{
    private List<int>[] tree;
    private int[] answer;
    private int[] subtreeSize;
    private int n;

    public int[] SumOfDistancesInTree(int n, int[][] edges)
    {
        this.n = n;
        tree = new List<int>[n];
        for (int i = 0; i < n; i++) tree[i] = new List<int>();

        foreach (var edge in edges)
        {
            tree[edge[0]].Add(edge[1]);
            tree[edge[1]].Add(edge[0]);
        }

        answer = new int[n];
        subtreeSize = new int[n];

        PostOrder(0, -1);
        PreOrder(0, -1);

        return answer;
    }

    private void PostOrder(int node, int parent)
    {
        subtreeSize[node] = 1;

        foreach (var child in tree[node])
        {
            if (child == parent) continue;

            PostOrder(child, node);
            subtreeSize[node] += subtreeSize[child];
            answer[node] += answer[child] + subtreeSize[child];
        }
    }

    private void PreOrder(int node, int parent)
    {
        foreach (var child in tree[node])
        {
            if (child == parent) continue;

            answer[child] = answer[node] - subtreeSize[child] + (n - subtreeSize[child]);
            PreOrder(child, node);
        }
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the adjacency list and recursion stack.
