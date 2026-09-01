# 1110. Delete Nodes And Return Forest

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree, Hash Table

## Problem

Given the root of a binary tree and a list `to_delete` of values, delete every node with a value in that list. Deleting a node detaches its children as new independent trees. Return the roots of all the trees remaining in the resulting forest, in any order.

### Example

```
Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]
```

## Approach

Perform a post-order DFS while tracking whether the current node is a "root candidate" (its parent was deleted, or it's the original root). Recurse into both children first, passing down whether the current node itself is deleted. If a node's value is in the delete set, add its surviving children to the result list and return `null` to detach it from its parent; otherwise return the node unchanged.

## C# Solution

```csharp
public class Solution
{
    public IList<TreeNode> DelNodes(TreeNode root, int[] to_delete)
    {
        var toDelete = new HashSet<int>(to_delete);
        var result = new List<TreeNode>();

        TreeNode Dfs(TreeNode node, bool isRoot)
        {
            if (node == null) return null;

            bool deleted = toDelete.Contains(node.val);
            if (isRoot && !deleted) result.Add(node);

            node.left = Dfs(node.left, deleted);
            node.right = Dfs(node.right, deleted);

            return deleted ? null : node;
        }

        Dfs(root, true);
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack, plus `O(k)` for the delete set.
