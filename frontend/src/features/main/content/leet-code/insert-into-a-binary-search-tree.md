# 701. Insert into a Binary Search Tree

**Difficulty:** Medium
**Category:** Tree, Binary Search Tree, Binary Tree

## Problem

Given the root node of a binary search tree (BST) and a value to insert, insert the value into the BST and return the root node of the resulting tree. There may be multiple valid trees; return any one.

### Example

```
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- All node values and `val` are unique.

## Approach

Use the BST ordering property to navigate: if `val` is smaller than the current node's value, recurse into the left subtree; otherwise recurse into the right subtree. When a `null` position is reached, that's exactly where the new value belongs, so create a new node there.

## C# Solution

```csharp
public class Solution
{
    public TreeNode InsertIntoBST(TreeNode root, int val)
    {
        if (root == null) return new TreeNode(val);

        if (val < root.val)
            root.left = InsertIntoBST(root.left, val);
        else
            root.right = InsertIntoBST(root.right, val);

        return root;
    }
}
```

## Complexity

- **Time:** `O(h)`, where `h` is the tree height.
- **Space:** `O(h)` for the recursion stack.
