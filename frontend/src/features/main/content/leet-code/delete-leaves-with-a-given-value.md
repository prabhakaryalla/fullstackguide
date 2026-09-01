# 1325. Delete Leaves With a Given Value

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree and an integer `target`, repeatedly remove leaf nodes with value `target` until no such leaves remain, and return the resulting tree's root.

### Example

```
Input: root = [1,2,3,2,null,2,4], target = 2
Output: [1,null,3,null,4]
```

## Approach

Process the tree bottom-up with post-order recursion: first recursively clean the left and right subtrees, then check whether the current node has become a childless leaf equal to `target` — if so, remove it by returning `null` to the parent, which naturally allows a parent to become a removable leaf on the next level up.

## C# Solution

```csharp
public class Solution
{
    public TreeNode RemoveLeafNodes(TreeNode root, int target)
    {
        if (root == null) return null;

        root.left = RemoveLeafNodes(root.left, target);
        root.right = RemoveLeafNodes(root.right, target);

        if (root.left == null && root.right == null && root.val == target)
        {
            return null;
        }

        return root;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
