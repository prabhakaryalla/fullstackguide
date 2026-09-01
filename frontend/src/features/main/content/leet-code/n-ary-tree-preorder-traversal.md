# 589. N-ary Tree Preorder Traversal

**Difficulty:** Easy
**Category:** Stack, Tree, Depth-First Search

## Problem

Given the `root` of an n-ary tree, return the preorder traversal of its nodes' values.

### Example

```
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,5,6,2,4]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.

## Approach

Recursively visit the current node first, then recurse into each of its children in order — the direct generalization of binary tree preorder traversal to an arbitrary number of children.

## C# Solution

```csharp
public class Solution
{
    public IList<int> Preorder(Node root)
    {
        var result = new List<int>();
        Traverse(root, result);
        return result;
    }

    private void Traverse(Node node, List<int> result)
    {
        if (node == null) return;

        result.Add(node.val);
        foreach (var child in node.children)
            Traverse(child, result);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
