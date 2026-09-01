# 2049. Count Nodes With the Highest Score

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Array

## Problem

There is a binary tree rooted at node `0`, given as a 0-indexed array `parents`, where `parents[i]` is the parent of node `i` (`parents[0] == -1`). Removing a node `i` splits the tree into up to three components: each of `i`'s child subtrees, and the remaining tree containing the root (if `i` isn't the root). The **score** of node `i` is the product of the sizes of these components. Return *the number of nodes with the maximum score*.

## Approach

Build a children list from `parents`. Perform a post-order depth-first search from the root: for each node, first recurse into its children to learn their subtree sizes, then compute the node's score as the product of all child subtree sizes, additionally multiplying by `n - size` (the size of the remaining tree, i.e. everything outside this node's own subtree) whenever that remainder is non-zero (which it is for every node except the root). Track the running maximum score and the count of nodes achieving it while performing the traversal.

## C# Solution

```csharp
public class Solution
{
    private List<int>[] children;
    private int n;
    private long maxScore;
    private int count;

    public int CountHighestScoreNodes(int[] parents)
    {
        n = parents.Length;
        children = new List<int>[n];
        for (int i = 0; i < n; i++) children[i] = new List<int>();
        for (int i = 1; i < n; i++) children[parents[i]].Add(i);

        maxScore = 0;
        count = 0;
        Dfs(0);
        return count;
    }

    private int Dfs(int node)
    {
        long score = 1;
        int size = 1;

        foreach (var child in children[node])
        {
            int childSize = Dfs(child);
            score *= childSize;
            size += childSize;
        }

        int remaining = n - size;
        if (remaining > 0) score *= remaining;

        if (score > maxScore)
        {
            maxScore = score;
            count = 1;
        }
        else if (score == maxScore)
        {
            count++;
        }

        return size;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the children list and recursion stack.
