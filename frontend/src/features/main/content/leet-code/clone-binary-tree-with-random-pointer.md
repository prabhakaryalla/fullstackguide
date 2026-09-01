# 1485. Clone Binary Tree With Random Pointer

**Difficulty:** Medium
**Category:** Hash Table, Tree, Depth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of a binary tree where each `Node` has an additional `random` pointer that can point to any node in the tree (or `null`), return a deep copy of the tree as a tree of `NodeCopy` objects, preserving both the tree structure and every `random` link.

## Approach

Perform a depth-first traversal while maintaining a map from original nodes to their already-created clones. For each node, if it has already been cloned (reachable via a previously visited `random` pointer), return the cached clone; otherwise create a new clone, register it in the map immediately (to correctly resolve any cycles or forward references through `random`), and recursively clone its `left`, `right`, and `random` links.

## C# Solution

```csharp
public class Solution
{
    private readonly Dictionary<Node, NodeCopy> map = new();

    public NodeCopy CopyRandomBinaryTree(Node root)
    {
        return Clone(root);
    }

    private NodeCopy Clone(Node node)
    {
        if (node == null) return null;
        if (map.TryGetValue(node, out var existing)) return existing;

        var copy = new NodeCopy(node.val);
        map[node] = copy;

        copy.left = Clone(node.left);
        copy.right = Clone(node.right);
        copy.random = Clone(node.random);

        return copy;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the clone map and recursion stack.
