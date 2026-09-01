# 1145. Binary Tree Coloring Game

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree, Math, Game Theory

## Problem

Alice and Bob play a game on a binary tree with `n` nodes (`n` is odd). Alice colors a node `x` first. Bob then colors any uncolored node `y`. Each turn after that, a player colors an uncolored node adjacent to one of their own colored nodes; a player unable to move skips. The player who colors more nodes wins. Given `root`, `n`, and `x`, return `true` if Bob can choose some `y` that guarantees him the win.

### Example

```
Input: root = [1,2,3,4,5,6,7,8,9,10,11], n = 11, x = 3
Output: true
```

## Approach

Once Alice picks `x`, the tree splits into three disjoint regions if Bob picks a neighbor of `x`: `x`'s left subtree, `x`'s right subtree, and everything on the "parent side" (the rest of the tree). Bob wins if he can claim a region containing more than half of all `n` nodes, since claiming any neighbor of `x` isolates that entire region for Bob (Alice can never cross into it). Compute the sizes of the left subtree, right subtree, and the remainder (`n - left - right - 1`), and check if any exceeds `n / 2`.

## C# Solution

```csharp
public class Solution
{
    public bool BtreeGameWinningMove(TreeNode root, int n, int x)
    {
        TreeNode target = Find(root, x);
        int leftCount = Count(target.left);
        int rightCount = Count(target.right);
        int parentCount = n - leftCount - rightCount - 1;

        int half = n / 2;
        return leftCount > half || rightCount > half || parentCount > half;
    }

    private TreeNode Find(TreeNode node, int x)
    {
        if (node == null) return null;
        if (node.val == x) return node;
        return Find(node.left, x) ?? Find(node.right, x);
    }

    private int Count(TreeNode node)
    {
        if (node == null) return 0;
        return 1 + Count(node.left) + Count(node.right);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
