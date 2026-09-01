# 431. Encode N-ary Tree to Binary Tree

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Design, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design an algorithm to encode an n-ary tree into a binary tree, and decode that binary tree back into the original n-ary tree.

### Example

```
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]
```

## Approach

Use the classic "left-child, right-sibling" transformation. For encoding, a node's binary `left` child points to its first n-ary child, and each subsequent n-ary sibling is chained via the binary `right` pointer of the previous sibling's encoded node. Decoding reverses this: the binary `left` pointer leads to the first child, and following binary `right` pointers from there yields the remaining children in order.

## C# Solution

```csharp
public class Codec
{
    public TreeNode Encode(Node root)
    {
        if (root == null) return null;

        var binaryRoot = new TreeNode(root.val);
        binaryRoot.left = EncodeChildren(root.children, 0);
        return binaryRoot;
    }

    private TreeNode EncodeChildren(List<Node> children, int index)
    {
        if (index >= children.Count) return null;

        var node = new TreeNode(children[index].val);
        node.left = EncodeChildren(children[index].children, 0);
        node.right = EncodeChildren(children, index + 1);
        return node;
    }

    public Node Decode(TreeNode root)
    {
        if (root == null) return null;

        var nAryRoot = new Node(root.val) { children = new List<Node>() };
        DecodeChildren(root.left, nAryRoot.children);
        return nAryRoot;
    }

    private void DecodeChildren(TreeNode node, List<Node> children)
    {
        if (node == null) return;

        var child = new Node(node.val) { children = new List<Node>() };
        DecodeChildren(node.left, child.children);
        children.Add(child);

        DecodeChildren(node.right, children);
    }
}
```

## Complexity

- **Time:** `O(n)` for both encode and decode.
- **Space:** `O(n)` for the recursion stack and resulting trees.
