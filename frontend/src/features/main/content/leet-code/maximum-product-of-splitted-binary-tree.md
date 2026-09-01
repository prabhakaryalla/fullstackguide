# 1339. Maximum Product of Splitted Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree, remove one edge to split it into two subtrees, and return the maximum product of their sums, modulo `10^9 + 7`.

### Example

```
Input: root = [1,2,3,4,5,6]
Output: 110
```

## Approach

First compute the tree's total sum. Then, during a post-order traversal that returns each subtree's sum, evaluate the product of that subtree's sum and the remaining sum (`total - subtreeSum`) at every node — this represents removing the edge above that subtree — and track the maximum product seen.

## C# Solution

```csharp
public class Solution
{
    private long total = 0;
    private long best = 0;

    public int MaxProduct(TreeNode root)
    {
        total = SumTree(root);
        Explore(root);
        return (int)(best % 1_000_000_007);
    }

    private long SumTree(TreeNode node)
    {
        if (node == null) return 0;
        return node.val + SumTree(node.left) + SumTree(node.right);
    }

    private long Explore(TreeNode node)
    {
        if (node == null) return 0;

        long subtreeSum = node.val + Explore(node.left) + Explore(node.right);
        best = Math.Max(best, subtreeSum * (total - subtreeSum));

        return subtreeSum;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
