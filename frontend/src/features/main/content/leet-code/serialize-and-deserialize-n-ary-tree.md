# 428. Serialize and Deserialize N-ary Tree

**Difficulty:** Hard
**Category:** String, Tree, Depth-First Search, Breadth-First Search, Design
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Design an algorithm to serialize an n-ary tree into a string and deserialize that string back into the original tree structure.

### Example

```
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]
```

## Approach

Serialize using a pre-order traversal, writing each node's value followed by its number of children (so the deserializer knows exactly how many child subtrees to expect), then recursively writing each child's serialization. Deserializing simply reverses this: read a value and child count, then recursively deserialize that many children.

## C# Solution

```csharp
public class Codec
{
    public string serialize(Node root)
    {
        var sb = new StringBuilder();
        SerializeHelper(root, sb);
        return sb.ToString();
    }

    private void SerializeHelper(Node node, StringBuilder sb)
    {
        if (node == null) return;

        sb.Append(node.val).Append(',');
        sb.Append(node.children.Count).Append(',');

        foreach (var child in node.children)
            SerializeHelper(child, sb);
    }

    public Node deserialize(string data)
    {
        if (string.IsNullOrEmpty(data)) return null;

        var tokens = data.Split(',', StringSplitOptions.RemoveEmptyEntries);
        int index = 0;
        return DeserializeHelper(tokens, ref index);
    }

    private Node DeserializeHelper(string[] tokens, ref int index)
    {
        if (index >= tokens.Length) return null;

        int val = int.Parse(tokens[index++]);
        int childCount = int.Parse(tokens[index++]);

        var node = new Node(val) { children = new List<Node>() };

        for (int i = 0; i < childCount; i++)
            node.children.Add(DeserializeHelper(tokens, ref index));

        return node;
    }
}
```

## Complexity

- **Time:** `O(n)` for both serialize and deserialize.
- **Space:** `O(n)` for the serialized string and recursion stack.
