# 606. Construct String from Binary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, String, Binary Tree

## Problem

Given the `root` of a binary tree, return a string representing the tree using pre-order traversal, where each node is followed by its children wrapped in parentheses, omitting unnecessary empty parentheses (a missing left child can be omitted only if the right child is also missing).

### Example

```
Input: root = [1,2,3,4]
Output: "1(2(4))(3)"
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.

## Approach

Recursively build the string: append the current node's value, then stop if it's a leaf. Otherwise, always wrap the left subtree in parentheses (even if empty, since an empty pair is needed to disambiguate from a right-only child), and wrap the right subtree in parentheses only if it actually exists.

## C# Solution

```csharp
public class Solution
{
    public string Tree2str(TreeNode root)
    {
        var sb = new StringBuilder();
        Build(root, sb);
        return sb.ToString();
    }

    private void Build(TreeNode node, StringBuilder sb)
    {
        if (node == null) return;

        sb.Append(node.val);

        if (node.left == null && node.right == null) return;

        sb.Append('(');
        Build(node.left, sb);
        sb.Append(')');

        if (node.right != null)
        {
            sb.Append('(');
            Build(node.right, sb);
            sb.Append(')');
        }
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
