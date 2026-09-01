# 173. Binary Search Tree Iterator

**Difficulty:** Medium
**Category:** Stack, Tree, Design, Binary Search Tree, Binary Tree, Iterator

## Problem

Design an iterator over a binary search tree that returns node values in ascending order. Implement `BSTIterator` with `HasNext()` and `Next()`, each running in `O(1)` amortized time and `O(h)` memory, where `h` is the tree's height.

### Example

```
root = [7,3,15,null,null,9,20]
iterator.Next() -> 3
iterator.Next() -> 7
iterator.HasNext() -> true
iterator.Next() -> 9
```

## Approach

Simulate an iterative inorder traversal using an explicit stack, primed initially with the path down to the leftmost node. `Next()` pops the top of the stack (the next smallest unvisited value) and then pushes the entire left spine of that node's right subtree, preparing the stack for the following call.

## C# Solution

```csharp
public class BSTIterator
{
    private readonly Stack<TreeNode> stack = new();

    public BSTIterator(TreeNode root)
    {
        PushLeftSpine(root);
    }

    public int Next()
    {
        var node = stack.Pop();
        PushLeftSpine(node.right);
        return node.val;
    }

    public bool HasNext()
    {
        return stack.Count > 0;
    }

    private void PushLeftSpine(TreeNode node)
    {
        while (node != null)
        {
            stack.Push(node);
            node = node.left;
        }
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per `Next()` call — each node is pushed and popped exactly once overall.
- **Space:** `O(h)` — the stack holds at most one path's worth of nodes.
