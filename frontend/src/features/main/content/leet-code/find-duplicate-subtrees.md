# 652. Find Duplicate Subtrees

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Hash Table, Binary Tree

## Problem

Given the `root` of a binary tree, return all duplicate subtrees — subtrees with the same structure and node values as another subtree in the tree — returning one representative node for each distinct duplicate.

### Example

```
Input: root = [1,2,3,4,null,2,4,null,null,4]
Output: [[2,4],[4]]
```

### Constraints

- The number of nodes is in the range `[1, 5000]`.

## Approach

Perform a post-order traversal, serializing each subtree into a unique string based on its structure (e.g., `"value,leftSerialization,rightSerialization"`). Track how many times each serialization has been seen in a hash map; the first time a serialization's count reaches exactly 2, its corresponding node is a genuine duplicate and gets added to the result (checking for exactly 2, not just "seen before," avoids adding the same duplicate subtree more than once).

## C# Solution

```csharp
public class Solution
{
    private readonly Dictionary<string, int> serializationCounts = new();
    private readonly List<TreeNode> result = new();

    public IList<TreeNode> FindDuplicateSubtrees(TreeNode root)
    {
        Serialize(root);
        return result;
    }

    private string Serialize(TreeNode node)
    {
        if (node == null) return "#";

        var serialization = $"{node.val},{Serialize(node.left)},{Serialize(node.right)}";

        serializationCounts[serialization] = serializationCounts.GetValueOrDefault(serialization) + 1;
        if (serializationCounts[serialization] == 2)
            result.Add(node);

        return serialization;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case, due to building serialization strings.
- **Space:** `O(n^2)` for the stored serializations.
