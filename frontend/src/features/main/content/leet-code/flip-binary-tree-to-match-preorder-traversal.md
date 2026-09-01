# 971. Flip Binary Tree To Match Preorder Traversal

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree with `n` nodes valued `1` to `n`, and a target `voyage` array, flip the minimum number of nodes (swapping their left and right children) so that a preorder traversal of the tree matches `voyage`. Return the list of flipped node values, or `[-1]` if impossible.

### Example

```
Input: root = [1,2], voyage = [2,1]
Output: [-1]
```

## Approach

Walk the tree in preorder alongside an index into `voyage`. If the current node's value doesn't match the expected value, the traversal already failed. Otherwise, peek at what should come next: if the left child doesn't match the next expected value (but a left child exists), a flip is required at this node, so recurse right-before-left and record the flip; otherwise recurse left-before-right normally.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FlipMatchVoyage(TreeNode root, int[] voyage)
    {
        var result = new List<int>();
        int idx = 0;

        bool ok = Dfs(root);
        return ok ? result : new List<int> { -1 };

        bool Dfs(TreeNode node)
        {
            if (node == null) return true;
            if (node.val != voyage[idx++]) return false;

            if (idx < voyage.Length && node.left != null && node.left.val != voyage[idx])
            {
                result.Add(node.val);
                return Dfs(node.right) && Dfs(node.left);
            }

            return Dfs(node.left) && Dfs(node.right);
        }
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
