# 1028. Recover a Tree From Preorder Traversal

**Difficulty:** Hard
**Category:** String, Tree, Depth-First Search, Binary Tree

## Problem

A binary tree was encoded as a string where each node is written as `depth` dashes followed by the node's value, in preorder. Given the encoded `traversal` string, reconstruct and return the tree's root.

### Example

```
Input: traversal = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]
```

## Approach

Parse the string left to right, reading the run of dashes to determine the node's depth and the following digits to determine its value. Maintain a stack representing the current path from the root, where the stack's size equals the depth of the node on top. Before attaching a new node, pop the stack down to exactly the new node's depth so the new top is its correct parent; attach the new node as the parent's left child if that slot is free, otherwise as its right child, then push the new node.

## C# Solution

```csharp
public class Solution
{
    public TreeNode RecoverFromPreorder(string traversal)
    {
        var stack = new Stack<TreeNode>();
        int i = 0;
        int n = traversal.Length;

        while (i < n)
        {
            int depth = 0;
            while (i < n && traversal[i] == '-')
            {
                depth++;
                i++;
            }

            int start = i;
            while (i < n && char.IsDigit(traversal[i])) i++;
            int value = int.Parse(traversal.Substring(start, i - start));

            var node = new TreeNode(value);

            while (stack.Count > depth) stack.Pop();

            if (stack.Count > 0)
            {
                var parent = stack.Peek();
                if (parent.left == null) parent.left = node;
                else parent.right = node;
            }

            stack.Push(node);
        }

        while (stack.Count > 1) stack.Pop();

        return stack.Count > 0 ? stack.Peek() : null;
    }
}
```

## Complexity

- **Time:** `O(n)` — each character of `traversal` is processed once.
- **Space:** `O(depth)` for the stack, up to `O(n)` in the worst case.
