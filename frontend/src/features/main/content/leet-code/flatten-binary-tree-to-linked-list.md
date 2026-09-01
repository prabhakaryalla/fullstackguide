# 114. Flatten Binary Tree to Linked List

**Difficulty:** Medium
**Category:** Stack, Tree, Depth-First Search, Binary Tree, Linked List

## Problem

Given the `root` of a binary tree, flatten it into a "linked list" in place: the linked list uses the same `TreeNode` class where `right` points to the next node and `left` is always `null`, and the ordering matches the tree's preorder traversal.

### Example 1

```
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]
```

```mermaid
graph LR
    A["1"] --> B["2"] --> C["3"] --> D["4"] --> E["5"] --> F["6"]
    style A fill:#4caf50,color:#fff
```

### Example 2

```
Input: root = []
Output: []
```

### Constraints

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-100 <= Node.val <= 100`

## Approach

Process nodes in reverse preorder (right subtree, then left subtree, then the node itself) while tracking the previously processed node. At each node, point its `right` to the previously processed node and set `left` to `null` — since we're walking in reverse order, `prev` always holds the node that should immediately follow the current one in the final flattened order.

## C# Solution

```csharp
public class Solution
{
    private TreeNode prev = null;

    public void Flatten(TreeNode root)
    {
        if (root == null) return;

        Flatten(root.right);
        Flatten(root.left);

        root.right = prev;
        root.left = null;
        prev = root;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` — recursion depth equal to the tree height.
