# 1650. Lowest Common Ancestor of a Binary Tree III

**Difficulty:** Medium
**Category:** Hash Table, Tree, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two nodes `p` and `q` in a binary tree where each `Node` also has a `parent` pointer, return their lowest common ancestor without access to the tree's root.

### Example

```
Input: p = 5, q = 1 (with tree [3,5,1,6,2,0,8])
Output: 3
```

## Approach

This mirrors finding the intersection node of two singly linked lists: walk two pointers starting at `p` and `q`, each stepping to its `parent`; whenever a pointer reaches the root (`parent == null`), redirect it to start over from the *other* node. Since both pointers traverse the same total combined path length (depth of `p` + depth of `q`) before meeting, they are guaranteed to converge at the LCA.

## C# Solution

```csharp
public class Solution
{
    public Node LowestCommonAncestor(Node p, Node q)
    {
        Node a = p;
        Node b = q;

        while (a != b)
        {
            a = a.parent == null ? q : a.parent;
            b = b.parent == null ? p : b.parent;
        }

        return a;
    }
}
```

## Complexity

- **Time:** `O(h)`, where `h` is the tree height.
- **Space:** `O(1)`.
