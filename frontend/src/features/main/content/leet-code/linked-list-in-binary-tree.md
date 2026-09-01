# 1367. Linked List in Binary Tree

**Difficulty:** Medium
**Category:** Linked List, Tree, Depth-First Search, Binary Tree

## Problem

Given the `head` of a linked list and the `root` of a binary tree, return `true` if a downward root-to-leaf-direction path in the tree matches the linked list's sequence of values (not necessarily starting at the tree's root, and not necessarily ending at a leaf).

### Example

```
Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
```

## Approach

For every node in the tree, try matching the linked list starting there with a helper that walks down one specific path, following the list node by node while descending into either child (recursively trying both branches) as long as values keep matching. If no full match starts at a given tree node, recurse into its children to try starting the match elsewhere.

## C# Solution

```csharp
public class Solution
{
    public bool IsSubPath(ListNode head, TreeNode root)
    {
        if (root == null) return false;
        return Matches(head, root) || IsSubPath(head, root.left) || IsSubPath(head, root.right);
    }

    private bool Matches(ListNode node, TreeNode tree)
    {
        if (node == null) return true;
        if (tree == null || tree.val != node.val) return false;

        return Matches(node.next, tree.left) || Matches(node.next, tree.right);
    }
}
```

## Complexity

- **Time:** `O(n * min(l, h))` where `l` is the list length and `h` the tree height.
- **Space:** `O(h)` for the recursion stack.
