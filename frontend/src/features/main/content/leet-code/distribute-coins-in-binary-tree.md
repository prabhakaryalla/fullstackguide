# 979. Distribute Coins in Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree with `n` nodes where the total number of coins across all nodes equals `n`, in one move you can transfer a coin between two adjacent nodes. Return the minimum number of moves so that every node ends up with exactly one coin.

### Example

```
Input: root = [3,0,0]
Output: 2
```

## Approach

Post-order DFS: each subtree returns its "excess" coins, defined as `(sum of coin counts in subtree) - (number of nodes in subtree)`. Any excess (positive or negative) flowing across the edge between a node and its child must be physically moved, contributing `abs(excess)` moves. Accumulate these absolute values across every edge in the tree.

## C# Solution

```csharp
public class Solution
{
    private int moves;

    public int DistributeCoins(TreeNode root)
    {
        moves = 0;
        Dfs(root);
        return moves;
    }

    private int Dfs(TreeNode node)
    {
        if (node == null) return 0;

        int left = Dfs(node.left);
        int right = Dfs(node.right);

        moves += Math.Abs(left) + Math.Abs(right);

        return node.val - 1 + left + right;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
