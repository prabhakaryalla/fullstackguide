# 998. Maximum Binary Tree II

**Difficulty:** Medium
**Category:** Tree, Binary Tree

## Problem

A *maximum binary tree* is built from an array by recursively making the maximum element the root, with the elements to its left forming the left subtree and elements to its right forming the right subtree. Given the root of a maximum binary tree built from some array, and a new value `val` to append to the end of that array, return the root of the maximum binary tree for the updated array.

### Example

```
Input: root = [4,1,3,null,null,2], val = 5
Output: [5,4,null,1,3,null,null,2]
```

## Approach

Since `val` is appended at the end, it can only ever displace values along the tree's rightmost spine. If `val` is greater than the current root, it becomes the new root with the old tree as its left child. Otherwise, recurse into the right subtree (inserting `val` there) and reattach it, since everything to the left is already correctly ordered relative to `val`.

## C# Solution

```csharp
public class Solution
{
    public TreeNode InsertIntoMaxTree(TreeNode root, int val)
    {
        if (root == null || val > root.val)
        {
            var newRoot = new TreeNode(val) { left = root };
            return newRoot;
        }

        root.right = InsertIntoMaxTree(root.right, val);
        return root;
    }
}
```

## Complexity

- **Time:** `O(h)` where `h` is the height of the right spine.
- **Space:** `O(h)` for the recursion stack.
