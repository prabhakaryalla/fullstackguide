# 1379. Find a Corresponding Node of a Binary Tree in a Clone of That Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Binary Tree

## Problem

Given the roots of an original binary tree and a cloned copy `cloned`, along with a `target` node reference from the original tree, return the reference to the corresponding node in `cloned`.

### Example

```
Input: original tree, cloned tree, target node
Output: node in cloned tree with the same value/position as target
```

## Approach

Traverse the original and cloned trees simultaneously (they have identical structure). When the current original node is the same reference as `target`, the corresponding cloned node is the answer; otherwise recurse into both left subtrees together and both right subtrees together, short-circuiting as soon as a match is found.

## C# Solution

```csharp
public class Solution
{
    public TreeNode GetTargetCopy(TreeNode original, TreeNode cloned, TreeNode target)
    {
        if (original == null) return null;
        if (original == target) return cloned;

        return GetTargetCopy(original.left, cloned.left, target)
            ?? GetTargetCopy(original.right, cloned.right, target);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
