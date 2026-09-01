# 559. Maximum Depth of N-ary Tree

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, Breadth-First Search

## Problem

Given a `root` of an n-ary tree, return its maximum depth — the number of nodes along the longest path from the root down to the farthest leaf node.

### Example

```
Input: root = [1,null,3,2,4,null,5,6]
Output: 3
```

### Constraints

- The number of nodes is in the range `[0, 10^4]`.

## Approach

Recursively compute the depth of each child subtree and take the maximum, adding 1 for the current node. A `null` root has depth 0, and a node with no children has depth 1.

## C# Solution

```csharp
public class Solution
{
    public int MaxDepth(Node root)
    {
        if (root == null) return 0;

        int maxChildDepth = 0;
        foreach (var child in root.children)
            maxChildDepth = Math.Max(maxChildDepth, MaxDepth(child));

        return 1 + maxChildDepth;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(h)` for the recursion stack.
