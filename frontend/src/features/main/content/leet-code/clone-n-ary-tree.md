# 1490. Clone N-ary Tree

**Difficulty:** Medium
**Category:** Hash Table, Tree, Depth-First Search, Breadth-First Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of an n-ary tree (each `Node` has a `val` and a list of `children`), return a deep copy of the tree.

## Approach

Recursively construct a new node for the current node's value, then deep-clone every child recursively and attach the resulting clones as the new node's children list.

## C# Solution

```csharp
public class Solution
{
    public Node CloneTree(Node root)
    {
        if (root == null) return null;

        var copy = new Node(root.val)
        {
            children = new List<Node>()
        };

        foreach (var child in root.children)
            copy.children.Add(CloneTree(child));

        return copy;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the recursion stack and cloned nodes.
