# 590. N-ary Tree Postorder Traversal

**Difficulty:** Easy
**Category:** Stack, Tree, Depth-First Search

## Problem

Given the `root` of an n-ary tree, return the postorder traversal of its nodes' values.

### Example

```
Input: root = [1,null,3,2,4,null,5,6]
Output: [5,6,3,2,4,1]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.

## Approach

Recursively visit all children first, in order, and only add the current node's value after all of its children's subtrees have been fully processed — the direct generalization of binary tree postorder traversal to an arbitrary number of children.

## C# Solution

```csharp
public class Solution
{
    public IList<int> Postorder(Node root)
    {
        var result = new List<int>();
        Traverse(root, result);
        return result;
    }

    private void Traverse(Node node, List<int> result)
    {
        if (node == null) return;

        foreach (var child in node.children)
            Traverse(child, result);

        result.Add(node.val);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
