# 297. Serialize and Deserialize Binary Tree

**Difficulty:** Hard
**Category:** String, Tree, Depth-First Search, Breadth-First Search, Design, Binary Tree

## Problem

Design an algorithm to serialize a binary tree to a string and deserialize that string back to the original tree structure.

### Example

```
Input: root = [1,2,3,null,null,4,5]
Serialize -> "1,2,#,#,3,4,#,#,5,#,#"
Deserialize(serialized) -> [1,2,3,null,null,4,5]
```

## Approach

Use pre-order traversal, writing each node's value, and a sentinel (e.g. `#`) for every `null` child. This captures the tree structure unambiguously because pre-order + explicit null markers fully determine the shape. To deserialize, split the string by commas and rebuild recursively: read one token — if it's `#`, return null; otherwise, create a node, then recursively build its left and right subtrees from the remaining tokens (using a shared cursor/queue).

## C# Solution

```csharp
public class Codec
{
    public string Serialize(TreeNode root)
    {
        var sb = new StringBuilder();
        SerializeHelper(root, sb);
        return sb.ToString();
    }

    private void SerializeHelper(TreeNode node, StringBuilder sb)
    {
        if (node == null)
        {
            sb.Append("#,");
            return;
        }

        sb.Append(node.val).Append(',');
        SerializeHelper(node.left, sb);
        SerializeHelper(node.right, sb);
    }

    public TreeNode Deserialize(string data)
    {
        var tokens = new Queue<string>(data.Split(','));
        return DeserializeHelper(tokens);
    }

    private TreeNode DeserializeHelper(Queue<string> tokens)
    {
        var token = tokens.Dequeue();
        if (token == "#") return null;

        var node = new TreeNode(int.Parse(token));
        node.left = DeserializeHelper(tokens);
        node.right = DeserializeHelper(tokens);
        return node;
    }
}
```

## Complexity

- **Time:** `O(n)` — each node is visited once during both serialize and deserialize.
- **Space:** `O(n)` — for the serialized string and recursion stack.
