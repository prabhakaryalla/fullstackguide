# 449. Serialize and Deserialize BST

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Design, Binary Search Tree

## Problem

Design an algorithm to serialize and deserialize a binary search tree, converting it to a string and back, so that the reconstructed tree is structurally identical to the original.

### Example

```
Input: root = [2,1,3]
Output: [2,1,3]
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.
- `0 <= Node.val <= 10^4`
- Each node's value is unique.

## Approach

Serialize using a pre-order traversal, since a BST's pre-order sequence alone is enough to uniquely reconstruct the tree (no need to encode null markers). To deserialize, rebuild recursively: the first value read is always the current subtree's root; every subsequent value that falls within `(lower, upper)` bounds derived from ancestors belongs to the left subtree until values start exceeding the root, at which point they belong to the right subtree.

## C# Solution

```csharp
public class Codec
{
    public string serialize(TreeNode root)
    {
        var sb = new StringBuilder();
        SerializeHelper(root, sb);
        return sb.ToString().TrimEnd(',');
    }

    private void SerializeHelper(TreeNode node, StringBuilder sb)
    {
        if (node == null) return;

        sb.Append(node.val).Append(',');
        SerializeHelper(node.left, sb);
        SerializeHelper(node.right, sb);
    }

    public TreeNode deserialize(string data)
    {
        if (string.IsNullOrEmpty(data)) return null;

        var values = data.Split(',').Select(int.Parse).ToArray();
        int index = 0;
        return Build(values, ref index, int.MinValue, int.MaxValue);
    }

    private TreeNode Build(int[] values, ref int index, int lower, int upper)
    {
        if (index >= values.Length || values[index] < lower || values[index] > upper)
            return null;

        var node = new TreeNode(values[index++]);
        node.left = Build(values, ref index, lower, node.val);
        node.right = Build(values, ref index, node.val, upper);
        return node;
    }
}
```

## Complexity

- **Time:** `O(n)` for both serialize and deserialize.
- **Space:** `O(n)` for the serialized string and recursion stack.
