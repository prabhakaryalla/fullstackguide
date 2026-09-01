# 426. Convert Binary Search Tree to Sorted Doubly Linked List

**Difficulty:** Medium
**Category:** Stack, Tree, Depth-First Search, Binary Search Tree, Doubly-Linked List, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Convert a binary search tree into a sorted circular doubly linked list in place, reusing the tree's `left` and `right` pointers as `prev` and `next`, and return a pointer to the smallest node.

### Example

```
Input: root = [4,2,5,1,3]
Output: a circular doubly linked list: 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> (back to 1)
```

### Constraints

- The number of nodes is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

## Approach

Perform an in-order traversal, which visits BST nodes in ascending order. During the traversal, link each newly visited node's `left` pointer to the previously visited node, and that previous node's `right` pointer forward to the new node — building the doubly linked list incrementally. After the traversal, connect the last node's `right` to the first node and the first node's `left` to the last, closing the circle.

## C# Solution

```csharp
public class Solution
{
    private Node first, last;

    public Node TreeToDoublyList(Node root)
    {
        if (root == null) return null;

        Inorder(root);

        first.left = last;
        last.right = first;

        return first;
    }

    private void Inorder(Node node)
    {
        if (node == null) return;

        Inorder(node.left);

        if (last == null)
            first = node;
        else
        {
            last.right = node;
            node.left = last;
        }

        last = node;

        Inorder(node.right);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
