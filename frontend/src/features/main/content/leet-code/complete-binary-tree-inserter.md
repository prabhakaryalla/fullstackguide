# 919. Complete Binary Tree Inserter

**Difficulty:** Medium
**Category:** Tree, Breadth-First Search, Design, Binary Tree

## Problem

Implement `CBTInserter`, initialized with the root of a complete binary tree, supporting `Insert(val)` which adds a node with value `val` to the tree while keeping it complete (returning the new node's parent's value), and `GetRoot()` which returns the tree's root.

### Example

```
CBTInserter(root)
Insert(v1) -> parent value
Insert(v2) -> parent value
GetRoot()  -> root
```

## Approach

Do a one-time BFS over the initial tree and store every node in a list — this list is exactly the tree's level order, so a node at list index `i` has its parent at index `(i - 1) / 2`. To insert, append the new node to the list; its parent is looked up the same way, and it becomes the parent's left child if that slot is free, otherwise the right child.

## C# Solution

```csharp
public class CBTInserter
{
    private readonly TreeNode root;
    private readonly List<TreeNode> tree;

    public CBTInserter(TreeNode root)
    {
        this.root = root;
        tree = new List<TreeNode>();

        var queue = new Queue<TreeNode>();
        queue.Enqueue(root);

        while (queue.Count > 0)
        {
            var node = queue.Dequeue();
            tree.Add(node);
            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }
    }

    public int Insert(int val)
    {
        var node = new TreeNode(val);
        tree.Add(node);

        int newIdx = tree.Count - 1;
        int parentIdx = (newIdx - 1) / 2;
        var parent = tree[parentIdx];

        if (parent.left == null) parent.left = node; else parent.right = node;

        return parent.val;
    }

    public TreeNode GetRoot() => root;
}
```

## Complexity

- **Time:** `O(n)` to build, `O(1)` per insert.
- **Space:** `O(n)` for the stored level-order list.
