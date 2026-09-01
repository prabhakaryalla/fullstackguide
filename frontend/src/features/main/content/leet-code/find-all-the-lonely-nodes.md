# 1469. Find All The Lonely Nodes

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the `root` of a binary tree, return the values of all "lonely" nodes — nodes that are the only child of their parent (i.e., their parent has exactly one child, and this node is it).

### Example

```
Input: root = [1,2,3,null,4]
Output: [4]
```

## Approach

Traverse the tree with a depth-first search. At each node, check whether it has exactly one child: if the left child exists but the right doesn't, the left child is lonely; symmetrically for the right child. Recurse into both children regardless, collecting lonely values along the way.

## C# Solution

```csharp
public class Solution
{
    public IList<int> GetLonelyNodes(TreeNode root)
    {
        var result = new List<int>();
        Dfs(root, result);
        return result;
    }

    private void Dfs(TreeNode node, List<int> result)
    {
        if (node == null) return;

        if (node.left != null && node.right == null) result.Add(node.left.val);
        if (node.right != null && node.left == null) result.Add(node.right.val);

        Dfs(node.left, result);
        Dfs(node.right, result);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
